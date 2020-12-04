<script>
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import { Orders } from '../../api/orders';

  import UserOrder from './UserOrder.svelte';
  export let userId;
  $: userOrders = useTracker(() => Orders.find({ userId }).fetch());
</script>

<main>
  {#if $userOrders.length > 0}
    {#each $userOrders as order (order.uuid)}
      <UserOrder {order} />
    {/each}
  {:else}No orders yet. (What are you waiting on?){/if}
</main>
