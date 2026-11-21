import express, { Application, Request, Response } from "express";
import { userRoute } from "./modules/Users/user.route";
import { profileRoute } from "./modules/Profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";


const app: Application = express();

// global middleware -body parser
app.use(express.json());

// Application user Route
app.use("/api/v1/users", userRoute);

// profile route
app.use("/api/v1/profile", profileRoute);

// auth Route
app.use("/api/v1/", authRoute)

// root
app.get("/", (req: Request, res: Response) => {
  res.send("Express Server on Fire");
});

export default app;