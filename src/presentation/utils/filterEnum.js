"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterEnum = void 0;
class FilterEnum {
    static filterInstructorPosition(instructorPositions) {
        let instructorPositionEnum = {
            RECTOR: "RECTOR",
            VICERECTOR: "VICERECTOR",
            ASESOR_PROPEDEUTICO: "ASESOR PROPEDEUTICO",
            DIRECTOR_ESPIRITUAL: "DIRECTOR ESPIRITUAL",
            ECONOMO: "ECONOMO",
        };
        for (const instructorPosition of instructorPositions) {
            if (instructorPosition.instructor_position == "RECTOR") {
                delete instructorPositionEnum.RECTOR;
            }
            if (instructorPosition.instructor_position == "VICERECTOR") {
                delete instructorPositionEnum.VICERECTOR;
            }
            if (instructorPosition.instructor_position == "ECONOMO") {
                delete instructorPositionEnum.ECONOMO;
            }
        }
        return instructorPositionEnum;
    }
}
exports.FilterEnum = FilterEnum;
