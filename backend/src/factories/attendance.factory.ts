import { define } from 'typeorm-seeding';
import { Attendance } from 'src/entities/Attendance.entity';

const now = new Date();

define(Attendance, () => {
  const attendance = new Attendance();
  attendance.createdAt = now;
  attendance.updatedAt = now;
  return attendance;
});
