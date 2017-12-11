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

<script src="./plants">

</script>

<style scoped>

</style>
