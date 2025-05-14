"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutineStatusModule = void 0;
const common_1 = require("@nestjs/common");
const routine_status_controller_1 = require("./routine-status.controller");
const routine_status_service_1 = require("./routine-status.service");
const routine_module_1 = require("../routine/routine.module");
const typeorm_1 = require("@nestjs/typeorm");
const routine_status_entity_1 = require("./entities/routine-status.entity");
const cronjobs_service_1 = require("./cronjobs/cronjobs.service");
let RoutineStatusModule = class RoutineStatusModule {
};
exports.RoutineStatusModule = RoutineStatusModule;
exports.RoutineStatusModule = RoutineStatusModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([routine_status_entity_1.RoutineStatus]), routine_module_1.RoutineModule],
        controllers: [routine_status_controller_1.RoutineStatusController],
        providers: [routine_status_service_1.RoutineStatusService, cronjobs_service_1.CronJobsService],
    })
], RoutineStatusModule);
//# sourceMappingURL=routine-status.module.js.map