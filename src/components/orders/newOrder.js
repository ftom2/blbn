import NewListItem from './NewListItem.vue';
export default {
  name: 'blNewOrderList',
  props: {
    id: {
      required: true,
      type: String
    }
  },
  data: function() {
    return {
      dateFormatted: null,
      showPicker: false,
      orderId: '',
      isChanged: false,
      selectedClientName: '',
      orders: []
    };
  },
  created() {
    if (!this.clients.length) {
      this.$store.dispatch('loadClients');
    }
    if (!this.plants.length) {
      this.$store.dispatch('loadPlants');
    }

    if (this.id !== 'new') {
      this.$store.dispatch('getOrderById', this.id).then(response => {
        if (response.val()) {
          this.orders.push(...response.val().orders);
          this.orderId = this.id;
        }
      });
    } else {
      this.orders.push({
        orderId: Date.now(),
        orderDate: '',
        name: '',
        plants: [
          {
            hebName: '',
            engName: '',
            quantity: '',
            thaiName: '',
            size: ''
          }
        ]
      });
    }
  },
  watch: {
    orders: {
      handler() {
        this.isChanged = true;
      },
      deep: true
    }
  },
  computed: {
    clients() {
      return this.$store.getters.clients;
    },
    hebClients() {
      return this.clients.map(item => item.hebName);
    },
    plants() {
      return this.$store.getters.plants;
    },
    hebPlants() {
      return this.plants.map(item => item.plantNameHeb);
    },
    engPlants() {
      return this.plants.map(item => item.plantNameEng);
    }
  },
  methods: {
    formatDate(date) {
      if (!date) {
        return null;
      }

      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`;
    },
    removeOrder(client) {
      this.orders = this.orders.filter(item => {
        return item.orderId !== client.orderId;
      });
    },
    save() {
      if (!this.orderId) {
        this.$store.dispatch('createOrder', this.orders).then(response => {
          this.isChanged = false;
          this.orderId = response;
        });
      } else {
        //update mode
        this.$store
          .dispatch('updateOrder', { data: this.orders, id: this.orderId })
          .then(() => {
            this.isChanged = false;
          });
      }
    },
    print() {
      //set body height
      const el = document.getElementById('scrollTarget'),
        body = document.body;
      body.style.height = el.scrollHeight + 'px';
      console.log('height', body.style.height);

      window.print();
    },
    newOrder() {
      this.orderId = '';
      this.isChanged = false;
      this.orders.push({
        orderId: Date.now(),
        name: '',
        plants: [
          {
            hebName: '',
            engName: '',
            quantity: '',
            thaiName: '',
            size: ''
          }
        ]
      });
    }
  },
  components: {
    NewListItem
  }
};
