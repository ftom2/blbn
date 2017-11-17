<template>
  <div id="app">
    <Menu mode="horizontal" theme="primary" active-name="clients" v-if="userIsAuthenticated">
      <MenuItem name="logo">
      <router-link to="plants" tag="span">Balaban</router-link>
      </MenuItem>
      <Row type="flex" justify="end">
        <MenuItem :name="item.name" v-for="item in menuItems" :key="item.name">
        <router-link :to="item.name" tag="span">{{item.label}}</router-link>
        <Icon :type="item.icon" style="margin-left: 5px"></Icon>
        </MenuItem>
        <MenuItem name="logout">
        <span @click="logout">התנתק</span>
        <Icon type="log-out" style="margin-left: 5px"></Icon>
        </MenuItem>
      </Row>
    </Menu>
    <div class="container-fluid">
      <router-view/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    computed: {
      userIsAuthenticated() {
        return !!this.$store.getters.user
      },
      menuItems() {
          let items = [{
            name: 'plants',
            label: 'צמחים',
            icon: 'leaf'
          }, {
            name: 'clients',
            label: 'לקוחות',
            icon: 'ios-people'
          }]
        return items
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('logout')
        this.$router.replace('login')
      }
    }
  }
</script>

<style lang="scss">
  html,
  body {
    overflow: hidden;
    height: 100vh;
    font-size: 10px;
  }
  #app {
    overflow: hidden;
    font-size: 1.4rem;
  }
  .nav {
    a {
      padding: 5px 10px;
      color: #fff;
      display: block;
      text-decoration: none;
      transition: all .3s;
    }
    .router-link-exact-active a {
      background: darken(#28a745, 10%);
      border-radius: 5px;
    }
  }
  .v-spinner {
    position: fixed;
    left: 50%;
    top: 50%;
  }
  .table-wrapper {
    height: calc(100vh - 100px);
    overflow: auto;
  }
  .mb10 {
    margin-bottom: 10px;
  }
  .m10 {
    margin: 10px;
  }
  .center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
