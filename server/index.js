import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import { config } from "dotenv";
import routes from "./routes/index.js";

config();
const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

app.listen(process.env.PORT ?? 8000, () => {
	console.log(`Server running on port ${process.env.PORT}`);
});
