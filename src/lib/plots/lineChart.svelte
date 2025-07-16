<script lang="ts">
	import Chart from 'chart.js/auto';

	let canvas: HTMLCanvasElement;
	let chart: Chart;
	let { data } = $props();

	function makeChart(canvas, data) {
		const chart = new Chart(canvas, {
			type: 'line',
			data: data,
			options: {
				responsive: true,
				maintainAspectRatio: true,
				scales: {
					y: {
						beginAtZero: true,
						max: 100
					}
				}
			}
		});

		return {
			update(data) {
				chart.data = data;
				chart.update();
			},
			destroy() {
				if (chart) {
					chart.destroy();
				}
			}
		};
	}
</script>

<div class="chart-container">
	<canvas use:makeChart={data}></canvas>
</div>

<style>
	.chart-container {
		width: 800px;
		height: 400px;
		margin: 2rem 0;
		border: 1px solid #ccc;
		padding: 1rem;
	}

	canvas {
		max-width: 100%;
		max-height: 100%;
	}
</style>
