import { Router } from "express";
import { getWeather } from "../services/weather.service.js";

export const weatherRouter = Router();

weatherRouter.get("/", async (req, res) => {
	try {
		const latitude = req.query.lat as string;
		const longitude = req.query.lon as string;

		if (!latitude || !longitude) {
			return res.status(400).json({
				error: "Latitude and longitude are required",
			});
		}

		const weather = await getWeather(latitude, longitude);

		return res.json(weather);
	} catch (error) {
		console.error(error);

		return res.status(500).json({
			error: "Internal server error",
		});
	}
});
