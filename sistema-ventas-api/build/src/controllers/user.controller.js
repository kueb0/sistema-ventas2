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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const database_1 = __importDefault(require("../database/database"));
const utils_1 = require("../utils/utils");
class UserController {
    // Obtener todos los usuarios
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield database_1.default.usuario.findMany();
                res.json(users);
            }
            catch (error) {
                res.status(500).json({ message: `Error: ${error.message}` });
            }
        });
    }
    // Obtener un usuario por ID
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const user = yield database_1.default.usuario.findUnique({
                    where: { cveUsuario: Number(id) }
                });
                if (!user) {
                    return res.status(404).json({ message: "Usuario no encontrado" });
                }
                res.json(user);
            }
            catch (error) {
                res.status(500).json({ message: `Error: ${error.message}` });
            }
        });
    }
    // Crear un nuevo usuario
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, apellidos, username, password, cveRol } = req.body;
            try {
                const hashedPassword = yield utils_1.utils.hashPassword(password);
                const newUser = yield database_1.default.usuario.create({
                    data: {
                        nombre,
                        apellidos,
                        username,
                        password: hashedPassword,
                        //cveRol: true,
                        //rol : true
                    },
                });
                res.status(201).json(newUser);
            }
            catch (error) {
                res.status(500).json({ message: `Error: ${error.message}` });
            }
        });
    }
    // Actualizar un usuario existente
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const _a = req.body, { password, confirmPassword, username } = _a, rest = __rest(_a, ["password", "confirmPassword", "username"]);
            if (password || confirmPassword || username) {
                return res.status(400).json({ message: "No se permite actualizar contraseña ni nombre de usuario" });
            }
            try {
                const updatedUser = yield database_1.default.usuario.update({
                    where: { cveUsuario: Number(id) },
                    data: rest,
                });
                res.json(updatedUser);
            }
            catch (error) {
                res.status(500).json({ message: `Error: ${error.message}` });
            }
        });
    }
    // Eliminar un usuario
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield database_1.default.usuario.delete({
                    where: { cveUsuario: Number(id) }
                });
                res.json({ message: "Usuario eliminado con éxito" });
            }
            catch (error) {
                res.status(500).json({ message: `Error: ${error.message}` });
            }
        });
    }
}
exports.userController = new UserController();
