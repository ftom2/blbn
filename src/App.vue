<template>
  <v-app>
    <v-alert :color="alert.type"
    v-show="alert.message"
    value="true"
    transition="scale-transition"
    class="app-alert">
      {{alert.message}}
    </v-alert>
    <div class="loading-icon" v-show="loading">
      <v-progress-circular indeterminate v-bind:size="70" v-bind:width="7" color="green"></v-progress-circular>
    </div>
    <!-- <v-navigation-drawer app></v-navigation-drawer> -->
    <v-toolbar app color="green" dark v-if="userIsAuthenticated" class="print-hide">
      <v-toolbar-title>Balaban</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-items class="hidden-sm-and-down" v-for="item in menuItems" :key="item.to">
        <v-btn flat :to="item.to">{{item.label}}</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content fluid>
      <v-container fluid fill-height>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
  export default {
    name: 'app',
    computed: {
      alert(){
        const alert = this.$store.getters.alert

        if (alert.message){
          setTimeout(() => {
            this.$store.dispatch('setAlert', {message: null})
          },2000)
        }

        return alert
      },
      userIsAuthenticated() {
        return !!this.$store.getters.user
      },
      loading() {
        return this.$store.getters.loading
      },
      menuItems() {
        let items = [{
            to: '/plants',
            label: 'צמחים',
            icon: 'leaf'
          }, {
            to: '/clients',
            label: 'לקוחות',
            icon: 'ios-people'
          },
          {
            to: '/orders',
            label: 'הזמנות',
            icon: 'ios-list-outline'
          }
        ]
        return items
      }
    },
    // mounted() {
    //   this.$refs.toastr.s("SUCCESS MESSAGE");
    // },
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
    overflow: hidden !important;
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
  .loading-icon {
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .5);
    .progress-circular {
      position: absolute;
      left: 50%;
      top: 50%;
    }
  }

  .print-show{
    display: none;
  }

  .app-alert{
    position: fixed !important;
    right: 20px;
    bottom: 100px;
    z-index: 1000;
    margin: 0 !important;
    min-width: 200px;
    border-radius: 5px;
  }
</style>
