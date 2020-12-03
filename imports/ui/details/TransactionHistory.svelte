<script>
  import { Card, CardBody, CardHeader, CardTitle } from 'sveltestrap';
  import UserOrders from '../orders/UserOrders.svelte';
  export let userId;
</script>

<Card class="mb-3" color="dark" inverse>
  <CardHeader>
    <CardTitle>
      <h2>Your Order History</h2>
    </CardTitle>
  </CardHeader>
  <CardBody>
    <UserOrders {userId} />
  </CardBody>
</Card>
