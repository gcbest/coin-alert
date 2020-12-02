<script>
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import { Orders } from '../api/orders';
  import { LoginWindow, Logout } from 'meteor/levelup:svelte-accounts-ui';
  import Order from '../ui/orders/Order.svelte';

  let username = '';
  let amount = 0;

  // when order added to database this will fetch all of them from DB
  $: orders = useTracker(() => Orders.find().fetch());
  $: user = useTracker(() => Meteor.user());
  $: userId = useTracker(() => Meteor.userId());

  function handleSubmit(event) {
    console.log($user);
    Orders.insert({
      email: $user.emails[0].address,
      amount,
    });

    username = '';
  }
</script>

<header>
  {#if $userId}
    <Logout />
  {:else}
    <LoginWindow />
  {/if}
  <h1>Yerrr</h1>
  {#each $orders as order}
    <Order {order} />
  {/each}

  <form on:submit|preventDefault={handleSubmit}>
    <input type="text" name="username" bind:value={username} />
    <input type="number" name="amount" bind:value={amount} />
    <button type="submit">Order</button>
  </form>
</header>
