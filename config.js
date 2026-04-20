import dotenv from "dotenv";
import fs from "fs-extra";

if (fs.existsSync("config.env")) {
	dotenv.config({
		path: "./config.env"
	});
}

const config = {
	MONGODB_URI: process.env.MONGODB_URI || "", // put your mongo db url
};

export default config;