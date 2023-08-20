import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  date: {
    type: Date,
    default: Date(),
  },
  id: {
    type: String,
    default: uuid(),
  },
  password: String,
});

const User = mongoose.model('users', userSchema);

export default User;
