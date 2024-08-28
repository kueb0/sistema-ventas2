import { Request, Response } from "express";
import prisma from '../database/database';
import { utils } from '../utils/utils'



class IndexController {

    public async index(req: Request, res: Response) {
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
           return res.json({message: "API Works!"});

        } catch (error: any) {
            return res.status(500).json({ message: `Error: ${error.message}`});
        }

    }

    public insert(req: Request, res: Response) {
        try {
            return res.json({message: "INSERT Works!"});

        } catch (error: any) {
            return res.status(500).json({ message: `Error: ${error.message}`});
        }

    }


    public update(req: Request, res: Response) {
        try {
            return res.json({message: "Update Works!"});

        } catch (error: any) {
            return res.status(500).json({ message: `Error: ${error.message}`});
        }


    }

    public delete (req: Request, res: Response) {
        try {
            return res.json({message: "Delete Works!"});

        } catch (error: any) {
            return res.status(500).json({ message: `Error: ${error.message}`});
        }


    }

    }


export const indexController = new IndexController();