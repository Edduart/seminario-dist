"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleController = void 0;
const domain_1 = require("../../domain");
const permissionValidator_1 = require("../services/permissionValidator");
class RoleController {
    constructor(repository) {
        this.repository = repository;
        this.getRoleMultiple = (req, res) => {
            const id = typeof req.query.id === 'string' && req.query.id.length > 0 && !Number.isNaN(Number(req.query.id)) ? parseInt(req.query.id) : undefined;
            const name = typeof req.query.name === 'string' && req.query.name.length < 100 && req.query.name.length > 1 ? req.query.name : undefined;
            try {
                const result = (0, permissionValidator_1.ValidatePermission)(req.body.Permisos, "user", 'R');
                new domain_1.GetRole(this.repository)
                    .execute(id, name)
                    .then((role) => res.set({ 'Access-Control-Expose-Headers': 'auth' }).json(role))
                    .catch((error) => res.status(400).json({ error }));
            }
            catch (error) {
                res.status(400).json("Acces denied");
            }
        };
        this.createRole = (req, res) => {
            try {
                const result = (0, permissionValidator_1.ValidatePermission)(req.body.Permisos, "user", 'C');
                const [error, CreateRole_] = domain_1.CreateRoleStruc.Create(req.body);
                if (error)
                    return res.status(400).json({ error });
                new domain_1.CreateRole(this.repository)
                    .execute(CreateRole_)
                    .then((role) => res.set({ 'Access-Control-Expose-Headers': 'auth' }).json(role))
                    .catch((error) => res.status(400).json({ error }));
            }
            catch (error) {
                res.status(400).json("Acces denied");
            }
        };
        this.deleteRole = (req, res) => {
            try {
                const result = (0, permissionValidator_1.ValidatePermission)(req.body.Permisos, "user", 'D');
                const id = parseInt(req.params.id);
                new domain_1.DeleteRole(this.repository)
                    .execute(id)
                    .then((role) => res.json(role))
                    .catch((error) => res.set({ 'Access-Control-Expose-Headers': 'auth' }).status(400).json({ error }));
            }
            catch (error) {
                res.status(400).json("Acces denied");
            }
        };
        this.getAllPermissions = (req, res) => {
            try {
                const result = (0, permissionValidator_1.ValidatePermission)(req.body.Permisos, "user", 'R');
                new domain_1.GetAllPermissions(this.repository)
                    .execute()
                    .then((role) => res.set({ 'Access-Control-Expose-Headers': 'auth' }).json(role))
                    .catch((error) => res.status(400).json({ error }));
            }
            catch (error) {
                res.status(400).json("Acces denied");
            }
        };
        this.UpdateRole = (req, res) => {
            try {
                const result = (0, permissionValidator_1.ValidatePermission)(req.body.Permisos, "user", 'U');
                const [error, nuevo] = domain_1.UpdateRoleStruc.Create(req.body);
                if (error)
                    return res.status(400).json({ error });
                new domain_1.UpdateRole(this.repository)
                    .execute(nuevo)
                    .then((role) => res.set({ 'Access-Control-Expose-Headers': 'auth' }).json(role))
                    .catch((error) => res.status(400).json({ error }));
            }
            catch (error) {
                res.status(400).json("Acces denied");
            }
        };
    }
}
exports.RoleController = RoleController;
