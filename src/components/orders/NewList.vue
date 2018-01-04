<template>
<v-layout row class="scroll-y" id="scrollTarget" style="height: calc(100vh - 100px)">
  <v-flex xs12>
    <v-card full-width flat>
      <v-card-title class="print-hide light-blue lighten-3">
        <v-btn dark color="green" @click.native="newOrder">
          <v-icon>create_new_folder</v-icon>
           &nbsp;New Order</v-btn>
           <v-spacer></v-spacer>
        <v-btn color="orange" dark @click.native="save">
          <v-icon>save</v-icon>
           &nbsp;Save
        </v-btn>

        <v-btn color="secondary" fab small dark @click.native="print">
          <v-icon>print</v-icon>
        </v-btn>
      </v-card-title>
      <new-list-item
      v-for="order in orders"
      :key="order.orderId"
      :client="order"
      :clients="clients"
      :plants="plants"
      @removeOrder="removeOrder"></new-list-item>
    </v-card>
</v-flex>
</v-layout>

</template>

<script src="./newOrder">
</script>

<style scoped>
.b-card-title {
  background: #90caf9;
}
</style>

