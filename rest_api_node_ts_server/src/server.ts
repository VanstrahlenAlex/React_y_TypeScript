import express from 'express';
import signale from "signale";
import colors from 'colors';
import swaggerUi from "swagger-ui-express";
import swaggerSpec, {swaggerUiOptions} from './config/swagger';
import router from './router';
import db from './config/db';

//Connecting to the database - START
export async function connectDB() {
	try {
		await db.authenticate();
		db.sync();
		console.log(signale.success((colors.bgGreen.bold.white('Connection has been established successfully with PostgresQL.'))));
	} catch (error) {
		console.error( colors.bgRed.white( 'Unable to connect to the database:'), colors.red( error));
		
	}
}
connectDB();
//Connecting to the database - END

//Instancias de express
const server = express();

//Leer datos de formulario 
server.use(express.json())

server.use('/api/products', router);

//Docs 
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

export default server;