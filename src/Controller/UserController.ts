import { Request, Response } from 'express';
import { UserService } from '../Services/UserService';


const userService = new UserService();

export async function allUsers(req: Request, res: Response) {
    let users = await userService.findAll(req.query);
    res.send({ data: users });
}

export async function createUser(req: Request, res: Response) {
    const { first_name, last_name, password, email, age } = req.body;
    if (!first_name || !last_name || !password || !email || !age) {
        return res.status(404).send({ message: "invalid data" });
    }
    let userID = await userService.addUser(req.body);
    res.json({userID});
}