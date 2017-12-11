<template>
<v-layout row class="scroll-y" style="height: calc(100vh - 100px)">
  <v-flex xs12>
    <h1 class="print-show">{{selectedClientName}}</h1>
    <v-card full-width flat>
      <v-card-title class="print-hide">
        <v-btn dark color="primary" @click.native="add">
          <v-icon>add</v-icon>
           &nbsp;Add Plant</v-btn>
        <v-spacer></v-spacer>
        <v-select :items="hebClients"
          v-model="client.name"
          label="שם הלקוח"
          autocomplete
          @input="onClientSelected"
          class="print-hide"></v-select>
        <v-spacer></v-spacer>
        <v-btn color="orange" dark @click.native="save">
          <v-icon>save</v-icon>
           &nbsp;Save
        </v-btn>
        <v-btn dark color="green" @click.native="newOrder">
          <v-icon>create_new_folder</v-icon>
           &nbsp;New Order</v-btn>
        <v-btn color="secondary" fab small dark @click.native="print">
          <v-icon>print</v-icon>
        </v-btn>
      </v-card-title>
      <v-data-table hide-headers hide-actions :items="client.order">
        <template slot="items" slot-scope="props">
            <td class="text-xs-left print-hide">
              <v-select
                :items="hebPlants"
                v-model="props.item.hebName"
                label="שם הצמח בעברית"
                autocomplete
                @input="onHebNameSelected(props.item)"
              ></v-select>
            </td>
            <td class="text-xs-left">
              <v-select
                :items="engPlants"
                v-model="props.item.engName"
                label="שם הצמח באנגלית"
                autocomplete
                @input="onEngNameSelected(props.item)"
                class="print-hide"
              ></v-select>
              <span class="print-show">{{props.item.engName}}</span>
            </td>
            <td class="print-show text-xs-left">
              <span>{{props.item.thaiName}}</span>
            </td>
            <td class="text-xs-left">
                <v-text-field label="גודל" v-model="props.item.size" class="print-hide"></v-text-field>
                <span class="print-show">{{props.item.size}}</span>
            </td>
            <td class="text-xs-left">
              <v-text-field label="כמות" v-model="props.item.quantity" class="print-hide"></v-text-field>
              <span class="print-show">{{props.item.quantity}}</span>
            </td>
            <td class="text-xs-right print-hide">
              <v-btn fab dark small color="red"  @click.native.stop="remove(props.item)">
                <v-icon dark>delete</v-icon>
              </v-btn>
            </td>
        </template>
      </v-data-table>
    </v-card>
</v-flex>
</v-layout>

</template>
<script src="./newOrder"></script>
