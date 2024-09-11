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
exports.parseProfessorGet = exports.parseUserDataUpdate = exports.parseInstructorData = exports.parseUserData = exports.parsePersonData = void 0;
const envs_1 = require("../../config/envs");
const domain_1 = require("../../domain");
const hashHandler_1 = require("../services/hashHandler");
const formatDate_1 = require("../../presentation/utils/formatDate");
const serverAddress = envs_1.envs.SERVER_ADDRESS;
function parsePersonData(req, path) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        try {
            const origin = yield JSON.parse(req);
            const imagePath = serverAddress + path.replace(/\\/g, "/");
            const socials = (_b = (_a = origin === null || origin === void 0 ? void 0 : origin.persona) === null || _a === void 0 ? void 0 : _a.social) === null || _b === void 0 ? void 0 : _b.map((social) => new domain_1.CreateSocialMedia(social.social_media_category, social.link));
            const phones = (_c = origin.persona.phone) === null || _c === void 0 ? void 0 : _c.map((phone) => new domain_1.CreatePhone(phone.phone_number, phone.description.toUpperCase()));
            const personData = new domain_1.CreatePerson((_d = origin === null || origin === void 0 ? void 0 : origin.persona) === null || _d === void 0 ? void 0 : _d.id, imagePath, (_f = (_e = origin === null || origin === void 0 ? void 0 : origin.persona) === null || _e === void 0 ? void 0 : _e.forename) === null || _f === void 0 ? void 0 : _f.toUpperCase(), (_h = (_g = origin === null || origin === void 0 ? void 0 : origin.persona) === null || _g === void 0 ? void 0 : _g.surname) === null || _h === void 0 ? void 0 : _h.toUpperCase(), (_j = origin === null || origin === void 0 ? void 0 : origin.persona) === null || _j === void 0 ? void 0 : _j.email, ((_k = origin === null || origin === void 0 ? void 0 : origin.persona) === null || _k === void 0 ? void 0 : _k.birthdate) != null
                ? new Date(origin.persona.birthdate)
                : new Date("2024-01-01"), (_l = origin === null || origin === void 0 ? void 0 : origin.persona) === null || _l === void 0 ? void 0 : _l.medical_record, (_m = origin === null || origin === void 0 ? void 0 : origin.persona) === null || _m === void 0 ? void 0 : _m.BloodType, phones, socials);
            return personData;
        }
        catch (error) {
            console.error("Error parsing person data:", error);
            throw { msj: "An error occurred while processing person data", error };
        }
    });
}
exports.parsePersonData = parsePersonData;
function parseUserData(req, person) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const origin = yield JSON.parse(req);
            const hashedPassword = yield (0, hashHandler_1.encode)(origin.persona.id);
            const degrees = origin.user.degree != null
                ? origin.user.degree.map((degree_Actual) => new domain_1.CreateDegree(origin.persona.id, degree_Actual.description.toUpperCase(), degree_Actual.link))
                : undefined;
            const parsed_parish_id = Number(origin.user.parish_id);
            if (Number.isNaN(parsed_parish_id) || !Number.isInteger(parsed_parish_id) || parsed_parish_id < 0) {
                throw new Error("Parish id invalid, must be a non negative integer");
            }
            const userData = new domain_1.CreateUserDTO(person, degrees, parsed_parish_id, origin.user.role, hashedPassword);
            return userData;
        }
        catch (error) {
            console.error("Error parsing user data:", error);
            throw { msj: "An error occurred while processing user data", error };
        }
    });
}
exports.parseUserData = parseUserData;
function parseInstructorData(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const origin = yield JSON.parse(req);
            const { is_instructor, starting_date, instructor_position, status } = origin.instructor;
            if (is_instructor == false)
                return null;
            const professor_id = origin.persona.id;
            const instructorData = {
                professor_id,
                starting_date,
                instructor_position,
                status,
            };
            return instructorData;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.parseInstructorData = parseInstructorData;
function parseUserDataUpdate(req) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const origin = yield JSON.parse(req);
            const degrees = origin.user.degree.map((degree_Actual) => new domain_1.CreateDegree(origin.persona.id, degree_Actual.description.toUpperCase(), degree_Actual.link));
            const userData = new domain_1.UpdateUserDto(origin.persona.id, degrees, origin.user.parish_id, (_a = origin.user) === null || _a === void 0 ? void 0 : _a.role);
            return { userData };
        }
        catch (error) {
            throw error;
        }
    });
}
exports.parseUserDataUpdate = parseUserDataUpdate;
function parseProfessorGet(returnFromDB) {
    return __awaiter(this, void 0, void 0, function* () {
        const professors = returnFromDB.map((professor) => {
            var _a, _b, _c;
            let person = domain_1.PersonEntity.fromdb(professor.user.person);
            person.date_String = (0, formatDate_1.formatDate)(person.birthdate.toISOString());
            const status = professor.status_id;
            const Role_id = professor.user.Role_id;
            const userStatus = professor.user.status;
            let user = professor.user.parish;
            const phones = professor.user.person.phone_number.map((phone) => {
                return domain_1.PhoneEntity.fromdb(phone);
            });
            const socials = professor.user.person.social_media.map((socials) => {
                return domain_1.SocialMediaEntity.fromdb({
                    link: socials.link,
                    social_media_category: socials.social_media_category,
                });
            });
            const degrees = professor.user.academic_degree.map((degrees) => {
                return domain_1.DegreeEntity.fromdb(degrees);
            });
            let instructor;
            if (professor.instructor != null) {
                instructor = {
                    professor_id: (_a = professor.instructor) === null || _a === void 0 ? void 0 : _a.professor_id,
                    starting_date: (_b = professor.instructor) === null || _b === void 0 ? void 0 : _b.starting_date,
                    instructor_position: (_c = professor.instructor) === null || _c === void 0 ? void 0 : _c.instructor_position,
                    status: professor.instructor.status,
                    starting_date_string: (0, formatDate_1.formatDate)(professor.instructor.starting_date.toISOString()),
                };
            }
            else {
                instructor = { is_instructor: false };
            }
            return domain_1.ProfessorEntity.fromObject(person, socials, phones, status, userStatus, degrees, instructor, Role_id, user);
        });
        return professors;
    });
}
exports.parseProfessorGet = parseProfessorGet;
