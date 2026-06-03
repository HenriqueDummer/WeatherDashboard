export function MiniMetric({ label, value }: { label: string; value: string }) {
	return (
		<div className="rounded-2xl bg-white/5 p-4">
			<p className="text-xs uppercase tracking-[0.2em] text-slate-500">
				{label}
			</p>
			<p className="mt-2 text-lg font-bold text-slate-100">{value}</p>
		</div>
	);
}
