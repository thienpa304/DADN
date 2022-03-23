import { model, Schema } from 'mongoose';

export class Mesure {
  keyId: String;
  type: String;
  value: Number;
  updated_at: Date;

  constructor(init?: Partial<Mesure>) {
    Object.assign(this, init);
  }
}
const schema = new Schema(
  {
    keyId: String,
    type: String,
    value: Number,
    updated_at: Date,
  },
  { versionKey: false, timestamps: false },
);

export default model('mesure', schema);
