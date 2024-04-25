import colors from "colors";
import signale from "signale";
import { Request, Response } from "express";
import Product from "../models/Product.model";

export const getProducts = async (req: Request, res: Response) => {
	console.log(signale.info(colors.bgWhite.black.bold("Iniciando desde la funcion 001 de getProducts en product.ts en handlres") ));
	try {
		const products = await Product.findAll({
			order: [
				['price', 'DESC']
			], 
		});
		res.json({data: products})
	} catch (error) {
		console.log(signale.error(colors.red("Error en el trycatch de getProducts en product.ts en handlres") ));
		console.log(signale.error(colors.red(error)));
		
	}
}

export const getProductById = async (req: Request, res: Response) => {
	console.log(signale.info(colors.bgWhite.black.bold("Iniciando desde la funcion 002 de getProductById en product.ts en handlres") ));
	try {
		const { id } = req.params;
		const product = await Product.findByPk(id);
		if(!product) {
			return res.status(404).json({
				error: `No se encontro el producto con el id ${id}`
			})
		}
		res.json({data: product})
	} catch (error) {
		console.log(signale.error(colors.red("Error en el trycatch de getProductById en product.ts en handlres") ));
		console.log(signale.error(colors.red(error)));
		
	}
}

export const createProduct = async (req: Request, res : Response) => {
	console.log(signale.info(colors.bgWhite.black.bold("Iniciando desde la funcion 003 de createProduct en product.ts en handlres") ));
	//Logic
	try {
		const product = await Product.create(req.body)
	
		res.send({data: product});
	} catch (error) {
		console.log(signale.error(colors.red("Error en el trycatch de createProduct en product.ts en handlres") ));
		
		console.log(signale.error(colors.red(error)));
		
	}
	
}

export const updateProduct = async (req: Request, res: Response) => {
	console.log(signale.info(colors.bgWhite.black.bold("Iniciando desde la funcion 004 de updateProduct en product.ts en handlres") ));
	try{
		const { id } = req.params;
		const product = await Product.findByPk(id);
		if(!product) {
			return res.status(404).json({
				error: `No se encontro el producto con el id ${id}`
			})
		}

		//Update value 
		console.log(req.body);
		await product.update(req.body);
		await product.save();
		
		res.json({data: product})
	} catch(error) {
		console.log(signale.error(colors.red("Error en el trycatch de updateProduct en product.ts en handlres") ));
		
		console.log(signale.error(colors.red(error)));
	}
}

export const updateAvailability = async (req: Request, res: Response) => {
	console.log(signale.info(colors.bgWhite.black.bold("Iniciando desde la funcion 005 de updateAvailability en product.ts en handlres") ));
	const { id } = req.params;
		const product = await Product.findByPk(id);
		if(!product) {
			return res.status(404).json({
				error: `No se encontro el producto con el id ${id}`
			})
		}

		//Update value 
		product.availability =!product.availability;
		await product.save();
		
		res.json({data: product})
}

export const deleteProduct = async (req: Request, res: Response) => {
	console.log(signale.info(colors.bgWhite.black.bold("Iniciando desde la funcion 006 de deleteProduct en product.ts en handlres") ));
	const { id } = req.params;
	const product = await Product.findByPk(id);
	if(!product) {
		return res.status(404).json({
			error: `No se encontro el producto con el id ${id}`
		})
	}

	await product.destroy();
	res.json({data: 'Producto Eliminado'})

}

