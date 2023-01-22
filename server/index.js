import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { config } from "dotenv";
import routes from "./routes/index.js";

const origin = {
	// origin: ["http://localhost:3000", "http://localhost:3001"]};
	origin: "*",
};
config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(origin));
app.use(helmet());
app.use(morgan("dev"));
app.use("/api", routes);

app.listen(process.env.PORT ?? 8000, () => {
	console.log(`Server running on port ${process.env.PORT}`);
});
