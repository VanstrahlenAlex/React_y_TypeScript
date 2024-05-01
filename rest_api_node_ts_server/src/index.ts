import server from "./server";
import colors from "colors";
import signale from "signale";

const port = process.env.PORT || 4000;
server.listen(3000, () => {
	console.log( signale.start(colors.bgCyan.white.bold( `Server start REST API is listening on port ${port}`)));
});