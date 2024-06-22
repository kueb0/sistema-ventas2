const swaggerJSDocs = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "Sistema ventas API",
            description: "Documentación API",
            contact: {
                name: "Sandra Karina Álvarez González",
                url:"https://github.com"
        },
        servers: [{
            url: "https://localhost:3000",
            description: "Developer Server"
        }]
    }
},
basePath: "/",
apis: ["./src/routes/*.ts"]
};

const swaggerDocs = swaggerJSDocs(options);
export default swaggerDocs;