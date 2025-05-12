import { Module } from '@nestjs/common';
import { RoutineController } from './routine.controller';
import { RoutineService } from './routine.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Routine } from './entities/routine.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Routine])
  ],
  exports: [RoutineService],
  controllers: [RoutineController],
  providers: [RoutineService]
})
export class RoutineModule {}
