<script>
  import { Col, Container, Row } from 'sveltestrap';
  import { v4 as uuidv4 } from 'uuid';
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import { Orders } from '../api/orders';
  import { LoginWindow, Logout } from 'meteor/levelup:svelte-accounts-ui';
  import AlertOrders from './orders/AlertOrders.svelte';
  import CurrentPrices from './pricing/CurrentPrices.svelte';
  import TransactionHistory from './details/TransactionHistory.svelte';
  import Wallet from './details/Wallet.svelte';
  import { btcPrice } from '../utils/stores';
  import { calculateBTCAmount } from '../utils';

  let dollarAmount = 0;

  // when order added to database this will fetch all of them from DB
  $: user = useTracker(() => Meteor.user());
  // $: allOrders = useTracker(() => Orders.find().fetch());
  $: userId = useTracker(() => Meteor.userId());

  function handleSubmit(event) {
    const btcAmount = calculateBTCAmount(dollarAmount, $btcPrice.valueOf());

    Orders.insert({
      email: $user.emails[0].address,
      userId: $userId,
      dollarAmount,
      btcPrice: $btcPrice,
      btcAmount,
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
    <label>$
      <input
        type="number"
        bind:value={dollarAmount}
        placeholder="0.00"
        required
        name="price"
        min="0"
        step="0.01"
        title="Currency"
        pattern="^\d+(?:\.\d{(1, 2)})?$" />
    </label>

    <button type="submit">Order</button>
  </form>
</header>

<Container>
  <Row>
    <Col>
      <TransactionHistory userId={$userId} />
    </Col>
    <Col>
      <Wallet userId={$userId} />
    </Col>
  </Row>
</Container>

<AlertOrders userId={$userId} />
