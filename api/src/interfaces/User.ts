import { Types } from 'mongoose';

export interface UserType {
  _id: Types.ObjectId;
  email: string;
  password: string | undefined;
  roles: string;
}
