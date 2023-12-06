// OtherController.ts
import { Request, Response } from 'express';
import { Get } from '../config/ExpressMethod';

export default class OtherController {
	@Get('/players')
	getAllPlayers(req: Request, res: Response) {
		return res.send('Get all users');
	}
}
