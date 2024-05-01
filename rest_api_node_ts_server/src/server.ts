import express from 'express';
import signale from "signale";
import colors from 'colors';
import cors, { CorsOptions} from 'cors';
import morgan from 'morgan';
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

//Enable Connections
const corsOptions : CorsOptions = {
	origin: function(origin, callback) {
		console.log(signale.info(colors.bgBlue.white(origin)));
		if(origin === process.env.FRONTEND_URL) {
			callback(null, true)
			console.log(signale.info(colors.bgBlue.white("Permitted")));
			
		} else {
			callback(new Error('CORS Error'))
			
		}
		
	}
}
server.use(cors(corsOptions));


//Leer datos de formulario 
server.use(express.json())

server.use(morgan('dev'));

server.use('/api/products', router);

//Docs 
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

export default server;