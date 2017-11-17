<template>
  <div class="wrapper">
    <Alert type="error" class="alert center" v-if="error">{{error}}</Alert>
    <Form class="center">
      <h2>Login</h2>
        <FormItem prop="email">
            <Input type="text" v-model="email" placeholder="Email">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" v-model="pwd" placeholder="Password">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem>
            <Button type="primary" long @click="login">Signin</Button>
        </FormItem>
    </Form>
  </div>
</template>

<script>
  export default {
    name: 'bl-login',
    data() {
      return {
        email: '',
        pwd: ''
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
      user (val) {
        if (val) {
          this.$router.replace('/')
        }
      }
    },
    methods: {
      login() {
        this.$store.dispatch('login', {email: this.email, password: this.pwd})
      }
    }
  }
</script>

<style scoped lang="scss">
.alert{
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
    background: rgba(0, 0, 0, .8);
    padding: 10px 20px 20px;
    width: 300px;
    height: 240px;
  }
</style>

