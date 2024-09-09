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
exports.EnrollmentSubjectFilter = void 0;
const postgres_1 = require("../../../data/postgres");
class EnrollmentSubjectFilter {
    static subjectFilter(enrollmentStatus, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getSeminarianStage = yield postgres_1.prisma.seminarian.findUnique({
                    where: { id: id },
                    select: { stage: true },
                });
                console.log({ getSeminarianStage });
                const subjectsWithPrecedent = yield postgres_1.prisma.subject.findMany({
                    where: {
                        status: true,
                        course: { stage_id: getSeminarianStage === null || getSeminarianStage === void 0 ? void 0 : getSeminarianStage.stage },
                    },
                    select: { precedent: true },
                });
                const subjectsWithPrecedentMap = subjectsWithPrecedent
                    .filter((precedent) => precedent.precedent)
                    .map((subject) => subject.precedent);
                console.log({ subjectsWithPrecedent });
                const reprovedSubjects = yield postgres_1.prisma.enrollment.findMany({
                    where: {
                        AND: [
                            {
                                seminarian_id: id,
                                status: "REPROBADO",
                                subject_id: { in: subjectsWithPrecedentMap },
                            },
                        ],
                    },
                    select: { subject_id: true },
                });
                console.log({ reprovedSubjects });
                const precedentCourse = yield postgres_1.prisma.subject.findMany({
                    where: { id: { in: subjectsWithPrecedentMap } },
                    select: { id: true, course_id: true },
                });
                const enrolledSubjectsCompleteList = enrollmentStatus.map((enrolledSubjects) => ({
                    id: enrolledSubjects.subject_id,
                    status: enrolledSubjects.status,
                    precedent: enrolledSubjects.subject.precedent,
                    course: enrolledSubjects.subject.course_id,
                }));
                console.log({ enrolledSubjectsCompleteList });
                let seminarianStage = getSeminarianStage.stage;
                const availableSubjects = yield postgres_1.prisma.stage.findMany({
                    where: { id: seminarianStage },
                    select: {
                        description: true,
                        course: {
                            select: {
                                id: true,
                                description: true,
                                subject: {
                                    where: { status: true },
                                    select: {
                                        id: true,
                                        description: true,
                                        precedent: true,
                                        course: { select: { id: true } },
                                        semester: true,
                                    },
                                },
                            },
                        },
                    },
                });
                let numberOfIterations = 0;
                let approvedAtLeastOne = false;
                const filterSubjects = availableSubjects.map((stage) => ({
                    description: stage.description,
                    course: stage.course.map((course) => {
                        numberOfIterations++;
                        if (numberOfIterations === 1 || approvedAtLeastOne) {
                            approvedAtLeastOne = false;
                            return {
                                description: course.description,
                                subject: course.subject.filter((subject) => {
                                    console.log("actual subject", subject.id);
                                    const subjectEnrolledApproved = enrolledSubjectsCompleteList.filter((subjectEnrolled) => subjectEnrolled.id === subject.id &&
                                        subjectEnrolled.status === "APROBADO");
                                    console.log({ subjectEnrolledApproved });
                                    if (subjectEnrolledApproved.length > 0)
                                        approvedAtLeastOne = true;
                                    const subjectEnrolledOther = enrolledSubjectsCompleteList.filter((subjectEnrolled) => subjectEnrolled.id === subject.id &&
                                        subjectEnrolled.status !== "APROBADO");
                                    console.log({ subjectEnrolledOther });
                                    if (subject.precedent != null) {
                                        console.log(subject.id, "have a precedent: ", subject.precedent);
                                        const matchingPrecedent = enrolledSubjectsCompleteList.filter((SubjectPrecedentApproved) => {
                                            if (SubjectPrecedentApproved.id === subject.precedent &&
                                                SubjectPrecedentApproved.status === "APROBADO") {
                                                console.log("precedent was approved");
                                                return true;
                                            }
                                        });
                                        if (matchingPrecedent.length > 0) {
                                            if (matchingPrecedent
                                                .map((precedent) => precedent.id)
                                                .includes(subject.precedent)) {
                                                if (subjectEnrolledApproved.length > 0 ||
                                                    subjectEnrolledOther.length > 0) {
                                                    console.log("already enrolled so is removed", subject.id);
                                                    return false;
                                                }
                                                else {
                                                    console.log("No removed because precedent approved", subject.id);
                                                    return true;
                                                }
                                            }
                                            else {
                                                console.log({ matchingPrecedent });
                                                console.log("Removed because precedent no approved", subject.id);
                                                return false;
                                            }
                                        }
                                        else if (subjectEnrolledOther.length > 0) {
                                            console.log("Removed because precedent no approved", subject.id);
                                            return false;
                                        }
                                        else {
                                            console.log("Precedent no in list, check if was reproved", subject.id);
                                            if (reprovedSubjects
                                                .map((id) => id.subject_id)
                                                .includes(subject.precedent)) {
                                                console.log("subject was reproved, so can be added", subject.id);
                                                return true;
                                            }
                                            else if (precedentCourse
                                                .filter((id) => {
                                                if (id.id == subject.precedent) {
                                                    return true;
                                                }
                                            })
                                                .map((id) => id.id)
                                                .includes(subject.precedent)) {
                                                console.log("actual list precedent", precedentCourse
                                                    .filter((id) => {
                                                    if (id.id == subject.precedent) {
                                                        return true;
                                                    }
                                                })
                                                    .map((id) => id.id));
                                                if (precedentCourse
                                                    .filter((id) => {
                                                    if (id.id == subject.precedent) {
                                                        return true;
                                                    }
                                                })
                                                    .map((courseId) => courseId.course_id)
                                                    .includes(subject.course.id)) {
                                                    console.log(`precedent of the same course, so added, actual subject: ID ${subject.id}, COURSE: ${subject.course.id}, precedent course ID: ${precedentCourse
                                                        .filter((id) => {
                                                        if (id.id == subject.precedent && id.course_id == subject.course.id) {
                                                            return true;
                                                        }
                                                    })
                                                        .map((id) => id.course_id)}`);
                                                    return true;
                                                }
                                            }
                                            else {
                                                console.log("no reproved and no same course, so no added");
                                            }
                                        }
                                    }
                                    else {
                                        if (subjectEnrolledApproved.length > 0) {
                                            console.log("Removed because approved", subject.id);
                                            approvedAtLeastOne = true;
                                            return false;
                                        }
                                        else if (subjectEnrolledOther.length > 0) {
                                            console.log("Removed because is enrolled", subject.id);
                                            return false;
                                        }
                                        else {
                                            console.log("No removed, no enrolled", subject.id);
                                            return true;
                                        }
                                    }
                                }),
                            };
                        }
                        else {
                            return undefined;
                        }
                    }),
                }));
                console.log(JSON.stringify(filterSubjects));
                const availableSubjectsMap = {
                    seminarian_id: id,
                    stage: filterSubjects.map((stage) => stage.description).toString(),
                    course: filterSubjects.flatMap((stage) => stage.course.map((course) => {
                        var _a;
                        return ({
                            course: course === null || course === void 0 ? void 0 : course.description,
                            subject: (_a = course === null || course === void 0 ? void 0 : course.subject) === null || _a === void 0 ? void 0 : _a.map((subject) => ({
                                id: subject.id,
                                name: subject.description,
                                semester: subject.semester,
                            })),
                        });
                    })),
                };
                return availableSubjectsMap;
            }
            catch (error) {
                throw `error while calculating available subjects ${error}`;
            }
        });
    }
    static subjectFilterForEquivalency(enrollmentStatus, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const enrolledSubjectsCompleteList = enrollmentStatus.map((enrolledSubjects) => ({
                    id: enrolledSubjects.subject_id,
                    status: enrolledSubjects.status,
                    precedent: enrolledSubjects.subject.precedent,
                    course: enrolledSubjects.subject.course_id,
                }));
                console.log({ enrolledSubjectsCompleteList });
                const availableSubjects = yield postgres_1.prisma.stage.findMany({
                    select: {
                        description: true,
                        course: {
                            select: {
                                id: true,
                                description: true,
                                subject: {
                                    where: { status: true },
                                    select: {
                                        id: true,
                                        description: true,
                                        precedent: true,
                                        course: { select: { id: true } },
                                        semester: true,
                                    },
                                },
                            },
                        },
                    },
                });
                const filterSubjects = availableSubjects.map((stage) => ({
                    description: stage.description,
                    course: stage.course.map((course) => {
                        if (true) {
                            return {
                                description: course.description,
                                subject: course.subject.filter((subject) => {
                                    console.log("actual subject", subject.id);
                                    const subjectEnrolledApproved = enrolledSubjectsCompleteList.filter((subjectEnrolled) => subjectEnrolled.id === subject.id &&
                                        subjectEnrolled.status === "APROBADO");
                                    console.log({ subjectEnrolledApproved });
                                    const subjectEnrolledOther = enrolledSubjectsCompleteList.filter((subjectEnrolled) => subjectEnrolled.id === subject.id &&
                                        subjectEnrolled.status !== "APROBADO");
                                    console.log({ subjectEnrolledOther });
                                    if (subject.precedent != null) {
                                        console.log(subject.id, "have a precedent: ", subject.precedent);
                                        const matchingPrecedent = enrolledSubjectsCompleteList.filter((SubjectPrecedentApproved) => {
                                            if (SubjectPrecedentApproved.id === subject.precedent &&
                                                SubjectPrecedentApproved.status === "APROBADO") {
                                                console.log("precedent was approved");
                                                return true;
                                            }
                                        });
                                        if (matchingPrecedent.length > 0) {
                                            if (matchingPrecedent
                                                .map((precedent) => precedent.id)
                                                .includes(subject.precedent)) {
                                                if (subjectEnrolledApproved.length > 0 ||
                                                    subjectEnrolledOther.length > 0) {
                                                    console.log("already enrolled so is removed", subject.id);
                                                    return false;
                                                }
                                                else {
                                                    console.log("No removed because precedent approved", subject.id);
                                                    return true;
                                                }
                                            }
                                            else {
                                                console.log("Removed because precedent no approved", subject.id);
                                                return false;
                                            }
                                        }
                                        else if (subjectEnrolledOther.length > 0) {
                                            console.log("Removed because precedent no approved", subject.id);
                                            return false;
                                        }
                                    }
                                    else {
                                        if (subjectEnrolledApproved.length > 0) {
                                            console.log("Removed because approved", subject.id);
                                            return false;
                                        }
                                        else if (subjectEnrolledOther.length > 0) {
                                            console.log("Removed because is enrolled", subject.id);
                                            return false;
                                        }
                                        else {
                                            console.log("No removed, no enrolled", subject.id);
                                            return true;
                                        }
                                    }
                                }),
                            };
                        }
                    }),
                }));
                console.log(JSON.stringify(filterSubjects));
                const availableSubjectsEquivalencyMap = {
                    seminarian_id: id,
                    stage: filterSubjects.flatMap((stage) => ({
                        name: stage.description,
                        stage: stage.course.map((course) => {
                            var _a;
                            return ({
                                course: course === null || course === void 0 ? void 0 : course.description,
                                subject: (_a = course === null || course === void 0 ? void 0 : course.subject) === null || _a === void 0 ? void 0 : _a.map((subject) => ({
                                    id: subject.id,
                                    name: subject.description,
                                    semester: subject.semester,
                                })),
                            });
                        }),
                    })),
                };
                return availableSubjectsEquivalencyMap;
            }
            catch (error) {
                console.log(error);
                throw `Error while seminarian enrollment calculation, ${error}`;
            }
        });
    }
}
exports.EnrollmentSubjectFilter = EnrollmentSubjectFilter;
