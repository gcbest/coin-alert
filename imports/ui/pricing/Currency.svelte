<script>
  import { getCurrentPrice } from '../../utils';
  import { btcPrice } from '../../utils/stores';

  export let symbol;
  const THIRTY_SECONDS = 30_000;
  // would've been cleaner w/o using await syntax in template,
  // but I wanted to work with it
  let promise;
  (async function getInitialPrice() {
    promise = await getCurrentPrice(symbol);
    if (promise && promise.data && promise.data.amount) {
      $btcPrice = parseFloat(promise.data.amount).toFixed(2);
    }
  })();

  setInterval(async () => {
    // promise swapping
    const promise2 = await getCurrentPrice(symbol);
    if (promise2 && promise2.data && promise2.data.amount) {
      $btcPrice = parseFloat(promise.data.amount).toFixed(2);
    }
    promise = promise2;
  }, THIRTY_SECONDS);
</script>

<style>
  h3 {
    text-align: center;
  }

  .symbol {
    color: #e2c217;
  }
</style>

<h3>
  {#await promise}
    Getting current price...
  {:then response}
    <!-- {#if data && data['Realtime Currency Exchange Rate']} -->
    {#if response && response.data && response.data.amount}
      <!-- {symbol}: ${parseFloat(data['Realtime Currency Exchange Rate']['5. Exchange Rate']).toFixed(2)} -->
      <span class:symbol>{symbol}</span>: ${parseFloat(response.data.amount).toFixed(2)}
    {:else}{symbol}: Price Not Found{/if}
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</h3>
