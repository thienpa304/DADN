import { QueryOptions } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { mqttService } from '../../mqtt';
import { MesureRepository } from '../repositories';
import { Mesure } from '../schemas';
import { match } from 'assert';
import { pipe } from 'rxjs'

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

  public async getByKey(options) {
    const timeRange = Number(options.filter);
    const limit = Number(options.limit);
    const sort = {} 
    sort[`${options.sort.trim()}`] = 1
    const pipellines = [
      {
        $match: {
          keyId: options.keyId,
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
      { $sort: sort },
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
