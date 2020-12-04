<script>
  import { Meteor } from 'meteor/meteor';
  import { Navbar, NavbarBrand, Nav } from 'sveltestrap';
  import Brand from './Brand.svelte';
</script>

<header>
  <Navbar color="dark" light expand="md">
    <NavbarBrand href="/">
      <Brand />
    </NavbarBrand>
    <Nav class="ml-auto" navbar>
      <button
        class="btn btn-danger"
        on:click={() => {
          Meteor.logout();
          alert('hmm someone should fix this...');
        }}>
        Logout
      </button>
    </Nav>
  </Navbar>
</header>
