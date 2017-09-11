<template>
  <div id="app">
    <router-view></router-view>
    <vendor-components class="core"></vendor-components>
    <div class="vendor-components">
      <Auth /><Layer /><Redirect />
    </div>
  </div>
</template>
<script>
  import './assets/js/flexible-all';
  import Auth from './components/auth';
  import Layer from './components/layer';
  import Redirect from './components/redirect';

  export default {
    components: {
      Auth, Layer, Redirect
    }
  }
</script>
<style>
  @import './assets/css/app.css';
  @import './assets/css/btn.css';
  @import './assets/css/icon.css';
  @import './assets/css/grid.css';
  .wrap {
    position: absolute;
    width: 10rem;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .container {
    overflow-y: scroll;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    -ms-flex-negative: 1;
    flex-shrink: 1;
    -ms-flex-preferred-size: 0%;
    flex-basis: 0%;
  }
</style>