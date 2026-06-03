export function WeatherMetric({
	label,
	value,
}: {
	label: string;
	value: string;
}) {
	return (
		<div className="rounded-3xl border border-white/15 bg-white/15 p-5 backdrop-blur">
			<p className="text-sm text-sky-100">{label}</p>
			<p className="mt-2 text-xl font-bold">{value}</p>
		</div>
	);
}
