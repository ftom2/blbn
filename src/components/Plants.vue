<template>
<v-layout row class="scroll-y" style="height: calc(100vh - 100px)">

  <edit-modal :data="selected" v-if="editMode" @done="save" @cancel="editMode=false"></edit-modal>

  <confirm-modal
    title="Delete Plant"
    :message="message"
    v-if="deleteMode"
    @done="remove"
    @cancel="deleteMode=false">
  </confirm-modal>

  <v-flex xs12>
    <v-card full-width>
      <v-card-title>
        <v-btn dark color="primary" @click.native="add">Add Plant</v-btn>
        <v-spacer></v-spacer>
        <v-text-field append-icon="search" label="Search" single-line hide-details v-model="filter"></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="plants" :search="filter">
        <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.plantNameEng }}</td>
            <td class="text-xs-left">{{ props.item.plantNameHeb }}</td>
            <td class="text-xs-left">{{ props.item.size }}</td>
            <td class="text-xs-left">{{ props.item.thailand }}</td>
            <td class="text-xs-left">{{ props.item.quantity }}</td>
            <td class="text-xs-right">
              <v-btn fab dark small color="primary" @click.native.stop="edit(props.item.id)">
                <v-icon dark>edit</v-icon>
              </v-btn>
              <v-btn fab dark small color="red"  @click.native.stop="confirmDelete(props.item.id)">
                <v-icon dark>delete</v-icon>
              </v-btn>
            </td>
        </template>

        <template slot="pageText" slot-scope="{ pageStart, pageStop }">
        From {{ pageStart }} to {{ pageStop }}
        </template>
      </v-data-table>
    </v-card>
  </v-flex>
</v-layout>

</template>

<script>
import EditModal from './PlantEditModal'
import ConfirmModal from './ConfirmModal'
export default {
  name: 'bl-plants',
  data() {
    return {
      selected: null,
      deleteMode: false,
      editMode: false,
      filter: '',
      pagination: {},
      headers: [{
          align: 'left',
          value: 'plantNameEng',
          text: 'Name'
        },
        {
          align: 'left',
          value: 'plantNameHeb',
          text: 'שם הצמח'
        },
        {
          align: 'left',
          value: 'size',
          text: 'Size'
        },
        {
          align: 'left',
          value: 'thailand',
          text: 'Thailand'
        },
        {
          align: 'left',
          value: 'quantity',
          text: 'Quantity'
        },
        {
          sortable: false,
          value: 'action'
        }
      ]
    }
  },
  created() {
    this.$store.dispatch('loadPlants')
  },
  computed: {
    plants() {
      return this.$store.getters.plants
    },
    message() {
      if (this.selected){
        return 'Are you sure you want to delete <strong>' + (this.selected.plantNameEng ? this.selected.plantNameEng : this.selected.plantNameHeb) + '</strong>?'
      }
      else{
        return '';
      }
    }
  },
  methods: {
    save(item) {
      this.editMode = false
      //edit mode
      if (this.selected) {
        this.update(item)
      } else {
        this.create(item)
      }

    },
    update(data) {
      this.editMode = false
      this.$store.dispatch('updatePlant', data)
      this.selected = null
      this.selectedIndex = null
    },
    create(data) {
      this.editMode = false
      this.$store.dispatch('createPlant', data)
    },
    cancel() {
      this.editMode = false
    },
    edit(id) {
      const index = this.plants.findIndex((item) => item.id === id)
      this.editMode = true
      this.selected = this.plants[index]
      this.selectedIndex = index
    },
    add() {
      this.editMode = true
      this.selected = null
    },
    confirmDelete(id) {
      this.selected = this.plants.find((item) => item.id === id)
      this.deleteMode = true
    },
    remove() {
      this.deleteMode = false
      this.$store.dispatch('deletePlant', this.selected.id)
      this.selected = null
    }
  },
  components: {
    EditModal,
    ConfirmModal
  }
}
</script>

<style scoped>

</style>
