import { Injectable } from '@nestjs/common';
import { Routine } from './entities/routine.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoutineDto } from './dtos/create-routine.dto';

@Injectable()
export class RoutineService {
  constructor(
    @InjectRepository(Routine)
    private readonly routineRepository: Repository<Routine>,
  ) {}
  
  getRoutines(): Promise<Routine[]> {
    return this.routineRepository.find();
  }
}

