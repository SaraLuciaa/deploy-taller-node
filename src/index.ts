import express, { Express, Request, Response } from 'express';
import { db } from './config/connectionDB';
import { authRouter, userRouter } from './routes/indext';
import { errorHandler, logger } from './middlewares';

const app: Express = express();

process.loadEnvFile();

const port = process.env.PORT || 3000;

app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter.router);
app.use("/auth", authRouter.router);

app.use(errorHandler);

db.then(() =>
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
);