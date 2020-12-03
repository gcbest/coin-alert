<script>
  import { v4 as uuidv4 } from 'uuid';
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import { Orders } from '../api/orders';
  import UserOrders from '../ui/orders/UserOrders.svelte';
  import { LoginWindow, Logout } from 'meteor/levelup:svelte-accounts-ui';
  import AlertOrders from './orders/AlertOrders.svelte';
  import CurrentPrices from './pricing/CurrentPrices.svelte';
  let email = '';
  let amount = 0;
  let userOrders = [];

  // when order added to database this will fetch all of them from DB
  $: user = useTracker(() => Meteor.user());
  // $: allOrders = useTracker(() => Orders.find().fetch());
  $: userId = useTracker(() => Meteor.userId());

  function handleSubmit(event) {
    Orders.insert({
      email: $user.emails[0].address,
      userId: $userId,
      amount,
      createdAt: new Date(),
      uuid: uuidv4(),
    });
  }
</script>

<style>
  h1 {
    text-align: center;
  }

  .login-window {
    color: green;
  }
</style>

<header>
  {#if $userId}
    <Logout />
  {:else}
    <div class="login-window">
      <LoginWindow />
    </div>
  {/if}
  <h1>Coin Counter</h1>
  <CurrentPrices />

  <form on:submit|preventDefault={handleSubmit}>
    <label>$<input
        type="number"
        min="0"
        name="amount"
        bind:value={amount} /></label>
    <button type="submit">Order</button>
  </form>
</header>

<UserOrders userId={$userId} />

<AlertOrders userId={$userId} />
