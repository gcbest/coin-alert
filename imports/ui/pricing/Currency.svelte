<script>
  import { getCurrentPrice } from '../../utils';
  export let symbol;
  const THIRTY_SECONDS = 30_000;

  let promise = getCurrentPrice(symbol);

  setInterval(async () => {
    const promise2 = await getCurrentPrice(symbol);
    promise = promise2;
  }, THIRTY_SECONDS);
</script>

<style>
  h3 {
    text-align: center;
  }
</style>

<h3>
  {#await promise}
    Getting current price...
  {:then response}
    <!-- {#if data && data['Realtime Currency Exchange Rate']} -->
    {#if response.data && response.data.amount}
      <!-- {symbol}: ${parseFloat(data['Realtime Currency Exchange Rate']['5. Exchange Rate']).toFixed(2)} -->
      {symbol}: ${parseFloat(response.data.amount).toFixed(2)}
    {:else}{symbol}: Price Not Found{/if}
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</h3>
