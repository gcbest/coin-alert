<script>
  import { Button } from 'sveltestrap';
  //   import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import { v4 as uuidv4 } from 'uuid';
  import { Orders } from '../../api/orders';
  import { btcPrice } from '../../utils/stores';
  import { calculateBTCAmount } from '../../utils';

  let dollarAmount = 0;
  export let userId;
  export let user;
  //   $: user = useTracker(() => Meteor.user());

  function handleSubmit(event) {
    const btcAmount = calculateBTCAmount(dollarAmount, $btcPrice.valueOf());

    Orders.insert({
      email: user.emails[0].address,
      userId,
      dollarAmount,
      btcPrice: $btcPrice,
      btcAmount,
      createdAt: new Date(),
      uuid: uuidv4(),
    });
  }
</script>

<style>
  .order-form {
    width: fit-content;
    margin: auto;
  }

  input.order-amount {
    display: inline;
    width: auto;
    margin: 10px;
  }
</style>

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
