import { Injectable, NotFoundException } from '@nestjs/common';
import { Routine } from './entities/routine.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoutineDto } from './dtos/create-routine.dto';
import { PatchRoutineDto } from './dtos/patch-routine.dto';

@Injectable()
export class RoutineService {
  constructor(
    @InjectRepository(Routine)
    private readonly routineRepository: Repository<Routine>,
  ) {}

  getRoutines(): Promise<Routine[]> {
    return this.routineRepository.find();
  }

  getRoutineById(id: string): Promise<Routine | null> {
    return this.routineRepository.findOneBy({id});
  }

  async createRoutine(dto: CreateRoutineDto): Promise<Routine> {
    const newRoutine = this.routineRepository.create(dto);
    return this.routineRepository.save(newRoutine);
  }

  async patchRoutine(
    id: string,
    dto: Partial<PatchRoutineDto>,
  ): Promise<Routine> {
    const routine = await this.routineRepository.findOneBy({ id });

    if (!routine) {
      throw new NotFoundException(`Routine with id ${id} not found`);
    }

    const updated = this.routineRepository.merge(routine, dto);
    return this.routineRepository.save(updated);
  }

  async deleteRoutine(id: string): Promise<void> {
    const result = await this.routineRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Routine with id ${id} not found`);
    }
  }
}
