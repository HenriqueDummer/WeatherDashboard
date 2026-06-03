import type { WeatherData } from "../hooks/useWeatherSocket";
import { formatNumber, formatTime } from "../utils/formatting";
import { getWeatherTone } from "../utils/getWeatherTone";
import { WeatherMetric } from "./WeatherMetric";

interface LocalWeatherCardProps {
	weather: WeatherData | null;
	error: string | null;
	isLoading: boolean;
}

export function LocalWeatherCard({
	weather,
	error,
	isLoading,
}: LocalWeatherCardProps) {
	return (
		<article className="relative overflow-hidden rounded-4xl border border-white/10 bg-linear-to-br from-sky-500 via-blue-600 to-indigo-800 p-7 shadow-2xl sm:p-10">
			<div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/20 blur-3xl" />
			<div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-cyan-200/20 blur-3xl" />
			<div className="relative">
				<div className="flex flex-wrap items-start justify-between gap-4">
					<div>
						<p className="text-sm uppercase tracking-[0.35em] text-sky-100">
							Sua localizacao
						</p>
						<h2 className="mt-3 text-3xl font-bold sm:text-4xl">Agora</h2>
					</div>
					<div className="flex flex-col items-end gap-3">
						{weather && (
							<span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur">
								{getWeatherTone(weather.temperature)}
							</span>
						)}
						<div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-slate-100 backdrop-blur">
							Atualizado em {weather ? formatTime(weather.time) : "conectando"}
						</div>
					</div>
				</div>

				{isLoading && (
					<div className="mt-12 rounded-3xl bg-white/15 p-6 backdrop-blur">
						<p className="text-xl font-semibold">
							Solicitando sua localizacao...
						</p>
						<p className="mt-2 text-sky-100">
							Permita o acesso para mostrar o clima da sua regiao em tempo real.
						</p>
					</div>
				)}

				{error && !isLoading && (
					<div className="mt-12 rounded-3xl border border-rose-200/40 bg-rose-500/20 p-6 backdrop-blur">
						<p className="text-xl font-semibold">
							Atualizacao da sua localizacao pausada
						</p>
						<p className="mt-2 text-rose-50">{error}</p>
					</div>
				)}

				{weather && (
					<div className="mt-10">
						<div className="flex items-end gap-4">
							<p className="text-7xl font-black tracking-tighter sm:text-8xl">
								{formatNumber(weather.temperature)}
							</p>
							<p className="pb-4 text-3xl font-bold text-sky-100">&deg;C</p>
						</div>
						<div className="mt-8 grid gap-4 sm:grid-cols-3">
							<WeatherMetric
								label="Umidade"
								value={`${formatNumber(weather.humidity)}%`}
							/>
							<WeatherMetric
								label="Vento"
								value={`${formatNumber(weather.windSpeed, 1)} km/h`}
							/>
							<WeatherMetric
								label="Ultima leitura"
								value={formatTime(weather.time)}
							/>
						</div>
					</div>
				)}
			</div>
		</article>
	);
}
