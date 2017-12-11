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

<script src="./clients">

</script>
