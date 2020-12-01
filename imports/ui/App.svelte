<script>
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import { Order, Orders } from '../api/orders';

  // when order added to database this will fetch all of them from DB
  $: orders = useTracker(() => Orders.find().fetch());
</script>

<header>
  <h1>Yerrr</h1>
  {#each $orders as order}
    <h2>{order.username}</h2>
    <p>${order.amount}</p>
  {/each}
</header>
