import "reflect-metadata";

import express, {Response, Request, NextFunction} from 'express';
import swaggerUi = require('swagger-ui-express');
import swaggerJSDoc from 'swagger-jsdoc';
import "express-async-errors";
import {router} from './routes';
import './database';

const app = express();
app.use(express.json());

app.use(router);

app.use((err: Error, request:Request, response: Response, next: NextFunction )=>{
    if(err instanceof Error){
        return response.status(400).json({
            error: err.message
        });
    }

    return response.status(500).json({
        status: "error",
        message : "Internal Server Error"
    })
});

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Nlw valoriza API",
        version: "0.1.0",
        description:
        "Api desenvolvido para estudo durante Next Level Week Together, evento da Rocketseat",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "João Santana",
          email: "info@email.com",
        },
      },
      servers: [
        {
          url: "http://localhost:3000/",
        },
      ],
    },
    apis: [`${__dirname}/routes*.ts`, `${__dirname}/entities/*.ts`],
  };

  const specs = swaggerJSDoc(options);

  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {explorer: true})
  );

app.listen(3000, ()=> console.log("Server rodando"));