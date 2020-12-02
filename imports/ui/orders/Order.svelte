<script>
  export let order;
  import { Orders } from '../../api/orders';
  function deleteOrder() {
    Orders.remove(order._id);
  }
</script>

<li>
  {order.email}
  | ${order.amount}
  <button on:click={deleteOrder}>Delete</button>
</li>
