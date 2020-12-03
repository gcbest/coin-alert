<script>
  import { Alert } from 'sveltestrap';
  // import { Orders } from '../../api/orders';

  export let order;
  let visible;
  //   function deleteOrder() {
  //     Orders.remove(order._id);
  //   }
</script>

<Alert color="info" isOpen={visible} toggle={() => (visible = false)}>
  {order.email}
  | ${order.dollarAmount}
  <!-- <button on:click={deleteOrder}>Delete</button> -->
</Alert>
