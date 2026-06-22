import { Router } from "express";
import {
	getCityWeather,
	getMainWorldCitiesWeather,
	getWeather,
	searchCities,
} from "../services/weather.service.js";

export const weatherRouter = Router();

weatherRouter.get("/main-cities", async (_req, res) => {
	try {
		const weather = await getMainWorldCitiesWeather();

		return res.json(weather);
	} catch (error) {
		console.error(error);

		return res.status(500).json({
			error: "Internal server error",
		});
	}
});

weatherRouter.get("/search", async (req, res) => {
	try {
		const city = req.query.city as string;

		if (!city || city.trim().length < 2) {
			return res.json([]);
		}

		const results = await searchCities(city.trim());

		return res.json(results);
	} catch (error) {
		console.error(error);

		return res.status(500).json({
			error: "Internal server error",
		});
	}
});

weatherRouter.get("/city", async (req, res) => {
	try {
		const latitude = req.query.lat as string;
		const longitude = req.query.lon as string;
		const city = req.query.city as string;
		const country = req.query.country as string;

		if (!latitude || !longitude || !city || !country) {
			return res.status(400).json({
				error: "Latitude, longitude, city and country are required",
			});
		}

		const weather = await getCityWeather(latitude, longitude, city, country);

		return res.json(weather);
	} catch (error) {
		console.error(error);

		return res.status(500).json({
			error: "Internal server error",
		});
	}
});

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
