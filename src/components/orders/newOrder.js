import moment from 'moment'
export default {
  name: 'blNewOrder',
  props: {
    id: {
      required: true,
      type: String
    }
  },
  data: function() {
    return {
      dateFormatted:null,
      showPicker: false,
      orderId: '',
      isChanged: false,
      selectedClientName: '',
      client: {
        orderDate: '',
        name: '',
        order: [{
          hebName: '',
          engName: '',
          quantity: '',
          thaiName: '',
          size: ''
        }]
      }
    }
  },
  created() {
    if (!this.clients.length){
      this.$store.dispatch('loadClients')
    }
    if (!this.plants.length){
      this.$store.dispatch('loadPlants')
    }

    if (this.id !== 'new'){
      this.$store.dispatch('getOrderById', this.id).then(response => {
        if (response.val()){
          this.client = response.val().client
          this.orderId = this.id
          this.onClientSelected(this.client.name)
        }
      })
    }
  },
  watch: {
    client: {
      handler(){
        this.isChanged = true
      },
      deep:true
    }
  },
  computed: {
    clients() {
      return this.$store.getters.clients
    },
    hebClients(){
      return this.clients.map(item => item.hebName)
    },
    plants() {
      return this.$store.getters.plants
    },
    hebPlants() {
      return this.plants.map(item => item.plantNameHeb)
    },
    engPlants() {
      return this.plants.map(item => item.plantNameEng)
    }
  },
  methods: {
    formatDate(date){
      if (!date) {
        return null
      }

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    onClientSelected(val){
      const client = this.clients.find(item => item.hebName === val)
      this.selectedClientName = client.engName
      this.dateFormatted = this.formatDate(this.client.orderDate)
    },
    onHebNameSelected(selected) {
      const plant = this.plants.find(item => item.plantNameHeb === selected.hebName)
      selected.engName = plant.plantNameEng
      selected.thaiName = plant.thailand
      selected.size = plant.size
    },
    onEngNameSelected(selected) {
      const plant = this.plants.find(item => item.plantNameEng === selected.engName)
      selected.hebName = plant.plantNameHeb
      selected.size = plant.size
    },
    add() {
      this.client.order.push({
        hebName: '',
        engName: '',
        quantity: '',
        thaiName: '',
        size: ''
      })
    },
    save() {
      if (!this.orderId){
        this.$store.dispatch('createOrder', this.client).then((response) => {
          this.isChanged = false
          this.orderId = response
        })
      }
      //update mode
      else{
        this.$store.dispatch('updateOrder', {data: this.client, id: this.orderId}).then(() => {
          this.isChanged = false
        })
      }
    },
    print(){
      window.print()
    },
    newOrder() {
      let ok = false
      if (this.isChanged){
        ok = confirm('You have unsaved changes, if you continue they will be lost')
      }
      else {
        ok = true
      }
      if (ok){
        this.orderId = ''
        this.isChanged = false
        this.client = {
          name: '',
          order: [{
            hebName: '',
            engName: '',
            quantity: '',
            thaiName: '',
            size: ''
          }]
        }
      }
    },
    remove(removed) {
      this.client.order = this.client.order.filter(item => item !== removed)
    }
  }
}
