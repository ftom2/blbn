<template>
<v-dialog v-model="show" max-width="290">
  <v-card>
    <v-card-title class="headline">{{title}}</v-card-title>
    <v-card-text v-html="message"></v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="green darken-1" flat="flat" @click.native="$emit('cancel')">Cancel</v-btn>
      <v-btn color="red darken-1" flat="flat" @click.native="$emit('done')">OK</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>

<script>
export default {
  name: 'b-confirm-modal',
  props: ['title', 'message'],
  data: function() {
    return {
      show: true
    }
  }
}
</script>
