import type { CityWeatherData } from "./CityWeatherCard";
import { CityWeatherCard } from "./CityWeatherCard";

export interface CitySearchResult {
	id: number;
	name: string;
	country: string;
	admin1?: string;
	latitude: number;
	longitude: number;
	timezone?: string;
	population?: number;
}

interface CitySearchProps {
	query: string;
	suggestions: CitySearchResult[];
	selectedCityWeather: CityWeatherData | null;
	isSearching: boolean;
	isCityWeatherLoading: boolean;
	searchError: string | null;
	selectedCityError: string | null;
	onQueryChange: (query: string) => void;
	onSelectCity: (city: CitySearchResult) => void;
}

export function CitySearch({
	query,
	suggestions,
	selectedCityWeather,
	isSearching,
	isCityWeatherLoading,
	searchError,
	selectedCityError,
	onQueryChange,
	onSelectCity,
}: CitySearchProps) {
	const shouldShowEmptyState =
		query.trim().length >= 2 &&
		!isSearching &&
		!searchError &&
		suggestions.length === 0;

	return (
		<section className="rounded-4xl border border-white/10 bg-white/[0.07] p-6 shadow-2xl backdrop-blur">
			<div className="flex flex-col gap-2">
				<p className="text-sm uppercase tracking-[0.3em] text-slate-400">
					Buscar
				</p>
				<h2 className="text-2xl font-bold">Detalhes por cidade</h2>
				<p className="text-sm text-slate-400">
					Pesquise uma cidade e selecione uma sugestao para ver o clima atual.
				</p>
			</div>

			<label className="relative mt-6 block">
				<span className="sr-only">Buscar cidade</span>
				<svg
					className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					aria-hidden="true"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
					/>
				</svg>
				<input
					className="w-full rounded-2xl border border-white/10 bg-slate-950/70 py-4 pl-12 pr-4 text-white outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-300/15"
					type="search"
					value={query}
					placeholder="Digite uma cidade"
					onChange={(event) => onQueryChange(event.target.value)}
				/>
			</label>

			<div className="mt-4 min-h-12">
				{query.trim().length === 1 && (
					<p className="rounded-2xl bg-white/5 p-4 text-sm text-slate-400">
						Digite pelo menos 2 caracteres para pesquisar.
					</p>
				)}

				{isSearching && (
					<p className="rounded-2xl bg-white/5 p-4 text-sm text-slate-300">
						Buscando cidades...
					</p>
				)}

				{searchError && !isSearching && (
					<p className="rounded-2xl border border-rose-300/30 bg-rose-500/10 p-4 text-sm text-rose-100">
						{searchError}
					</p>
				)}

				{shouldShowEmptyState && (
					<p className="rounded-2xl bg-white/5 p-4 text-sm text-slate-400">
						Nenhuma cidade encontrada.
					</p>
				)}

				{suggestions.length > 0 && !isSearching && (
					<div className="grid gap-2">
						{suggestions.map((city) => (
							<button
								className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-left transition hover:border-sky-300 hover:bg-white/10"
								key={city.id}
								type="button"
								onClick={() => onSelectCity(city)}
							>
								<span>
									<span className="block font-semibold text-slate-100">
										{city.name}
									</span>
									<span className="block text-sm text-slate-400">
										{[city.admin1, city.country].filter(Boolean).join(", ")}
									</span>
								</span>
								<span className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">
									Ver
								</span>
							</button>
						))}
					</div>
				)}
			</div>

			<div className="mt-6">
				{isCityWeatherLoading && (
					<div className="rounded-[1.5rem] bg-slate-900/80 p-6 text-slate-300 ring-1 ring-white/10">
						Carregando detalhes da cidade...
					</div>
				)}

				{selectedCityError && !isCityWeatherLoading && (
					<div className="rounded-[1.5rem] border border-rose-300/30 bg-rose-500/10 p-6 text-rose-100">
						{selectedCityError}
					</div>
				)}

				{selectedCityWeather && !isCityWeatherLoading && (
					<CityWeatherCard cityWeather={selectedCityWeather} showDetails />
				)}

				{!selectedCityWeather && !isCityWeatherLoading && !selectedCityError && (
					<div className="rounded-[1.5rem] bg-slate-900/70 p-6 text-sm text-slate-400 ring-1 ring-white/10">
						Selecione uma cidade para ver temperatura, sensacao termica,
						precipitacao, nuvens e coordenadas.
					</div>
				)}
			</div>
		</section>
	);
}
