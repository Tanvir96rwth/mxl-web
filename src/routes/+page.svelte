<script lang="ts">
	import { integrate } from '$lib/integrators';
	import LineChart from '$lib/plots/lineChart.svelte';

	function arrayColumn<T>(arr: Array<Array<T>>, n: number): Array<T> {
		return arr.map((x) => x[n]);
	}
	// class LotkaVolterra {
	// 	alpha = $state(0.1);
	// 	beta = $state(0.02);
	// 	gamma = $state(0.4);
	// 	delta = $state(0.02);

	// 	rhs(t: number, vars: number[]) {
	// 		let [prey, pred] = vars;

	// 		let dxdt = this.alpha * prey - this.beta * prey * pred;
	// 		let dydt = -this.gamma * pred + this.delta * prey * pred;
	// 		return [dxdt, dydt];
	// 	}
	// }
	// let model = new LotkaVolterra();

	let alpha = $state(0.1);
	let beta = $state(0.02);
	let gamma = $state(0.4);
	let delta = $state(0.02);

	let test = $state(0.3);

	function lotka_volterra(t: number, vars: number[], pars: number[]) {
		let [prey, pred] = vars;
		let [alpha, beta, gamma, delta] = pars;
		let dxdt = alpha * prey - beta * prey * pred;
		let dydt = -gamma * pred + delta * prey * pred;
		return [dxdt, dydt];
	}

	let result = $derived.by(() => {
		return integrate(lotka_volterra, {
			initialValues: [10.0, 10.0],
			tEnd: 100,
			stepSize: 0.1,
			pars: [alpha, beta, gamma, delta]
		});
	});

	let lineData = $derived.by(() => {
		return {
			labels: result.time,
			datasets: [
				{
					label: 'Prey',
					data: arrayColumn(result.values, 0)
				},
				{
					label: 'Predator',
					data: arrayColumn(result.values, 1)
				}
			]
		};
	});
</script>

<h1>Welcome to SvelteKit</h1>
<LineChart data={lineData} />
<label>
	<span>Alpha</span>
	<input type="number" bind:value={alpha} min="0.01" max="1.0" step="0.1" />
</label>
<label>
	<span>Test</span>
	<input type="number" bind:value={test} min="0.01" max="1.0" step="0.1" />
</label>
