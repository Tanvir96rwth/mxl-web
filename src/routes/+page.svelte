<script lang="ts">
  import LineChart from "$lib/chartjs/lineChart.svelte";
  import { euler } from "$lib/integrators/explicit";
  import Slider from "$lib/Slider.svelte";

  function arrayColumn<T>(arr: Array<Array<T>>, n: number): Array<T> {
    return arr.map((x) => x[n]);
  }

  let alpha = $state(0.1);
  let beta = $state(0.02);
  let gamma = $state(0.4);
  let delta = $state(0.02);

  let yLim = $state(100);

  function lotka_volterra(t: number, vars: number[], pars: number[]) {
    let [prey, pred] = vars;
    let [alpha, beta, gamma, delta] = pars;
    let dxdt = alpha * prey - beta * prey * pred;
    let dydt = -gamma * pred + delta * prey * pred;
    return [dxdt, dydt];
  }

  let result = $derived.by(() => {
    let tStart = Date.now();
    let res = euler(lotka_volterra, {
      initialValues: [10.0, 10.0],
      tEnd: 100,
      stepSize: 0.01,
      pars: [alpha, beta, gamma, delta],
    });
    console.log(`Javascript Integration took ${Date.now() - tStart} ms`);
    return res;
  });

  let lineData = $derived.by(() => {
    return {
      labels: result.time,
      datasets: [
        {
          label: "Prey",
          data: arrayColumn(result.values, 0),
        },
        {
          label: "Predator",
          data: arrayColumn(result.values, 1),
        },
      ],
    };
  });
</script>

<h1>Lotka-Volterra</h1>
<p>Quick and dirty demo to get ODE integration running on the client-side.</p>

<div>
  <Slider name="Alpha" bind:val={alpha} min="0.01" max="1.0" step="0.05" />
  <Slider name="Beta" bind:val={beta} min="0.01" max="1.0" step="0.05" />
  <Slider name="Gamma" bind:val={gamma} min="0.01" max="1.0" step="0.05" />
  <Slider name="Delta " bind:val={delta} min="0.01" max="1.0" step="0.001" />
</div>
<LineChart data={lineData} {yLim} />

<style>
  div {
    display: flex;
    flex-direction: row;
  }
</style>
