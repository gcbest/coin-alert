<script>
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import { Orders } from '../api/orders';
  import UserOrders from '../ui/orders/UserOrders.svelte';
  import { LoginWindow, Logout } from 'meteor/levelup:svelte-accounts-ui';
  import Order from './orders/OrderAlert.svelte';
  import { onMount } from 'svelte';

  let email = '';
  let amount = 0;
  let userOrders = [];

  // when order added to database this will fetch all of them from DB
  $: user = useTracker(() => Meteor.user());
  $: allOrders = useTracker(() => Orders.find().fetch());

  $: userId = useTracker(() => Meteor.userId());
  let userId = $userId;
  // TODO: USER ORDERS
  // $: userOrders = useTracker(() => Orders.find().fetch());

  // onMount(() => {
  //   if ($user) {
  //     email = $user.emails[0].address;
  //     console.log(email);
  //   }
  // });

  function handleSubmit(event) {
    Orders.insert({
      email: $user.emails[0].address,
      userId: $userId,
      amount,
      createdAt: new Date(),
    });

    // popAlert();
  }
</script>

<style>
  .alert-area {
    width: 300px;
    position: fixed;
    bottom: 5%;
    right: 10%;
  }
</style>

<header>
  {#if $userId}
    <Logout />
  {:else}
    <LoginWindow />
  {/if}
  <h1>Yerrr</h1>

  <form on:submit|preventDefault={handleSubmit}>
    <input type="number" name="amount" bind:value={amount} />
    <button type="submit">Order</button>
  </form>
</header>

<UserOrders userId={$userId} />

<div class="alert-area">
  {#if $allOrders.length > 0}
    {#each $allOrders as order}
      <Order {order} />
    {/each}
  {/if}
</div>
