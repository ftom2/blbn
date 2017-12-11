import EditModal from './ClientEditModal'
import ConfirmModal from '../ConfirmModal'
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
