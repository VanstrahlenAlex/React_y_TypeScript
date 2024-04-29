import request from "supertest";
import server from "../../server";

//Colors and Signale
import colors from 'colors';
import signale from "signale";


describe('/POST /api/products', () => {

	it('should display validation error', async() => {
		const response = await request(server).post('/api/products').send({})
		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty('errors')
		expect(response.body.errors).toHaveLength(4);

		expect(response.status).not.toBe(404);
		expect(response.body.errors).not.toHaveLength(2);


	})

	it('should validate that the price is greater than 0', async() => {
		const response = await request(server).post('/api/products').send({
			name: "Monitor Curvo",
			price: 0
		})
		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty('errors')
		expect(response.body.errors).toHaveLength(1);

		expect(response.status).not.toBe(404);
		expect(response.body.errors).not.toHaveLength(2);


	})

	it('should validate that the price is a number and greater than 0', async() => {
		const response = await request(server).post('/api/products').send({
			name: "Monitor Curvo",
			price: 0
		})
		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty('errors')
		expect(response.body.errors).toHaveLength(1);

		expect(response.status).not.toBe(404);
		expect(response.body.errors).not.toHaveLength(4);


	})

	it('should create a new product', async() => {
		const response = await request(server).post('/api/products').send({
			name : "Mouse - Testing",
			price : 50
			})
		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty('data')

		expect(response.status).not.toBe(404);
		expect(response.status).not.toBe(200);
		expect(response.body).not.toHaveProperty('errors')
	})
})


describe('GET /api/products', () => {
	it('Should check if api/products url exists', async() =>{
		const response = await request(server).get('/api/products')
		expect(response.status).not.toBe(404);
		console.log(signale.success(colors.bgMagenta.white.bold("Test 'Should check if api/products url exists' /api/products: PASSED")));
	});
	it('GET a JSON response with products', async() => {
			const response = await request(server).get('/api/products')
			expect(response.status).toBe(200);
			expect(response.headers['content-type']).toMatch(/json/)
			expect(response.body).toHaveProperty('data')
			expect(response.body.data).toHaveLength(1)
			expect(response.body).not.toHaveProperty('errors')
			console.log(signale.success(colors.bgMagenta.white.bold("Test GET /api/products: PASSED")));

	});

})


describe('GET /api/products/:id', () => {
	it('Should return a 404 response for a non-existent product', async() => {
		const productId = 2000;
		const response = await request(server).get(`/api/products/${productId}`)
		expect(response.status).toBe(404);
		expect(response.body).toHaveProperty('error');
		expect(response.body.error).toBe('No se encontro el producto con el id 2000');
		console.log(signale.success(colors.bgMagenta.white.bold("Test --Should return a 404 response for a non-existent product-- /api/products: PASSED")));
	});

	it('Should check a valid ID in the URL', async() => {
		const productId = 'abc';
		const response = await request(server).get(`/api/products/${productId}`)
		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty('errors');
		expect(response.body.errors).toHaveLength(1);
		expect(response.body.errors[0].msg).toBe('El id debe ser un numero entero');
		console.log(signale.success(colors.bgMagenta.white.bold("Test --Should check a valid ID in the URL-- /api/products/:{id}: PASSED")));
	});

	it('Get a JSON response for a single Product', async() => {

		const response = await request(server).get(`/api/products/1`)
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('data');
		console.log(signale.success(colors.bgMagenta.white.bold("Test --Get a JSON response for a single Product-- /api/products: PASSED")));
	});
})


