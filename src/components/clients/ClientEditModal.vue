<template>
  <v-dialog v-model="show" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Plants</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field label="English name" required v-model="item.engName"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Hebrew Name" required v-model="item.hebName"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Location" v-model="item.location"></v-text-field>
            </v-flex>
             <v-flex xs12>
              <v-text-field label="Phone" v-model="item.phone"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="$emit('cancel')">Cancel</v-btn>
        <v-btn color="blue darken-1" flat @click.native="$emit('done', item)">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'edit-modal',
  props: ['data'],
  data() {
    return {
      item: {},
      show: true
    }
  },
  created() {
    if (this.data) {
      this.item = { ...this.data }
    } else {
      this.item = {
        engName: '',
        hebName: '',
        location: '',
        phone: ''
      }
    }
  }
}
</script>
