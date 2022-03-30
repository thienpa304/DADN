import { model, Schema } from 'mongoose';

export class Schedule {
  _id?: string;
  start_time: string;
  rules?: string;
  key_id: string;
  repeat: string;
  status: boolean;
  updated_at?: Date;
  active: boolean;

  constructor(init?: Partial<Schedule>) {
    Object.assign(this, init);
  }
}
const schema = new Schema(
  {
    start_time: String,
    key_id: String,
    rules: String,
    repeat: String,
    status: Boolean,
    updated_at: Date,
    active: Boolean,
  },
  { versionKey: false, timestamps: false },
);

export default model('schedule', schema);
