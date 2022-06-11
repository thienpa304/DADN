import { model, Schema } from 'mongoose';

export class Notification { 
  title: string;
  description: string;
  avatar: string;
  type: string;
  createdAt: Date;
  isUnRead: boolean;

  constructor(init?: Partial<Notification>) {
    Object.assign(this, init);
  }
}
const schema = new Schema(
  {
    title: String,
    description: String,
    avatar: String,
    type: String,
    createdAt: Date,
    isUnRead: Boolean,
  },
  { versionKey: false, timestamps: false },
);

export default model('notification', schema);
