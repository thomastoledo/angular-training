import { RoutineEditorPageService } from './routine-editor-page.service';
import { RoutineService } from '@domain/routine/routine.service';
import { vi } from 'vitest';
import { inject } from '@angular/core';
import { of } from 'rxjs';
import { RoutineDto, CreateRoutineDto, PatchRoutineDto } from '@domain/routine/routine.model';
import { RoutineFormGroupValues } from '../routine-form/routine-form.factory';
import * as mapper from '../mappers/routine-form-mapper';

// Mock `inject` to return our fake service
vi.mock('@angular/core', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    inject: vi.fn(),
  };
});

describe('RoutineEditorPageService', () => {
  const routineServiceMock = {
    getRoutineById: vi.fn(),
    createRoutine: vi.fn(),
    patchRoutine: vi.fn(),
  };

  const mockRoutine: RoutineDto = {
    id: '123',
    name: 'Morning',
    description: 'Desc',
    startingDate: new Date(),
    endingDate: new Date(),
    reccurence: 'day',
    reccurenceCoef: 1,
  };

  const formValues: RoutineFormGroupValues = {
    name: 'Test',
    description: 'Desc',
    startingDate: new Date(),
    endingDate: new Date(),
    reccurence: 'day',
    reccurenceCoef: 2,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (inject as unknown as vi.Mock).mockReturnValue(routineServiceMock);
  });

  it('should call getRoutineById', () => {
    routineServiceMock.getRoutineById.mockReturnValue(of(mockRoutine));
    const service = new RoutineEditorPageService();

    service.getRoutine('123').subscribe((res) => {
      expect(res).toEqual(mockRoutine);
    });

    expect(routineServiceMock.getRoutineById).toHaveBeenCalledWith('123');
  });

  it('should call createRoutine with mapped dto', () => {
    const mappedDto: CreateRoutineDto = {
      ...formValues,
    };
    vi.spyOn(mapper, 'toCreateDto').mockReturnValue(mappedDto);
    routineServiceMock.createRoutine.mockReturnValue(of(mockRoutine));

    const service = new RoutineEditorPageService();
    service.createRoutine(formValues).subscribe((res) => {
      expect(res).toEqual(mockRoutine);
    });

    expect(mapper.toCreateDto).toHaveBeenCalledWith(formValues);
    expect(routineServiceMock.createRoutine).toHaveBeenCalledWith(mappedDto);
  });

  it('should call patchRoutine with mapped dto', () => {
    const mappedDto: PatchRoutineDto = {
      name: 'Updated',
    };
    vi.spyOn(mapper, 'toPatchDto').mockReturnValue(mappedDto);
    routineServiceMock.patchRoutine.mockReturnValue(of(mockRoutine));

    const service = new RoutineEditorPageService();
    service.patchRoutine('123', mockRoutine, formValues).subscribe((res) => {
      expect(res).toEqual(mockRoutine);
    });

    expect(mapper.toPatchDto).toHaveBeenCalledWith(mockRoutine, formValues);
    expect(routineServiceMock.patchRoutine).toHaveBeenCalledWith('123', mappedDto);
  });
});
