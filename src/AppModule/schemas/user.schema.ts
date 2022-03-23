import { model, Schema } from 'mongoose';

export class User {
  name: String;
  username: String;
  password: Number;
  created_at: Date;

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
const schema = new Schema(
  {
    name: String,
    username: String,
    password: Number,
    created_at: Date,
  },
  { versionKey: false, timestamps: false },
);

export default model('user', schema);
