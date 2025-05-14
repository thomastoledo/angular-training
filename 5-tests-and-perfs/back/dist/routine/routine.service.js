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
exports.RoutineService = void 0;
const common_1 = require("@nestjs/common");
const routine_entity_1 = require("./entities/routine.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let RoutineService = class RoutineService {
    routineRepository;
    constructor(routineRepository) {
        this.routineRepository = routineRepository;
    }
    getRoutines() {
        return this.routineRepository.find();
    }
    getRoutineById(id) {
        return this.routineRepository.findOneBy({ id });
    }
    async createRoutine(dto) {
        const newRoutine = this.routineRepository.create(dto);
        return this.routineRepository.save(newRoutine);
    }
    async patchRoutine(id, dto) {
        const routine = await this.routineRepository.findOneBy({ id });
        if (!routine) {
            throw new common_1.NotFoundException(`Routine with id ${id} not found`);
        }
        const updated = this.routineRepository.merge(routine, dto);
        return this.routineRepository.save(updated);
    }
    async deleteRoutine(id) {
        const result = await this.routineRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Routine with id ${id} not found`);
        }
    }
};
exports.RoutineService = RoutineService;
exports.RoutineService = RoutineService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(routine_entity_1.Routine)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RoutineService);
//# sourceMappingURL=routine.service.js.map