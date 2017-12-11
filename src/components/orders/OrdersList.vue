<template>
<v-layout row class="scroll-y" style="height: calc(100vh - 100px)">
    <v-flex xs12>
      <v-card full-width flat>
        <v-card-title>
          <v-btn dark color="primary" :to="{name: 'editOrder',params: {id: 'new'}}">
            <v-icon>create_new_folder</v-icon>
             &nbsp;New Order</v-btn>
        </v-card-title>
        <v-data-table :items="orders" :headers="headers">
          <template slot="items" slot-scope="props">
              <td class="text-xs-left print-hide">
                <span>{{props.item.name}}</span>
              </td>
              <td class="text-xs-left">
                <span>{{props.item.createdAt | moment("DD/MM/YY hh:mm")}}</span>
              </td>
              <td class="text-xs-right">
                <v-btn dark color="green" :to="{name: 'editOrder', params: {id: props.item.id}}">
                  <v-icon dark>edit</v-icon>
                  &nbsp;Edit Order
                </v-btn>
              </td>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
</v-layout>
</template>


<script>
export default {
  name: 'ordersList',
  created(){
    this.$store.dispatch('loadOrders')
  },
  data: function() {
    return {
       headers: [{
          align: 'left',
          value: 'name',
          text: 'שם הלקוח'
        },
        {
          align: 'left',
          value: 'Created At',
          text: 'תאריך יצירת ההזמנה'
        },
        {
          sortable: false,
          value: 'action'
        }
      ]
    }
  },
  computed: {
    orders () {
      let items = this.$store.getters.orders
      if (items){
        items = this.$store.getters.orders.map(item => {
          return {
            name: item.client.name,
            createdAt: new Date(item.client.createdAt),
            id: item.id
          }
        })
      }
      return items
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
