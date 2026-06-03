import { useEffect, useState } from "react";
import { LocalWeatherCard } from "../components/LocalWeatherCard";
import {
	type CityWeatherData,
	WorldCitiesCarousel,
} from "../components/WorldCitiesCarousel";
import { useWeatherSocket } from "../hooks/useWeatherSocket";

const WEATHER_API_URL =
	import.meta.env.VITE_WEATHER_API_URL ?? "http://localhost:3001";

export default function MainPage() {
	const { weather, error, isLoading } = useWeatherSocket();
	const [cities, setCities] = useState<CityWeatherData[]>([]);
	const [cityError, setCityError] = useState<string | null>(null);
	const [isCitiesLoading, setIsCitiesLoading] = useState(true);
	const [activeCityIndex, setActiveCityIndex] = useState(0);

	useEffect(() => {
		const loadCities = async () => {
			try {
				const response = await fetch(`${WEATHER_API_URL}/weather/main-cities`);

				if (!response.ok) {
					throw new Error("Nao foi possivel carregar o clima das cidades");
				}

				const data: CityWeatherData[] = await response.json();

				setCities(data);
				setCityError(null);
			} catch (loadError) {
				setCityError(
					loadError instanceof Error
						? loadError.message
						: "Nao foi possivel carregar o clima das cidades",
				);
			} finally {
				setIsCitiesLoading(false);
			}
		};

		loadCities();
		const interval = window.setInterval(loadCities, 60_000);

		return () => {
			window.clearInterval(interval);
		};
	}, []);

	useEffect(() => {
		if (cities.length <= 1) {
			return;
		}

		const interval = window.setInterval(() => {
			setActiveCityIndex((currentIndex) => (currentIndex + 1) % cities.length);
		}, 4_500);

		return () => window.clearInterval(interval);
	}, [cities.length]);

	const nextCityName = () => {
		if (cities.length === 0) {
			return "";
		}

		return cities[(activeCityIndex + 1) % cities.length].city;
	};

	const goToPreviousCity = () => {
		setActiveCityIndex((currentIndex) =>
			currentIndex === 0 ? cities.length - 1 : currentIndex - 1,
		);
	};

	const goToNextCity = () => {
		setActiveCityIndex((currentIndex) => (currentIndex + 1) % cities.length);
	};

	return (
		<main className="min-h-screen overflow-hidden bg-slate-950 px-5 py-8 text-white sm:px-8 lg:px-12">
			<div className="mx-auto flex max-w-7xl flex-col gap-8">
				<header className="flex flex-col gap-4">
					<div>
						<p className="mb-3 inline-flex rounded-full border border-sky-300/30 bg-sky-300/10 px-4 py-1 text-sm font-medium text-sky-100">
							Clima ao vivo
						</p>
						<h1 className="text-4xl font-black tracking-tight sm:text-6xl">
							Painel do Tempo
						</h1>
						<p className="mt-3  text-base text-slate-300 sm:text-lg">
							Acompanhe o clima atual da sua localizacao e veja as principais
							cidades do mundo.
						</p>
					</div>
				</header>

				<section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
					<LocalWeatherCard
						weather={weather}
						error={error}
						isLoading={isLoading}
					/>
					<WorldCitiesCarousel
						cities={cities}
						activeCityIndex={activeCityIndex}
						isCitiesLoading={isCitiesLoading}
						cityError={cityError}
						nextCityName={nextCityName()}
						onPrevious={goToPreviousCity}
						onNext={goToNextCity}
						onSelectCity={setActiveCityIndex}
					/>
				</section>
			</div>
		</main>
	);
}
