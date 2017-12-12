<template>
<v-layout row class="scroll-y" style="height: calc(100vh - 100px)">
  <confirm-modal title="Delete Order" :message="message" v-if="deleteMode" @done="remove" @cancel="deleteMode=false"></confirm-modal>
  <v-flex xs12>
    <v-card full-width flat>
      <v-card-title>
        <v-btn dark color="primary" :to="{name: 'editOrder',params: {id: 'new'}}">
          <v-icon>create_new_folder</v-icon>
          &nbsp;New Order</v-btn>
      </v-card-title>
      <v-data-table :items="orders" :headers="headers" must-sort>
        <template slot="items" slot-scope="props">
              <td class="text-xs-left print-hide">
                <span>{{props.item.name}}</span>
              </td>
              <td class="text-xs-left">
                <span>{{props.item.createdAt | moment("DD/MM/YY hh:mm")}}</span>
              </td>
              <td class="text-xs-left">
                <span>{{props.item.orderDate | moment("DD/MM/YY")}}</span>
              </td>
              <td class="text-xs-right">
                <v-btn fab small dark color="green" :to="{name: 'editOrder', params: {id: props.item.id}}">
                  <v-icon dark>edit</v-icon>
                </v-btn>
                <v-btn fab dark small color="red"  @click.native.stop="confirmDelete(props.item.id)">
                    <v-icon dark>delete</v-icon>
                </v-btn>
              </td>
</template>
        </v-data-table>
      </v-card>
    </v-flex>
</v-layout>
</template>


<script>
import ConfirmModal from '../ConfirmModal'
export default {
  name: 'ordersList',
  created() {
    this.$store.dispatch('loadOrders')
  },
  data: function() {
    return {
      selected: {},
      deleteMode: false,
      headers: [{
          align: 'left',
          value: 'name',
          text: 'שם הלקוח'
        },
        {
          align: 'left',
          value: 'createdAt',
          text: 'תאריך יצירת ההזמנה'
        },
         {
          align: 'left',
          value: 'orderDate',
          text: 'תאריך משלוח'
        },
        {
          sortable: false,
          value: 'action'
        }
      ]
    }
  },
  computed: {
    orders() {
      let items = this.$store.getters.orders || []
        items = this.$store.getters.orders.map(item => {
          return {
            name: item.client.name,
            createdAt: new Date(item.client.createdAt),
            orderDate: item.client.orderDate,
            id: item.id
          }
        })
      return items
    },
    message() {
      if (this.selected) {
        return `Are you sure you want to delete <strong> ${this.selected.name}</strong>?`
      } else {
        return '';
      }
    },
  },
  methods: {
    confirmDelete(id) {
      this.selected = this.orders.find((item) => item.id === id)
      this.deleteMode = true
    },
    remove() {
      this.$store.dispatch('deleteOrder', this.selected.id)
      this.deleteMode = false
      this.selected = null
    }
  },
  components: {
    ConfirmModal
  }
}
</script>

<style scoped>

</style>
