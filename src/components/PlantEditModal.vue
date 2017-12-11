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
              <v-text-field label="English name" required v-model="item.plantNameEng"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Hebrew Name" required v-model="item.plantNameHeb"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Size" required v-model="item.size"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Thai Name" v-model="item.thailand"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Quantity" v-model="item.quantity"></v-text-field>
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
    console.log('this.data', this.data);

    if (this.data) {
      this.item = { ...this.data }
    } else {
      this.item = {
        plantNameEng: '',
        plantNameHeb: '',
        thailand: '',
        size: '',
        quantity: 0
      }
    }
  }
}
</script>
