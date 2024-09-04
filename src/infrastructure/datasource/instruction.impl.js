"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructionDataSourceImple = void 0;
const postgres_1 = require("../../data/postgres");
const domain_1 = require("../../domain");
class InstructionDataSourceImple {
    Update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const check_exists = yield postgres_1.prisma.instruction.findFirst({
                where: {
                    subject_id: data.subject_id,
                    academic_term_id: data.academic_term_id
                }
            });
            if (check_exists != null)
                throw new Error("Instruction does not exists");
            const result_created = yield postgres_1.prisma.instruction.update({
                where: {
                    subject_id_academic_term_id: {
                        subject_id: data.subject_id,
                        academic_term_id: data.academic_term_id
                    }
                },
                data: {
                    professor_id: data.professor_id,
                }
            });
            return domain_1.InstructionEntity.fromObject(result_created);
        });
    }
    Get(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield postgres_1.prisma.instruction.findMany({
                where: {
                    AND: [
                        { professor_id: data.professor_id, },
                        { subject_id: data.subject_id, },
                        { academic_term_id: data.academic_term_id },
                    ],
                },
                include: {
                    subject: true,
                }
            });
            const list_results = result.map((actual) => {
                const retornar = domain_1.InstructionEntity.fromObject(actual);
                retornar.subject = actual.subject.description;
                return retornar;
            });
            return list_results;
        });
    }
    Create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const check_if_exists = yield postgres_1.prisma.instruction.findFirst({
                where: {
                    subject_id: data.subject_id,
                    academic_term_id: data.academic_term_id
                }, include: {
                    subject: true
                }
            });
            if (check_if_exists == null)
                throw new Error("instruction does not exists");
            const result_created = yield postgres_1.prisma.instruction.update({
                where: {
                    subject_id_academic_term_id: {
                        subject_id: data.subject_id,
                        academic_term_id: data.academic_term_id,
                    }
                },
                data: {
                    professor_id: data.professor_id
                }
            });
            return domain_1.InstructionEntity.fromObject(result_created);
        });
    }
}
exports.InstructionDataSourceImple = InstructionDataSourceImple;
