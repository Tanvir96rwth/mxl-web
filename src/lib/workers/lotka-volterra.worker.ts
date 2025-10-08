// keep this a module so TypeScript treats it as a worker module
export { };


import { euler } from "$lib/integrators/explicit";

function lotka_volterra(t: number, vars: number[], pars: number[]) {
    let [prey, pred] = vars;
    let [alpha, beta, gamma, delta] = pars;
    let dxdt = alpha * prey - beta * prey * pred;
    let dydt = -gamma * pred + delta * prey * pred;
    return [dxdt, dydt];
}

onmessage = (event: MessageEvent) => {

    let tStart = Date.now();
    const options = event.data;
    const outcome = euler(lotka_volterra, options);

    console.log(`Javascript Integration took ${Date.now() - tStart} ms`);
    postMessage(outcome);
}
