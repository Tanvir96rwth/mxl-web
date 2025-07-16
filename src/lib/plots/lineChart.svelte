<script lang="ts">
	import Chart from 'chart.js/auto';

	let { data } = $props();

	function makeChart(canvas: HTMLCanvasElement, data: any) {
		const chart = new Chart(canvas, {
			type: 'line',
			data: data,
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					y: {
						beginAtZero: true,
						max: 100
					}
				},
				elements: {
					point: { radius: 0 }
				}
			}
		});

		return {
			update(data: any) {
				chart.data = data;
				chart.update('resize');
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
