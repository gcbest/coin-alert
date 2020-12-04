<script>
  import { Col, Container, Row, Button } from 'sveltestrap';
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
  @font-face {
    font-family: 'SEGA LOGO FONT';
    src: url('//db.onlinewebfonts.com/t/b593a614952261da06c53a02d1954f44.eot');
    src: url('//db.onlinewebfonts.com/t/b593a614952261da06c53a02d1954f44.eot?#iefix')
        format('embedded-opentype'),
      url('//db.onlinewebfonts.com/t/b593a614952261da06c53a02d1954f44.woff2')
        format('woff2'),
      url('//db.onlinewebfonts.com/t/b593a614952261da06c53a02d1954f44.woff')
        format('woff'),
      url('//db.onlinewebfonts.com/t/b593a614952261da06c53a02d1954f44.ttf')
        format('truetype'),
      url('//db.onlinewebfonts.com/t/b593a614952261da06c53a02d1954f44.svg#SEGA LOGO FONT')
        format('svg');
  }

  h1 {
    font-family: 'SEGA LOGO FONT';
    font-weight: 200;
    color: red;
    text-align: center;
  }

  .order-form {
    width: fit-content;
    margin: auto;
  }

  input.order-amount {
    display: inline;
    width: auto;
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
  <h1>coin counter</h1>
  <CurrentPrices />

  <form on:submit|preventDefault={handleSubmit} class="order-form">
    <label>$
      <input
        class="form-control order-amount"
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

    <Button color="warning" type="submit">Order</Button>
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
