<template>
  <v-layout row class="scroll-y" style="height: calc(100vh - 100px)">
    <edit-modal :data="selected" v-if="editMode" @done="save" @cancel="editMode=false"></edit-modal>
    <confirm-modal title="Delete Client" :message="message" v-if="deleteMode" @done="remove" @cancel="deleteMode=false">
    </confirm-modal>
    <v-flex xs12>
      <v-card full-width>
        <v-card-title>
          <v-btn dark color="primary" @click.native="add">Add Client</v-btn>
          <v-spacer></v-spacer>
          <v-text-field append-icon="search" label="Search" single-line hide-details v-model="filter"></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="clients" :search="filter">
          <template slot="items" slot-scope="props">
                <td class="text-xs-left">{{ props.item.hebName }}</td>
                <td class="text-xs-left">{{ props.item.engName }}</td>
                <td class="text-xs-left">{{ props.item.location }}</td>
                 <td class="text-xs-left">{{ props.item.phone }}</td>
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

          <template slot="no-data">
            <v-alert :value="true" color="error" icon="warning">
            Sorry, nothing to display here :(
          </v-alert>
        </template>
        </v-data-table>
      </v-card>
     </v-flex>
  </v-layout>

</template>

<script>
  import EditModal from './ClientEditModal'
  import ConfirmModal from './ConfirmModal'
  export default {
    name: 'bl-clients',
    data() {
      return {
        selectedIndex: null,
        selected: {},
        deleteMode: false,
        editMode: false,
        filter: '',
        headers: [{
            value: 'hebName',
            text: 'שם המשתלה',
            align: 'left'
          },
          {
            value: 'engName',
            text: 'Name',
            align: 'left'
          },
          {
            value: 'location',
            text: 'מיקום',
            align: 'left'
          },
          {
            value: 'phone',
            text: 'טלפון',
            align: 'left'
          },
          {
            value: 'actions',
            sortable: false,
            align: 'right'
          }
        ]
      }
    },
    created() {
      this.$store.dispatch('loadClients')
    },
    computed: {
      message() {
        if (this.selected) {
          return 'Are you sure you want to delete <strong>' + (this.selected.engName ? this.selected.engName : this.selected.hebName) + '</strong>?'
        } else {
          return '';
        }
      },
      clients() {
        return this.$store.getters.clients
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
        this.$store.dispatch('updateClient', data)
        this.selected = null
        this.selectedIndex = null
      },
      create(data) {
        this.editMode = false
        this.$store.dispatch('createClient', data)
      },
      cancel() {
        this.editMode = false
      },
      edit(id) {
        const index = this.clients.findIndex(item => item.id === id)
        this.editMode = true
        this.selected = this.clients[index]
        this.selectedIndex = index
      },
      add() {
        this.editMode = true
        this.selected = null
      },
      confirmDelete(id) {
        this.selected = this.clients.find((item) => item.id === id)
        this.deleteMode = true
      },
      remove() {
        this.deleteMode = false
        this.$store.dispatch('deleteClient', this.selected.id)
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
