import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerDocs from './routes/api.docs';
import indexRoutes from './routes/index.routes';

class Server { 
    //TODO: Crear la instancia global para nuestra app.
    public app: Application;

    //TODO: Generar el constructor
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    //TODO: Generar un método para la configuración
    private config(): void {
        //TODO: Configuración del puerto para el sever.
        this.app.set("port", process.env.PORT || 3000);

        //TODO: Mostrar las peticiones en consola
        this.app.use(morgan("dev"));

        //TODO: Uso de CORS (Cross Origin)
        this.app.use(cors());

        //TODO: Generar restricción a la API
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false}));
    }

    //TODO: !Generar un métood para la configuración de rutas
    private routes(): void {
        this.app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
        this.app.use("/api", indexRoutes);
    }

    //TODO: Generar un método para inicializar el servicio.
    start(): void {
        this.app.listen(this.app.get("port"), () => {
            console.log("Server on port", this.app.get("port"));
        });
    }
}

const server = new Server();
server.start();