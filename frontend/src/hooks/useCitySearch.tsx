import { useEffect, useState } from "react";
import type { CitySearchResult } from "../components/CitySearch";

export function useCitySearch(weatherApiUrl: string) {
	const [query, setQuery] = useState("");
	const [suggestions, setSuggestions] = useState<CitySearchResult[]>([]);
	const [searchError, setSearchError] = useState<string | null>(null);
	const [isSearching, setIsSearching] = useState(false);

	useEffect(() => {
		const trimmedQuery = query.trim();

		if (trimmedQuery.length < 2) {
			setSuggestions([]);
			setSearchError(null);
			setIsSearching(false);

			return;
		}

		const controller = new AbortController();
		const timeout = window.setTimeout(async () => {
			try {
				setIsSearching(true);

				const params = new URLSearchParams({
					city: trimmedQuery,
				});
				const response = await fetch(
					`${weatherApiUrl}/weather/search?${params.toString()}`,
					{ signal: controller.signal },
				);

				if (!response.ok) {
					throw new Error("Nao foi possivel buscar cidades");
				}

				const data: CitySearchResult[] = await response.json();

				setSuggestions(data);
				setSearchError(null);
			} catch (loadError) {
				if (loadError instanceof DOMException && loadError.name === "AbortError") {
					return;
				}

				setSuggestions([]);
				setSearchError(
					loadError instanceof Error
						? loadError.message
						: "Nao foi possivel buscar cidades",
				);
			} finally {
				if (!controller.signal.aborted) {
					setIsSearching(false);
				}
			}
		}, 300);

		return () => {
			window.clearTimeout(timeout);
			controller.abort();
		};
	}, [query, weatherApiUrl]);

	const clearSuggestions = () => {
		setSuggestions([]);
	};

	return {
		query,
		setQuery,
		suggestions,
		clearSuggestions,
		searchError,
		isSearching,
	};
}
