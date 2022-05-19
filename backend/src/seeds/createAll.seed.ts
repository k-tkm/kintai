import { Attendance, AttendanceStatus } from 'src/entities/Attendance.entity';
import { Department } from 'src/entities/Department.entity';
import { User } from 'src/entities/User.entity';
import { UserDepartment } from 'src/entities/UserDepartment.entity';
import { Vacation } from 'src/entities/Vacation.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export default class createAll implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const isExistTestUser = connection
      .getRepository(User)
      .findOne({ email: 'test@example.com' });

    if (isExistTestUser) {
      // create users
      await factory(User)().create({
        lastName: 'テスト',
        firstName: '太郎',
        email: 'test@example.com',
      });
      await factory(User)().createMany(10);

      const users = await connection.getRepository(User).find();

      // create attendance
      for (let i = 1; i <= 21; i++) {
        const isEven = i % 2 === 0;
        const status = isEven ? AttendanceStatus.BEGIN : AttendanceStatus.END;
        const date = isEven
          ? new Date(`2022-05-${i} 09:00:00`)
          : new Date(`2022-05-${i} 19:00:00`);
        await factory(Attendance)().create({
          date: date,
          status: status,
          user: users[0],
          createdAt: date,
          updatedAt: date,
        });
      }

      // create vacations
      await factory(Vacation)().createMany(10, { user: users[0] });

      // create departments
      await factory(Department)().createMany(5);

      const departments = await connection.getRepository(Department).find();

      // create user_departments
      for (const department of departments) {
        await connection
          .createQueryBuilder()
          .insert()
          .into(UserDepartment)
          .values([{ department: department, user: users[0] }])
          .execute();
        await connection
          .createQueryBuilder()
          .insert()
          .into(UserDepartment)
          .values([{ department: department, user: users[1] }])
          .execute();
        await connection
          .createQueryBuilder()
          .insert()
          .into(UserDepartment)
          .values([{ department: department, user: users[2] }])
          .execute();
      }
    } else {
      console.error('The data already exists.');
    }
  }
}
