import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoutineStatus } from './entities/routine-status.entity';
import { Repository } from 'typeorm';
import { format } from 'date-fns';
import { maybe } from 'pelouse';
import { RoutineService } from 'src/routine/routine.service';
import { Routine } from 'src/routine/entities/routine.entity';

@Injectable()
export class RoutineStatusService {
  constructor(
    @InjectRepository(RoutineStatus)
    private readonly statusRepository: Repository<RoutineStatus>,
    private readonly routineService: RoutineService,
  ) {}

  private getPeriodKey(recurrence: string): string {
    const now = new Date();

    switch (recurrence) {
      case 'day':
        return format(now, 'yyyy-MM-dd');
      case 'week':
        return format(now, 'yyyy-ww');
      case 'month':
        return format(now, 'yyyy-MM');
      case 'year':
        return format(now, 'yyyy');
      default:
        return format(now, 'yyyy-MM');
    }
  }

  async getAll(): Promise<RoutineStatus[]> {
    return this.statusRepository.find();
  }

  async getByRoutineId(routineId: string): Promise<RoutineStatus | null> {
    const routine = await this.routineService.getRoutineById(routineId);
    if (!routine) {
      return null;
    }

    const recurrence = routine.reccurence;
    const currentPeriod = this.getPeriodKey(recurrence);

    let status = await this.statusRepository.findOne({ where: { routineId } });

    if (!status) {
      status = this.statusRepository.create({
        routineId,
        doneOccurrences: [],
        periodKey: currentPeriod,
      });
      await this.statusRepository.save(status);
    }

    if (status.periodKey !== currentPeriod) {
      status.doneOccurrences = [];
      status.periodKey = currentPeriod;
      await this.statusRepository.save(status);
    }

    return status;
  }

  async markOccurrenceDone(
    routineId: string,
    index: number,
  ): Promise<RoutineStatus | null> {
    const status = await this.getByRoutineId(routineId);
    if (!status) {
      return null;
    }

    if (!status.doneOccurrences.includes(index)) {
      status.doneOccurrences.push(index);
      status.doneOccurrences.sort((a, b) => a - b);
      await this.statusRepository.save(status);
    }

    return status;
  }

  async resetAllStatusesIfPeriodExpired(): Promise<void> {
    const routines = await this.routineService.getRoutines();
    const routineMap = new Map<string, Routine>();
    for (const routine of routines) {
      routineMap.set(routine.id, routine);
    }

    const statuses = await this.statusRepository.find();
    const updates: RoutineStatus[] = [];

    for (const status of statuses) {
      const routine = routineMap.get(status.routineId);
      if (!routine) continue;

      const expectedPeriod = this.getPeriodKey(routine.reccurence);
      if (status.periodKey !== expectedPeriod) {
        status.doneOccurrences = [];
        status.periodKey = expectedPeriod;
        updates.push(status);
      }
    }

    if (updates.length > 0) {
      await this.statusRepository.save(updates);
    }
  }
}
