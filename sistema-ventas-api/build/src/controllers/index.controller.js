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
exports.indexController = void 0;
class IndexController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // ! para error 500
                // throw new RangeError('Error inesperado');
                // /*
                // const newUser = await prisma.usuario.create({
                //     data: {
                //         nombre: 'Ana Isabel',
                //         apellidos: 'Jasso Velázquez',
                //         username: 'anajasso',
                //         password: '123'
                //     }
                // });
                // const deletedUser = await prisma.usuario.delete({
                //     where: { cveUsuario: newUser.cveUsuario}
                // });
                //  */
                // const user = {
                //     cveUsuario : 1,
                //     nombre: 'Ana Isabel',
                //     rol: [1,2,3]
                // };
                // const token = utils.generateJWT(user);
                // console.log(token);
                // var jwt = "";
                // var data = utils.getPayload(jwt);
                // console.log(data);
                // const usuarios = await prisma.usuario.findMany();
                //return res.json(usuarios);
                return res.json({ message: "API Works!" });
            }
            catch (error) {
                return res.status(500).json({ message: `Error: ${error.message}` });
            }
        });
    }
    insert(req, res) {
        try {
            return res.json({ message: "INSERT Works!" });
        }
        catch (error) {
            return res.status(500).json({ message: `Error: ${error.message}` });
        }
    }
    update(req, res) {
        try {
            return res.json({ message: "Update Works!" });
        }
        catch (error) {
            return res.status(500).json({ message: `Error: ${error.message}` });
        }
    }
    delete(req, res) {
        try {
            return res.json({ message: "Delete Works!" });
        }
        catch (error) {
            return res.status(500).json({ message: `Error: ${error.message}` });
        }
    }
}
exports.indexController = new IndexController();
