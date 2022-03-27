import { model, Schema } from 'mongoose';

export class User {
  username: string;
  password: string;
  created_at?: Date;

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
const schema = new Schema(
  {
    username: String,
    password: String,
    created_at: Date,
  },
  { versionKey: false, timestamps: false },
);

export default model('user', schema);
