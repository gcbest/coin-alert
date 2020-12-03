<script>
  import { getCurrentPrice } from '../../utils';
  export let symbol;
  const SIXTY_SECONDS = 60_000;

  let promise = getCurrentPrice(symbol);

  setInterval(async () => {
    const promise2 = await getCurrentPrice(symbol);
    promise = promise2;
  }, SIXTY_SECONDS);
</script>

<style>
  h3 {
    text-align: center;
  }
</style>

<h3>
  {#await promise}
    Getting current price...
  {:then data}
    {#if data && data['Realtime Currency Exchange Rate']}
      {symbol}: ${parseFloat(data['Realtime Currency Exchange Rate']['5. Exchange Rate']).toFixed(2)}
    {:else}{symbol}: Price Not Found{/if}
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</h3>
