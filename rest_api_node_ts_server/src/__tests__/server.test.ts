import colors from "colors";
import signale from "signale";
import request from "supertest";
import server from "../server";

describe("GT /api", () => {
	it("should send back a JSON response", async() => {
		const res = await request(server).get('/api')

		expect(res.status).toBe(200);
		expect(res.headers['Content-Type']).toBe('/json')	
		
		console.log(signale.debug(res.status))
		
	})
})