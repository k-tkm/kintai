import { User } from 'src/entities/User.entity';
export type RequestWithUserID = Request & {
  user: User;
};
