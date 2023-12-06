import {Request, Response, NextFunction} from "express";

export default function authMiddleware (req: Request, res: Response, next: NextFunction) {
	const id = Number(req.query.token);
	if (id === 2) {
		next();
	} else {
		res.send("Unauthorized routes!");
	}
}