describe('PUT /api/products/:id', () => {

	it('Should check a valid ID in the URL', async() => {
		const productId = 'abc';
		const response = await request(server).put(`/api/products/${productId}`)
											.send({
												name: "Monitor Curvo",
												availability : true,
												price: 300
											})
		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty('errors');
		expect(response.body.errors).toHaveLength(1);
		expect(response.body.errors[0].msg).toBe('El id debe ser un numero entero');
		console.log(signale.success(colors.bgMagenta.white.bold("Test 'PUT' 001 --Should check a valid ID in the URL-- /api/products/:{id}: PASSED")));
	});
	it('should display validation error message when updating a product', async() => {
		const productId = 2;
		const response = await request(server).put(`/api/products/${productId}`).send({})
		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty('errors');
		expect(response.body.errors).toBeTruthy();
		expect(response.body.errors).toHaveLength(5);

		expect(response.status).not.toBe(200);
		expect(response.body).not.toHaveProperty('data');
		console.log(signale.success(colors.bgMagenta.white.bold("Test 'PUT' 002 --should display validation error message when updating a product-- /api/products/:id : PASSED")));
	}) 

	it('should validate that the price is greater than 0', async() => {
		const productId = 2;
		const response = await request(server).put(`/api/products/${productId}`).send({
			name: "Monitor Curvo",
			availability : true,
			price: -300
		})
		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty('errors');
		expect(response.body.errors).toBeTruthy();
		expect(response.body.errors).toHaveLength(1);
		expect(response.body.errors[0].msg).toBe('El Precio no es valido');

		expect(response.status).not.toBe(200);
		expect(response.body).not.toHaveProperty('data');
		console.log(signale.success(colors.bgMagenta.white.bold("Test 'PUT' 003 --should validate that the price is greater than 0-- /api/products/:id : PASSED")));
	})

	it('should return a 404 response for a non-existent product', async() => {
		const productId = 20000;
		const response = await request(server).put(`/api/products/${productId}`).send({
			name: "Monitor Curvo",
			availability : true,
			price: 300
		})
		expect(response.status).toBe(404);
		expect(response.body.error).toBe('No se encontro el producto con el id 20000');
	
		expect(response.status).not.toBe(200);
		expect(response.body).not.toHaveProperty('data');

		//logs
		console.log(signale.success(colors.bgMagenta.white.bold("Test 'PUT' 004 --should validate that the price is greater than 0-- /api/products/:id : PASSED")));
	})

	it('should update an existing product with valid data', async() => {
		const productId = 1;
		const response = await request(server).put(`/api/products/${productId}`).send({
			name: "Monitor Curvo",
			availability : true,
			price: 300
		})
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('data');
	
		// NOT
		expect(response.status).not.toBe(400);
		expect(response.body).not.toHaveProperty('errors');

		//logs
		console.log(signale.success(colors.bgMagenta.white.bold("Test 'PUT' 005 --should update an existing product with valid data-- /api/products/:id : PASSED")));
	})
})

describe('PATCH /api/products/:id', () => {
	it('Should return a 404 response for a non-existing product', async() =>{
		const productId = 20000;
		const response = await request(server).patch(`/api/products/${productId}`)
		expect(response.status).toBe(404);
		expect(response.body.error).toBe('No se encontro el producto con el id 20000');
		//NOT
		expect(response.status).not.toBe(200);
		expect(response.body).not.toHaveProperty('data');
	})

	it('Should update the product availability', async() => {
		const response = await request(server).patch('/api/products/2')
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('data')
		expect(response.body.data.availability).toBe(false)
		//NOT
		expect(response.status).not.toBe(400);
		expect(response.status).not.toBe(404);
		expect(response.body).not.toHaveProperty('error')

	})
})

describe('DELETE /api/products/:id', () => {
	it('Should check a valid ID', async() => {
		const response = await request(server).delete('/api/products/not-valid-id')
		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty('errors');
		expect(response.body.errors[0].msg).toBe('El id debe ser un numero entero');
		console.log(signale.success(colors.bgMagenta.white.bold("Test 'DELETE' 001 --Should check a valid ID-- /api/products: PASSED")));
	})

	it('Should return a 404 response for a non-existent product', async() => {
		const productId = 20000;
		const response = await request(server).delete(`/api/products/${productId}`)
		expect(response.status).toBe(404);
		expect(response.body.error).toBe('No se encontro el producto con el id 20000');

		//NOT
		expect(response.status).not.toBe(200);
		console.log(signale.success(colors.bgMagenta.white.bold("Test 'DELETE' 002 --Should return a 404 response for a non-existent product-- /api/products: PASSED")));
	})

	it('should delete a product', async() => {
		const productId = 1;
		const response = await request(server).delete(`/api/products/${productId}`)
		expect(response.status).toBe(200);
		expect(response.body.message).toBe('Producto eliminado');
		expect(response.status).not.toBe(404);
		expect(response.status).not.toBe(400);
		console.log(signale.success(colors.bgMagenta.white.bold("Test 'DELETE' 003 --Should delete a product-- /api/products: PASSED")));
	})

})