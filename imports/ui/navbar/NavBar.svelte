<script>
  import { Logout } from 'meteor/levelup:svelte-accounts-ui';
  import { Navbar, NavbarBrand, Nav } from 'sveltestrap';
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
</style>

<Navbar color="dark" light expand="md">
  <NavbarBrand href="/">
    <h1>coin counter</h1>
  </NavbarBrand>
  <Nav class="ml-auto" navbar>
    <Logout />
  </Nav>
</Navbar>
