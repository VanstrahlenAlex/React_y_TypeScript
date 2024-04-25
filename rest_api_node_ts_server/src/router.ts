import { Router } from "express";
import { body, param } from "express-validator";
import { createProduct, getProducts, getProductById, updateProduct, updateAvailability, deleteProduct } from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router();
//Routing
router.get('/', getProducts)
router.get('/:id',
	param('id').isInt().withMessage('El id debe ser un numero entero'),
	handleInputErrors,
	getProductById)


router.post('/',
		//Validation 
	body('name').notEmpty().withMessage('El Nombre del producto no puede ir vacio'),
	body('price')
				.isNumeric().withMessage('Valor no valido')
				.notEmpty().withMessage('El Precio del producto no puede ir vacio')
				.custom(value => value > 0).withMessage('El Precio no valido'),
				handleInputErrors,
	createProduct
)

router.put('/:id',
	param('id').isInt().withMessage('El id debe ser un numero entero'),
	body('name').notEmpty().withMessage('El Nombre del producto no puede ir vacio'),
	body('price')
				.isNumeric().withMessage('Valor no valido')
				.notEmpty().withMessage('El Precio del producto no puede ir vacio')
				.custom(value => value > 0).withMessage('El Precio no valido'), 
	body('availability').isBoolean().withMessage('El valor de disponibilidad debe ser un booleano'),
	handleInputErrors,
	updateProduct
)

router.patch('/:id', 
	param('id').isInt().withMessage('El id debe ser un numero entero'),
	handleInputErrors,
	updateAvailability)

router.delete('/:id', 
	param('id').isInt().withMessage('El id debe ser un numero entero'),
	handleInputErrors,
	deleteProduct
)

export default router;