// UserController.ts
import { Request, Response } from 'express';
import {AuthMiddleware, Get, Prefix} from '../config/ExpressMethod';

@Prefix("/api")
export default class UserController {
	
	@Get('/users')
	@AuthMiddleware()
	getAllUsers(req: Request, res: Response) {
		return res.send('Get all users');
	}
	
	@Get('/users/:id')
	getUserById(req: Request, res: Response) {
		const userId = req.params.id;
		res.send(`Get user with ID: ${userId}`);
	}
}
