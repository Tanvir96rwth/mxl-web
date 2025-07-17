<script lang="ts">
	import { integrate } from '$lib/integrators';
	import LineChart from '$lib/plots/lineChart.svelte';

	function arrayColumn<T>(arr: Array<Array<T>>, n: number): Array<T> {
		return arr.map((x) => x[n]);
	}

	let mu_e = $state(0.4);
	let mu_c = $state(0.3);
	let a_e = $state(0.1);
	let a_c = $state(0.1);
	let delta_e = $state(0.1);
	let theta = $state(0.001);

	// Initial conditions
	let e0 = $state(5.0);
	let c0 = $state(5.0);

	// Simulation settings
	let tEnd = $state(100);
	let yLim = undefined;

	function model(t: number, vars: number[], pars: number[]) {
		const [e, c] = vars;
		const [mu_e, mu_c, a_e, a_c, delta_e, theta] = pars;

		// Rates
		const v0 = e * a_e * mu_e;
		const v1 = e * delta_e;
		const v2 = c * a_c * mu_c;
		const v3 = c * theta * v2;

		const dEdt = v0 - v1;
		const dCdt = v2 - v3;
		return [dEdt, dCdt];
	}

	let result = $derived.by(() => {
		return integrate(model, {
			initialValues: [e0, c0],
			tEnd: tEnd,
			stepSize: 0.1,
			pars: [mu_e, mu_c, a_e, a_c, delta_e, theta]
		});
	});

	let lineData = $derived.by(() => {
		return {
			labels: result.time,
			datasets: [
				{
					label: 'E. coli',
					data: arrayColumn(result.values, 0)
				},
				{
					label: 'C. glutamicum',
					data: arrayColumn(result.values, 1)
				}
			]
		};
	});
</script>

<h1>Population dynamics</h1>

<LineChart data={lineData} {yLim} />

<h3>Initial conditions & settings</h3>
<div class="row">
	<label>
		<span>E. coli</span>
		<input type="number" bind:value={e0} min="1.0" max="10.0" step="0.5" />
	</label>
	<label>
		<span>Coryne</span>
		<input type="number" bind:value={c0} min="1.0" max="10.0" step="0.5" />
	</label>
	<label>
		<span>Simulate until</span>
		<input type="number" bind:value={tEnd} min="10.0" max="10000.0" step="10" />
	</label>
</div>

<h3>Parameters</h3>
<div class="row">
	<label>
		<span>mu_e</span>
		<input type="number" bind:value={mu_e} min="0.01" max="1.0" step="0.05" />
	</label>
	<label>
		<span>mu_c</span>
		<input type="number" bind:value={mu_c} min="0.01" max="1.0" step="0.05" />
	</label>
	<label>
		<span>a_e</span>
		<input type="number" bind:value={a_e} min="0.01" max="1.0" step="0.05" />
	</label>
	<label>
		<span>a_c</span>
		<input type="number" bind:value={a_c} min="0.01" max="1.0" step="0.05" />
	</label>
	<label>
		<span>delta_e</span>
		<input type="number" bind:value={delta_e} min="0.01" max="1.0" step="0.05" />
	</label>
	<label>
		<span>theta</span>
		<input type="number" bind:value={theta} min="0.01" max="1.0" step="0.05" />
	</label>
</div>

<style>
	.row {
		display: flex;
		flex-direction: row;
	}
</style>
