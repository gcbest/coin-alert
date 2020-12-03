<script>
  export let order;
  const dateOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  const timeOptions = {
    timeZoneName: 'short',
  };

  const formattedDate = order.createdAt.toLocaleDateString(
    'en-US',
    dateOptions
  );
  const formattedTime = order.createdAt.toLocaleTimeString(
    'en-US',
    timeOptions
  );
</script>

<li>${order.amount} | {formattedDate} | {formattedTime}</li>
