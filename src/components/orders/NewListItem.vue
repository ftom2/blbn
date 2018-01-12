<template>
<div class="b-card-body">
  <h3 class="title">{{client.name}}({{selectedClientName}}) - {{dateFormatted}}</h3>
  <v-layout row justify-center class="print-hide">
    <v-flex xs3 >
    <v-btn dark color="primary" @click.native="add">
                  <v-icon>add</v-icon>
                  &nbsp;Add Plant</v-btn>
    </v-flex>
    <v-flex xs3>
      <v-select :items="hebClients" v-model="client.name" label="שם הלקוח" autocomplete @input="onClientSelected"></v-select>
    </v-flex>
    <v-flex xs3>
      <v-dialog persistent v-model="showPicker" lazy full-width width="290px">
        <v-text-field slot="activator" label="תאריך משלוח" v-model="dateFormatted" prepend-icon="event" readonly></v-text-field>
        <v-date-picker v-model="client.orderDate" @input="dateFormatted = formatDate(client.orderDate)" scrollable actions>
          <template slot-scope="{ save, cancel }">
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                  <v-btn flat color="primary" @click="save">OK</v-btn>
                </v-card-actions>
          </template>
        </v-date-picker>
        </v-dialog>
      </v-flex>
      <v-flex xs3 class="text-xs-right">
        <v-btn dark color="red" @click.native="$emit('removeOrder', client)">
                  <v-icon>delete</v-icon>
                  &nbsp;Remove Order</v-btn>
      </v-flex>
  </v-layout>
<hr>
  <v-layout row>
    <v-flex xs12>
      <v-data-table hide-headers hide-actions :items="client.plants">
        <template slot="items" slot-scope="props">
        <td class="text-xs-left">
          <v-text-field label="כמות" v-model="props.item.quantity" class="print-hide"></v-text-field>
          <span class="print-show">{{props.item.quantity}}</span>
        </td>
        <td class="text-xs-left">
          <v-select :items="hebPlants" v-model="props.item.hebName" label="שם הצמח בעברית" autocomplete @input="onHebNameSelected(props.item)" class="print-hide">
          </v-select>
          <span class="print-show">{{props.item.hebName}}</span>
        </td>
        <td class="text-xs-left">
          <v-select :items="engPlants" v-model="props.item.engName" label="שם הצמח באנגלית" autocomplete @input="onEngNameSelected(props.item)" class="print-hide"></v-select>
          <span class="print-show">{{props.item.engName}}</span>
        </td>
        <td class="print-show text-xs-left">
          <span>{{props.item.thaiName}}</span>
        </td>
        <td class="text-xs-left">
          <v-select :items="availableSizes" v-model="props.item.size" label="גודל"  class="print-hide"></v-select>
          <span class="print-show">{{props.item.size}}</span>
        </td>
        <td class="print-show text-xs-left">
          <span>{{props.item.quantity}}</span>
        </td>
        <td class="text-xs-right print-hide">
          <v-btn fab dark small color="red" @click.native.stop="remove(props.item)">
            <v-icon dark>delete</v-icon>
          </v-btn>
        </td>
      </template>
  </v-data-table>
    </v-flex>
</v-layout>
</div>



</template>

<script>
export default {
  name: 'blNewOrderListItem',
  props: {
    client: {
      required: true,
      type: Object
    },
    clients: {
      required: true,
      type: Array
    },
    plants: {
      required: true,
      type: Array
    }
  },
  computed: {
    hebClients() {
      return this.clients.map(item => item.hebName)
    },
    hebPlants() {
      return this.plants.map(item => item.plantNameHeb)
    },
    engPlants() {
      return this.plants.map(item => item.plantNameEng)
    }
  },
  created() {
    if (this.client && this.client.name) {
      this.onClientSelected(this.client.name)
    }
  },
  data() {
    return {
      showPicker: false,
      dateFormatted: null,
      selectedClientName: '',
      availableSizes: [
        '1L',
        '4L',
        'P.12',
        'P.17',
        '10L',
        '20L',
        '25L',
        '50L',
        '100L'
      ]
    }
  },
  methods: {
    formatDate(date) {
      if (!date) {
        return null
      }

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    onHebNameSelected(selected) {
      const plant = this.plants.find(
        item => item.plantNameHeb === selected.hebName
      )
      selected.engName = plant.plantNameEng
      selected.thaiName = plant.thailand
    },
    onEngNameSelected(selected) {
      const plant = this.plants.find(
        item => item.plantNameEng === selected.engName
      )
      selected.hebName = plant.plantNameHeb
    },
    onClientSelected(val) {
      const client = this.clients.find(item => item.hebName === val)
      if (client) {
        this.selectedClientName = client.engName
        this.dateFormatted = this.formatDate(this.client.orderDate)
      }
    },
    add() {
      this.client.plants.push({
        hebName: '',
        engName: '',
        quantity: '',
        thaiName: '',
        size: ''
      })
    },
    remove(removed) {
      this.client.plants = this.client.plants.filter(item => item !== removed)
    }
  }
}
</script>

<style scoped>
.title {
  position: absolute;
  z-index: -1;
}
hr {
  border-color: #4caf50;
}

.b-card-body {
  background: #eaeaea;
  margin: 10px 0;
  padding: 10px;
}
</style>


