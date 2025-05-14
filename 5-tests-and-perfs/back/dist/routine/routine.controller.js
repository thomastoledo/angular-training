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
exports.RoutineController = void 0;
const common_1 = require("@nestjs/common");
const routine_service_1 = require("./routine.service");
const create_routine_dto_1 = require("./dtos/create-routine.dto");
let RoutineController = class RoutineController {
    routineService;
    constructor(routineService) {
        this.routineService = routineService;
    }
    getRoutines() {
        return this.routineService.getRoutines();
    }
    async getRoutine(id) {
        const routine = await this.routineService.getRoutineById(id);
        if (!routine) {
            throw new common_1.NotFoundException(`Routine with id ${id} not found.`);
        }
        return routine;
    }
    createRoutine(dto) {
        return this.routineService.createRoutine(dto);
    }
    updateRoutine(id, dto) {
        return this.routineService.patchRoutine(id, dto);
    }
    deleteRoutine(id) {
        return this.routineService.deleteRoutine(id);
    }
};
exports.RoutineController = RoutineController;
__decorate([
    (0, common_1.Get)('/list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoutineController.prototype, "getRoutines", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoutineController.prototype, "getRoutine", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_routine_dto_1.CreateRoutineDto]),
    __metadata("design:returntype", Promise)
], RoutineController.prototype, "createRoutine", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoutineController.prototype, "updateRoutine", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoutineController.prototype, "deleteRoutine", null);
exports.RoutineController = RoutineController = __decorate([
    (0, common_1.Controller)('api/routine'),
    __metadata("design:paramtypes", [routine_service_1.RoutineService])
], RoutineController);
//# sourceMappingURL=routine.controller.js.map