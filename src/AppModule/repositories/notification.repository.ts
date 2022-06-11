 
import { Injectable } from '@nestjs/common'
import { BaseRepository } from './base.repository'; 
import notificationSchema, { Notification } from '../schemas/notification.schema';

@Injectable()
export class NotificationRepository extends BaseRepository<Notification> {
  constructor() {
    super(notificationSchema);
  }
  
}
