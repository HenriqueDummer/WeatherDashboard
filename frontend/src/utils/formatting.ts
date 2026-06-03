export const formatNumber = (value: number, digits = 0) =>
	new Intl.NumberFormat("pt-BR", {
		maximumFractionDigits: digits,
		minimumFractionDigits: digits,
	}).format(value);

export const formatTime = (time?: string) => {
	if (!time) {
		return "Aguardando atualizacao";
	}

	return new Intl.DateTimeFormat("pt-BR", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(new Date(time));
};