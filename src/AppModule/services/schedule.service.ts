import { Injectable } from '@nestjs/common';

import * as scheduleServer from 'node-schedule';
import { ScheduleRepository } from '../repositories';
import { Schedule } from '../schemas/schedule.schema';
import { mqttService } from '../../mqtt';

import { parseToScheduleString } from '../utils';

@Injectable()
export class ScheduleService {
  constructor(
    private scheduleRepository: ScheduleRepository,
    private mqttService: mqttService,
  ) {
    this.init();
  }
  public async init() {
    this.scheduleRepository.find({ filter: { active: true } }).then((res) => {
      res.items.forEach((schedule) => {
        this.createSchedule(schedule);
      });
    });
  }
  public async createSchedule(res) {
    const { status, key_id, rules, _id } = res;

    const publishMqtt = this.mqttService;
    scheduleServer.scheduleJob(_id.toString(), rules, function () {
      console.log(`Publish ${Number(status)} to ${key_id}`);
      publishMqtt.publish(key_id, 
        Math.abs(Number(status)-1).toString());
    });
  }
  public async cancelSchedule(id: string) {
    scheduleServer.scheduledJobs[id]?.cancel();
  }
  public async addSchedule(schedule: Schedule) {
    const { repeat, start_time, _id, active } = schedule;

    if (repeat && start_time) {
      const scheduleString = parseToScheduleString({
        repeat,
        time: start_time,
      });
      schedule.rules = scheduleString;
    }
    schedule.updated_at = new Date();

    if (_id) {
      return await this.scheduleRepository
        .updateById(_id, schedule)
        .then((res) => {
          this.cancelSchedule(_id);
          if (res.active) this.createSchedule(res);
          return { _id };
        });
    } else {
      return await this.scheduleRepository.create(schedule).then((res) => {
        if (res.active) this.createSchedule(res);
        return { _id: res._id.toString() };
      });
    }
  }

  public async findBykey(key: string) {
    return this.scheduleRepository.find({ filter: { key_id: key } });
  }

  public async removeBykey(key: string) {
    return this.scheduleRepository.deleteById(key);
  }
}
