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
exports.RoutineStatusController = void 0;
const common_1 = require("@nestjs/common");
const routine_status_service_1 = require("./routine-status.service");
const toggle_occurence_done_dto_1 = require("./dtos/toggle-occurence-done.dto");
let RoutineStatusController = class RoutineStatusController {
    statusService;
    constructor(statusService) {
        this.statusService = statusService;
    }
    getAllStatuses() {
        return this.statusService.getAll();
    }
    async getStatusByRoutineId(routineId) {
        const routineStatus = await this.statusService.getByRoutineId(routineId);
        if (!routineStatus) {
            throw new common_1.NotFoundException(`Routine with id ${routineId} not found.`);
        }
        return routineStatus;
    }
    async markOccurrenceDone(dto) {
        const routineStatus = await this.statusService.toggleOccurenceDone(dto.routineId, dto.index, dto.done);
        if (!routineStatus) {
            throw new common_1.NotFoundException(`Routine with id ${dto.routineId} not found.`);
        }
        return routineStatus;
    }
};
exports.RoutineStatusController = RoutineStatusController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoutineStatusController.prototype, "getAllStatuses", null);
__decorate([
    (0, common_1.Get)(':routineId'),
    __param(0, (0, common_1.Param)('routineId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoutineStatusController.prototype, "getStatusByRoutineId", null);
__decorate([
    (0, common_1.Post)('toggleOccurenceDone'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [toggle_occurence_done_dto_1.ToggleOccurrenceDoneDto]),
    __metadata("design:returntype", Promise)
], RoutineStatusController.prototype, "markOccurrenceDone", null);
exports.RoutineStatusController = RoutineStatusController = __decorate([
    (0, common_1.Controller)('api/routine-status/'),
    __metadata("design:paramtypes", [routine_status_service_1.RoutineStatusService])
], RoutineStatusController);
//# sourceMappingURL=routine-status.controller.js.map