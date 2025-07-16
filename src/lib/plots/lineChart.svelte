<script lang="ts">
	import Chart from 'chart.js/auto';

	let { data, yLim } = $props();

	function formatTicks(value: any, index: any, ticks: any) {
		const numValue = Number(value);
		if (numValue >= 1000) {
			return (numValue / 1000).toFixed(1) + 'k';
		} else if (numValue >= 100) {
			return Math.round(numValue).toString();
		} else if (numValue >= 10) {
			return numValue.toFixed(1);
		} else {
			return numValue.toFixed(2);
		}
	}

	function makeChart(canvas: HTMLCanvasElement, data: any) {
		const chart = new Chart(canvas, {
			type: 'line',
			data: data,
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					x: {
						bounds: data,
						title: {
							display: true,
							text: 'Time / unit'
						},
						ticks: {
							format: {
								style: 'percent',
								maximumFractionDigits: 2,
								maximumSignificantDigits: 2
							}
							// callback: formatTicks
						}
					},
					y: {
						beginAtZero: true,
						max: yLim,
						title: {
							display: true,
							text: 'Amount / unit'
						},
						ticks: {
							format: {
								// style: 'percent',
								maximumFractionDigits: 2,
								maximumSignificantDigits: 2
							}
						}
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
		width: 100%;
		min-height: 400px;
		height: auto;
		margin: 1rem 0;
		padding: 2rem;
		border: 1px solid #ccc;
	}

	canvas {
		max-width: 100%;
		max-height: 100%;
	}
</style>
