import type { WeatherData } from "../hooks/useWeatherSocket";
import { formatNumber, formatTime } from "../utils/formatting";
import { getWeatherTone } from "../utils/getWeatherTone";
import { MiniMetric } from "./MiniMetric";

interface CityWeatherData extends WeatherData {
	city: string;
	country: string;
	latitude: number;
	longitude: number;
}

interface CityWeatherCardProps {
	cityWeather: CityWeatherData;
}

export function CityWeatherCard({ cityWeather }: CityWeatherCardProps) {
	return (
		<div className="rounded-[1.5rem] bg-slate-900/80 p-6 ring-1 ring-white/10">
			<div className="flex items-start justify-between gap-4">
				<div>
					<p className="text-sm text-slate-400">{cityWeather.country}</p>
					<h3 className="mt-1 text-3xl font-black">{cityWeather.city}</h3>
				</div>
				<span className="rounded-full bg-amber-300/15 px-3 py-1 text-sm font-semibold text-amber-100">
					{getWeatherTone(cityWeather.temperature)}
				</span>
			</div>

			<div className="mt-8 flex items-end gap-3">
				<p className="text-6xl font-black tracking-tighter">
					{formatNumber(cityWeather.temperature)}
				</p>
				<p className="pb-3 text-2xl font-bold text-slate-300">&deg;C</p>
			</div>

			<div className="mt-8 grid grid-cols-2 gap-3">
				<MiniMetric
					label="Umidade"
					value={`${formatNumber(cityWeather.humidity)}%`}
				/>
				<MiniMetric
					label="Vento"
					value={`${formatNumber(cityWeather.windSpeed, 1)} km/h`}
				/>
			</div>

			<p className="mt-6 text-sm text-slate-400">
				Atualizado em {formatTime(cityWeather.time)}
			</p>
		</div>
	);
}

export type { CityWeatherData };
