import { QueryOptions } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { mqttService } from '../../mqtt';
import { MesureRepository } from '../repositories';
import { Mesure } from '../schemas';
import { match } from 'assert';

@Injectable()
export class MesureService {
  constructor(
    private mesureRepository: MesureRepository,
    private configService: ConfigService,
    private mqttService: mqttService,
  ) {
    this.init();
  }
  public init() {
    this.consumeMesures();
  }
  public async getAll() {
    return this.mesureRepository.findAll();
  }

  public async getByKey(key, options) {
    const timeRange = Number(options.filter);
    const limit = Number(options.limit);
    const pipellines = [
      {
        $match: {
          keyId: key,
        },
      },
      {
        $group: {
          _id: {
            $add: [
              {
                $subtract: [
                  { $subtract: ['$updated_at', new Date(0)] },
                  {
                    $mod: [
                      { $subtract: ['$updated_at', new Date(0)] },
                      1000 * timeRange,
                    ],
                  },
                ],
              },
              new Date(0),
            ],
          },
          value: { $avg: '$value' },
        },
      },
      { $addFields: { updated_at: '$_id' } },
      { $project: { value: 1, _id: 0, updated_at: 1 } },
      { $sort: { updated_at: 1 } },
      { $limit: limit },
      { $skip: options.offset * limit },
    ]; 
    // options.filters = { keyId: key };
    // options.selectedFields = ['value', 'updated_at']; 
    return await this.mesureRepository.aggregate(pipellines); 
  }

  public async create(data: Mesure) {
    this.mesureRepository.create(data);
  }

  public async consumeMesures() {
    const keys = this.configService.get('mqtt.keyMesure');
    Object.keys(keys).forEach((type) => {
      this.mqttService.consumer(keys[type], (key, message) => {
        const currDate = new Date();
        console.log(currDate);
        const result = new Mesure({
          keyId: key,
          type: type,
          value: Number(message),
          updated_at: currDate,
        });
        this.create(result);
      });
    });
  }
}
