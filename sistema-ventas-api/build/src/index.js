"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const api_docs_1 = __importDefault(require("./routes/api.docs"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const usuario_routes_1 = __importDefault(require("./routes/usuario.routes"));
const general_routes_1 = __importDefault(require("./routes/general.routes"));
class Server {
    //TODO: Generar el constructor
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    //TODO: Generar un método para la configuración
    config() {
        //TODO: Configuración del puerto para el sever.
        this.app.set("port", process.env.PORT || 3000);
        //TODO: Mostrar las peticiones en consola
        this.app.use((0, morgan_1.default)("dev"));
        //TODO: Uso de CORS (Cross Origin)
        this.app.use((0, cors_1.default)());
        //TODO: Generar restricción a la API
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    //TODO: !Generar un métood para la configuración de rutas
    routes() {
        this.app.use("/api/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(api_docs_1.default));
        this.app.use("/api", index_routes_1.default);
        this.app.use("/api/auth", authRoutes_1.default);
        this.app.use("/api/usuarios", usuario_routes_1.default);
        this.app.use("/api/general", general_routes_1.default);
    }
    //TODO: Generar un método para inicializar el servicio.
    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log("Server on port", this.app.get("port"));
        });
    }
}
const server = new Server();
server.start();
