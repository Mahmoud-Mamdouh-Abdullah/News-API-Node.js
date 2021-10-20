import { Request, Response } from "express";
import { AuthService } from "../Services/AuthServices/AuthService";


const authService = new AuthService();

export async function Login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(404).send({ message: "invalid or missing data" });
    }
    let checker = authService.attemptLogin(email, password);
    if (!(await checker.checkLogin())) {
        return res.status(404).send({ message: "email or password is incorrect" });
    }
    res.json({ token: (await checker.saveTokenAndGet()) });
}