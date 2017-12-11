import EditModal from './PlantEditModal'
import ConfirmModal from '../ConfirmModal'
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
