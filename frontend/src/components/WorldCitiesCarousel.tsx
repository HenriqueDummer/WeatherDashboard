import { CityWeatherCard, type CityWeatherData } from "./CityWeatherCard";

interface WorldCitiesCarouselProps {
	cities: CityWeatherData[];
	activeCityIndex: number;
	isCitiesLoading: boolean;
	cityError: string | null;
	nextCityName: string;
	onPrevious: () => void;
	onNext: () => void;
	onSelectCity: (index: number) => void;
}

export function WorldCitiesCarousel({
	cities,
	activeCityIndex,
	isCitiesLoading,
	cityError,
	nextCityName,
	onPrevious,
	onNext,
	onSelectCity,
}: WorldCitiesCarouselProps) {
	const activeCity = cities[activeCityIndex];

	return (
		<aside className="rounded-4xl border border-white/10 bg-white/[0.07] p-6 shadow-2xl backdrop-blur">
			<div className="flex items-center justify-between gap-4">
				<div>
					<p className="text-sm uppercase tracking-[0.3em] text-slate-400">
						Mundo
					</p>
					<h2 className="mt-2 text-2xl font-bold">Grandes cidades</h2>
				</div>
				{cities.length > 0 && (
					<p className="rounded-full bg-white/10 px-3 py-1 text-sm text-slate-300">
						{activeCityIndex + 1}/{cities.length}
					</p>
				)}
			</div>

			{isCitiesLoading && (
				<div className="mt-8 rounded-3xl bg-white/10 p-6 text-slate-200">
					Carregando clima das cidades...
				</div>
			)}

			{cityError && !isCitiesLoading && (
				<div className="mt-8 rounded-3xl border border-rose-300/30 bg-rose-500/10 p-6 text-rose-100">
					{cityError}
				</div>
			)}

			{activeCity && (
				<div className="mt-8">
					<CityWeatherCard cityWeather={activeCity} />

					<div className="mt-6 flex items-center justify-between gap-4">
						<button
							className="rounded-full border border-white/10 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/20"
							type="button"
							onClick={onPrevious}
						>
							Anterior
						</button>
						<p className="hidden text-sm text-slate-400 sm:block">
							Proxima: {nextCityName}
						</p>
						<button
							className="rounded-full bg-sky-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-sky-200"
							type="button"
							onClick={onNext}
						>
							Proxima
						</button>
					</div>

					<div className="mt-6 flex gap-2 overflow-x-auto pb-2">
						{cities.map((cityWeather, index) => (
							<button
								className={`h-2.5 rounded-full transition-all ${
									index === activeCityIndex
										? "w-10 bg-sky-300"
										: "w-2.5 bg-white/25 hover:bg-white/50"
								}`}
								key={`${cityWeather.city}-${cityWeather.country}`}
								type="button"
								aria-label={`Mostrar ${cityWeather.city}`}
								onClick={() => onSelectCity(index)}
							/>
						))}
					</div>
				</div>
			)}
		</aside>
	);
}

export type { CityWeatherData };
