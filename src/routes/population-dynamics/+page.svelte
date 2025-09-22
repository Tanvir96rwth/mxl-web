<script lang="ts">
  import LineChart from "$lib/chartjs/lineChart.svelte";
  import { euler } from "$lib/integrators/explicit/euler";

  function arrayColumn<T>(arr: Array<Array<T>>, n: number): Array<T> {
    return arr.map((x) => x[n]);
  }

  // == Parameters ====
  let r_p = $state(0.4); // intrinsic growth (Public, P)
  let r_m = $state(0.2); // intrinsic growth (Private, M)
  let alpha = $state(0.0002); // cooperation: P→C
  let beta = $state(0.0001); // competition: P↔M
  let eta = $state(0.0001); // density constraint for P
  let gamma = $state(0.0001); // density constraint for M
  let nu = $state(0.00001); // density constraint for C

  // = Initial conditions =
  let p0 = $state(1.0); // Public metabolizers (P)
  let c0 = $state(1.0); // Cheaters (C)
  let m0 = $state(1.0); // Private metabolizers (M)

  // == Simulation settings ===
  let tEnd = $state(100);
  let yLim = undefined;

  // Eq.
  // dP/dt = r_p·P − α·P·C − β·P·M − η·P^2
  // dC/dt = α·P·C − ν·C^2
  // dM/dt = r_m·M − β·M·P − γ·M^2
  function model(t: number, vars: number[], pars: number[]) {
    const [P, C, M] = vars;
    const [r_p, r_m, alpha, beta, eta, gamma, nu] = pars;

    const dPdt = r_p * P - alpha * P * C - beta * P * M - eta * P * P;
    const dCdt = alpha * P * C - nu * C * C;
    const dMdt = r_m * M - beta * M * P - gamma * M * M;

    return [dPdt, dCdt, dMdt];
  }

  let result = $derived.by(() => {
    // return rk45(model, {
    // 	initialValues: [e0, c0],
    // 	tEnd: tEnd,
    // 	pars: [mu_e, mu_c, a_e, a_c, delta_e, theta]
    // });
    return euler(model, {
      initialValues: [p0, c0, m0],
      tEnd: tEnd,
      stepSize: 0.01,
      pars: [r_p, r_m, alpha, beta, eta, gamma, nu],
    });
  });

  let lineData = $derived.by(() => {
    return {
      labels: result.time,
      datasets: [
        {
          label: "E. coli",
          data: arrayColumn(result.values, 0),
        },
        {
          label: "C. glutamicum",
          data: arrayColumn(result.values, 1),
        },
      ],
    };
  });
</script>

<h1>Population dynamics</h1>

<LineChart data={lineData} {yLim} />

<h3>Initial conditions & settings</h3>
<div class="row">
  <label>
    <span>P(0) — Public</span>
    <input type="number" bind:value={p0} min="0.0" max="10000.0" step="1" />
  </label>
  <label>
    <span>C(0) — Cheaters</span>
    <input type="number" bind:value={c0} min="0.0" max="10000.0" step="1" />
  </label>
  <label>
    <span>M(0) — Private</span>
    <input type="number" bind:value={m0} min="0.0" max="10000.0" step="1" />
  </label>
  <label>
    <span>Simulate until</span>
    <input type="number" bind:value={tEnd} min="1.0" max="10000.0" step="10" />
  </label>
</div>

<h3>Public (P) parameters</h3>
<div class="row">
  <label>
    <span>r_p (growth rate)</span>
    <input type="number" bind:value={r_p} min="0.0" max="1.0" step="0.00001" />
  </label>
  <label>
    <span>η (density constraint)</span>
    <input type="number" bind:value={eta} min="0.0" max="1.0" step="0.00001" />
  </label>
</div>

<h3>Cheaters (C) parameters</h3>
<div class="row">
  <label>
    <span>ν (density constraint)</span>
    <input type="number" bind:value={nu} min="0.0" max="1.0" step="0.00001" />
  </label>
</div>

<h3>Private (M) parameters</h3>
<div class="row">
  <label>
    <span>r_m (growth rate)</span>
    <input type="number" bind:value={r_m} min="0.0" max="5.0" step="0.0001" />
  </label>
  <label>
    <span>γ (density constraint)</span>
    <input type="number" bind:value={gamma} min="0.0" max="5.0" step="0.0001" />
  </label>
</div>

<h3>Interaction parameters</h3>
<div class="row">
  <label>
    <span>α (P→C cooperation)</span>
    <input type="number" bind:value={alpha} min="0.0" max="1.0" step="0.0001" />
  </label>
  <label>
    <span>β (P↔M competition)</span>
    <input type="number" bind:value={beta} min="0.0" max="1.0" step="0.0001" />
  </label>
</div>

<style>
  .row {
    display: flex;
    flex-direction: row;
  }
</style>
