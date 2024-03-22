import express, {Application, NextFunction, Request, Response} from "express";
import cors from "cors";
import morgan from "morgan";
import {errorConverter, errorHandler} from "@/middlewares/errors.middleware";
import db from "@/config/database";
import env from "@/config/env";
import socket from "@/config/socket";
import routes from "@/routes";
import {apiReference} from "@scalar/express-api-reference";
import openapi from "@/config/openapi";
import filesystem from "@/config/filesystem";

const app: Application = express();
const environment = env.get("NODE_ENV");
if (environment != "test") db();

const reference = apiReference({
    theme: 'purple',
    spec: {
        content: openapi,
    },
});

app.use(express.urlencoded({extended: true}));
app.use(express.json({limit: "50mb"}));

app.use(filesystem);
app.use(cors());
app.use(socket);
app.use(morgan(env.get("NODE_ENV") === "production" ? "combined" : "dev"));
app.use("/", routes);
app.use('/documentation', reference);
app.use(errorConverter);
app.use(errorHandler);

export default app;
