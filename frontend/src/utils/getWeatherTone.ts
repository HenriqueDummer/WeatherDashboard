export const getWeatherTone = (temperature: number) => {
	if (temperature >= 30) {
		return "Quente";
	}

	if (temperature >= 20) {
		return "Ameno";
	}

	if (temperature >= 10) {
		return "Fresco";
	}

	return "Frio";
};
