<script>
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import { Orders } from '../../api/orders';
  import Order from './OrderAlert.svelte';

  export let userId;
  const loginTime = new Date();

  $: alertOrders = useTracker(() =>
    Orders.find({
      createdAt: { $gte: loginTime },
      userId: { $ne: userId },
    }).fetch()
  );
</script>

<style>
  .alert-area {
    width: 300px;
    position: fixed;
    bottom: 5%;
    right: 10%;
  }
</style>

<div class="alert-area">
  {#if $alertOrders.length > 0}
    {#each $alertOrders as order}
      <Order {order} />
    {/each}
  {/if}
</div>
