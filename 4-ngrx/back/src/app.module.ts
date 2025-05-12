import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutineModule } from './routine/routine.module';
import { RoutineStatusModule } from './routine-status/routine-status.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'training.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    RoutineModule,
    RoutineStatusModule,
    ScheduleModule.forRoot()
  ],
})
export class AppModule {}
