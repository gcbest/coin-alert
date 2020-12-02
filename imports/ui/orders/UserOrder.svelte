<script>
  export let order;
  var options = {
    // weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const formattedDate = order.createdAt.toLocaleDateString('en-US', options);
</script>

<li>${order.amount} | {formattedDate}</li>
