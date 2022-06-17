import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AttendancesModule } from './modules/attendances/attendances.module';
import { AuthModule } from './modules/auth/auth.module';
import { DepartmentsModule } from './modules/departments/departments.module';
import { UsersController } from './modules/users/users.controller';
import { UserModule } from './modules/users/users.module';
import { VacationsModule } from './modules/vacations/vacations.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    DepartmentsModule,
    VacationsModule,
    AttendancesModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/entities/*.entity{.ts,.js}'],
      synchronize: false,
    }),
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
