"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutineStatusService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const routine_status_entity_1 = require("./entities/routine-status.entity");
const typeorm_2 = require("typeorm");
const date_fns_1 = require("date-fns");
const routine_service_1 = require("../routine/routine.service");
let RoutineStatusService = class RoutineStatusService {
    statusRepository;
    routineService;
    constructor(statusRepository, routineService) {
        this.statusRepository = statusRepository;
        this.routineService = routineService;
    }
    getPeriodKey(recurrence) {
        const now = new Date();
        switch (recurrence) {
            case 'day':
                return (0, date_fns_1.format)(now, 'yyyy-MM-dd');
            case 'week':
                return (0, date_fns_1.format)(now, 'yyyy-ww');
            case 'month':
                return (0, date_fns_1.format)(now, 'yyyy-MM');
            case 'year':
                return (0, date_fns_1.format)(now, 'yyyy');
            default:
                return (0, date_fns_1.format)(now, 'yyyy-MM');
        }
    }
    async getAll() {
        return this.statusRepository.find();
    }
    async getByRoutineId(routineId) {
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
    async toggleOccurenceDone(routineId, index, done) {
        const status = await this.getByRoutineId(routineId);
        if (!status) {
            return null;
        }
        const alreadyDone = status.doneOccurrences.includes(index);
        if (done && !alreadyDone) {
            status.doneOccurrences.push(index);
            status.doneOccurrences.sort((a, b) => a - b);
        }
        else if (!done && alreadyDone) {
            status.doneOccurrences = status.doneOccurrences.filter((i) => i !== index);
        }
        await this.statusRepository.save(status);
        return status;
    }
    async resetAllStatusesIfPeriodExpired() {
        const routines = await this.routineService.getRoutines();
        const routineMap = new Map();
        for (const routine of routines) {
            routineMap.set(routine.id, routine);
        }
        const statuses = await this.statusRepository.find();
        const updates = [];
        for (const status of statuses) {
            const routine = routineMap.get(status.routineId);
            if (!routine)
                continue;
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
};
exports.RoutineStatusService = RoutineStatusService;
exports.RoutineStatusService = RoutineStatusService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(routine_status_entity_1.RoutineStatus)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        routine_service_1.RoutineService])
], RoutineStatusService);
//# sourceMappingURL=routine-status.service.js.map