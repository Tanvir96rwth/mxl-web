<script lang="ts">
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let chart: Chart;
	let { data } = $props();

	onMount(() => {
		chart = new Chart(canvas, {
			type: 'bar',
			data: data,
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					y: {
						beginAtZero: true
					}
				}
			}
		});

		// Cleanup function
		return () => {
			if (chart) {
				chart.destroy();
			}
		};
	});
</script>

<div class="chart-container">
	<canvas bind:this={canvas}>My canvas</canvas>
</div>

<!-- Example data -->
<!-- const barData = {
	labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
	datasets: [
		{
			label: '# of Votes',
			data: [12, 19, 3, 5, 2, 3],
			borderWidth: 1,
			backgroundColor: [
				'rgba(255, 99, 132, 0.2)',
				'rgba(54, 162, 235, 0.2)',
				'rgba(255, 205, 86, 0.2)',
				'rgba(75, 192, 192, 0.2)',
				'rgba(153, 102, 255, 0.2)',
				'rgba(255, 159, 64, 0.2)'
			],
			borderColor: [
				'rgba(255, 99, 132, 1)',
				'rgba(54, 162, 235, 1)',
				'rgba(255, 205, 86, 1)',
				'rgba(75, 192, 192, 1)',
				'rgba(153, 102, 255, 1)',
				'rgba(255, 159, 64, 1)'
			]
		}
	]
}; -->

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
