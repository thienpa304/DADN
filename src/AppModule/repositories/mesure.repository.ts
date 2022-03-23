 
import { Injectable } from '@nestjs/common'
import { BaseRepository } from './base.repository'; 
import mersureSchema, { Mesure } from '../schemas/mesure.schema';

@Injectable()
export class MesureRepository extends BaseRepository<Mesure> {
  constructor() {
    super(mersureSchema);
  }
  
}
