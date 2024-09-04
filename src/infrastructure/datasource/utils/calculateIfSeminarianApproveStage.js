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
exports.calculateStageStatus = void 0;
const postgres_1 = require("../../../data/postgres");
class calculateStageStatus {
    static calculateIfSeminarianApproveStage(seminarians) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const seminarian of seminarians) {
                const subjectsByStage = yield postgres_1.prisma.subject.findMany({
                    where: {
                        AND: [{ course: { stage_id: seminarian.stage } }, { status: true }],
                    },
                    select: { id: true },
                });
                const seminarianApprovedSubjects = seminarian.enrollment.map((subject) => subject.subject_id);
                const noApprovedSubjects = subjectsByStage
                    .filter((subjects) => !seminarianApprovedSubjects.includes(subjects.id))
                    .map((subjectsToArray) => subjectsToArray.id);
                console.log({ noApprovedSubjects });
                if (noApprovedSubjects.length === 0 && seminarian.stage < 3) {
                    console.log("seminarian approved: ", seminarian.id);
                    yield postgres_1.prisma.seminarian.update({
                        where: { id: seminarian.id },
                        data: { stage: seminarian.stage + 1 },
                    });
                }
                else if (noApprovedSubjects.length === 0 && seminarian.stage === 3) {
                    console.log("seminarian approved and culminated: ", seminarian.id);
                    yield postgres_1.prisma.seminarian.update({
                        where: { id: seminarian.id },
                        data: { stage: seminarian.stage + 1, status: "CULMINADO" },
                    });
                }
                else {
                    console.log("seminarian NO approved: ", seminarian.id);
                }
            }
            return { status: "Ok" };
        });
    }
}
exports.calculateStageStatus = calculateStageStatus;
[];
