import colors from "colors";
import signale from "signale";
import { Request, Response, NextFunction } from "express";
import { validationResult} from "express-validator";

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
	console.log(signale.info(colors.bgCyan.bold.white("Desde handleInputErrors en el Middleware")));

	let errors = validationResult(req)
	if(!errors.isEmpty()){
		return res.status(400).json({errors: errors.array()});
	}
	next()
	
}