"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const domain_1 = require("../../domain");
class CourseController {
    constructor(courseRepository) {
        this.courseRepository = courseRepository;
        this.getCourses = (req, res) => {
            new domain_1.GetCourses(this.courseRepository)
                .execute()
                .then((courses) => {
                if (courses.length == 0) {
                    res.json({ msj: "No se a registrado ningun curso" });
                }
                else {
                    res.json(courses);
                }
            })
                .catch((error) => res.status(400).json({ error }));
        };
        this.getCourseById = (req, res) => {
            const id = +req.params.id;
            new domain_1.GetCourse(this.courseRepository)
                .execute(id)
                .then((course) => res.json({
                mjs: "Curso ID:" + course.id + ", encontrada exitosamente!",
                course,
            }))
                .catch((error) => res.status(400).json({ error }));
        };
        this.updateCourseById = (req, res) => {
            const id = +req.params.id;
            const [error, updateCourseDto] = domain_1.UpdateCourseDto.update(Object.assign(Object.assign({}, req.body), { id }));
            if (error)
                return res.status(400).json({ error });
            new domain_1.UpdateCourse(this.courseRepository)
                .execute(updateCourseDto)
                .then((course) => res.json({
                msj: "Curso ID:" + course.id + ", actualizada correctamente!",
                course,
            }))
                .catch((error) => res.status(400).json({ error }));
        };
        this.createCourse = (req, res) => {
            const [error, createCourseDto] = domain_1.CreateCourseDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            new domain_1.CreateCourse(this.courseRepository)
                .execute(createCourseDto)
                .then((course) => res.json({ msj: "Curso creada exitosamente", course }))
                .catch((error) => res.status(400).json({ error }));
        };
        this.deleteCourse = (req, res) => {
            const id = +req.params.id;
            new domain_1.DeleteCourse(this.courseRepository)
                .execute(id)
                .then((course) => res.json({
                msj: "Curso " + course.description + " eliminada exitosamente!",
                course,
            }))
                .catch((error) => res.status(400).json({ error }));
        };
    }
}
exports.CourseController = CourseController;
