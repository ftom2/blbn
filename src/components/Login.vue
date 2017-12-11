<template>
<div class="wrapper">
  <v-layout row align-center justify-center>
    <v-flex xs4>
      <v-form v-model="valid">
        <v-text-field label="Email" v-model="email" :rules="emailRules" required></v-text-field>
        <v-text-field label="Password" type="password" v-model="pwd" required></v-text-field>
        <v-btn @click="login" :disabled="!valid" color="primary">
          submit
        </v-btn>
      </v-form>
    </v-flex>
  </v-layout>

</div>
</template>

<script>
export default {
  name: 'bl-login',
  data() {
    return {
      valid: false,
      email: '',
      pwd: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  computed: {
    error() {
      return this.$store.getters.error
    },
    user() {
      return this.$store.getters.user
    }
  },
  watch: {
    user(val) {
      if (val) {
        this.$router.replace('/')
      }
    }
  },
  methods: {
    login() {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.pwd
      })
    }
  }
}
</script>

<style scoped lang="scss">
.alert {
  top: 20%;
  width: 300px;
  color: #fff;
  background: #ea7458;
  border-color: #ea7458;
}

.wrapper {
  background: url('../assets/bg.jpg') no-repeat 0 0;
  background-size: cover;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

h2 {
  text-align: center;
  margin: 10px 0;
  color: #fff;
}

form {
  background: rgba(255, 255, 255, .8);
  padding: 10px 20px 20px;
}
</style>

