import express, { Express, Request, Response } from 'express';
import { db } from './config/connectionDB';
import { authRouter, galaxyRouter, planetRouter, userRouter } from './routes/indext';
import { errorHandler, logger } from './middlewares';
import { seedAdmin } from './config/seedAdmin';

const app: Express = express();

process.loadEnvFile();

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter.router);
app.use("/api/planets", planetRouter.router);
app.use("/api/galaxies", galaxyRouter.router);
app.use("/auth", authRouter.router);

app.use(errorHandler);

db.then(async () => {
    await seedAdmin();
    app.listen(port, "0.0.0.0", () => {
        console.log(`Server is running on port ${port}`);
    });
});