<script>
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import { Orders } from '../../api/orders';

  import UserOrder from './UserOrder.svelte';
  export let userId;
  $: userOrders = useTracker(() => Orders.find({ userId }).fetch());
</script>

<main>
  <h2>Your Order History</h2>
  {#if $userOrders.length > 0}
    {#each $userOrders as order}
      <UserOrder {order} />
    {/each}
  {/if}
</main>
