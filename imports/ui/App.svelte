<script>
  import { Col, Container, Row, Card } from 'sveltestrap';
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import { LoginWindow } from 'meteor/levelup:svelte-accounts-ui';
  import AlertOrders from './orders/AlertOrders.svelte';
  import CurrentPrices from './pricing/CurrentPrices.svelte';
  import TransactionHistory from './details/TransactionHistory.svelte';
  import Wallet from './details/Wallet.svelte';
  import OrderForm from './form/OrderForm.svelte';
  import NavBar from './navbar/NavBar.svelte';
  import Brand from './navbar/Brand.svelte';

  // when order added to database this will fetch all of them from DB
  $: user = useTracker(() => Meteor.user());
  // $: allOrders = useTracker(() => Orders.find().fetch());
  $: userId = useTracker(() => Meteor.userId());
</script>

<style>
  .login-window {
    color: red;
    text-align: center;
    font-weight: 700px;
  }
</style>

{#if $userId}
  <NavBar />
  <Container>
    <Row>
      <Col>
        <CurrentPrices />
        <OrderForm userId={$userId} user={$user} />
      </Col>
    </Row>
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
{:else}
  <div class="login-window">
    <Brand />
    <LoginWindow />
  </div>
{/if}
