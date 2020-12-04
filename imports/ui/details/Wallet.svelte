<script>
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import { Orders } from '../../api/orders';
  import { Card, CardBody, CardHeader, CardTitle } from 'sveltestrap';
  export let userId;

  $: userOrders = useTracker(() => Orders.find({ userId }).fetch());
</script>

<style>
  .coin {
    margin: 10px 0;
  }
</style>

<Card class="mb-3" color="dark" inverse>
  <CardHeader>
    <CardTitle>
      <h2>Your Wallet</h2>
    </CardTitle>
  </CardHeader>

  <CardBody>
    <div class="coin">
      BTC Owned:
      {#if $userOrders}
        {$userOrders
          .reduce((acc, curr) => acc + curr.btcAmount, 0)
          .toPrecision(4)}
      {/if}
    </div>
    <div class="coin">ETH Owned: Coming soon</div>
    <div class="coin">XRP Owned: Coming soon</div>
  </CardBody>
</Card>
