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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutineStatus = void 0;
const typeorm_1 = require("typeorm");
const routine_entity_1 = require("../../routine/entities/routine.entity");
let RoutineStatus = class RoutineStatus {
    id;
    routine;
    routineId;
    doneOccurrences;
    timestamp;
    periodKey;
};
exports.RoutineStatus = RoutineStatus;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], RoutineStatus.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => routine_entity_1.Routine, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'routineId' }),
    __metadata("design:type", routine_entity_1.Routine)
], RoutineStatus.prototype, "routine", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RoutineStatus.prototype, "routineId", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-json', { default: '[]' }),
    __metadata("design:type", Array)
], RoutineStatus.prototype, "doneOccurrences", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", String)
], RoutineStatus.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RoutineStatus.prototype, "periodKey", void 0);
exports.RoutineStatus = RoutineStatus = __decorate([
    (0, typeorm_1.Entity)()
], RoutineStatus);
//# sourceMappingURL=routine-status.entity.js.map