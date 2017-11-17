<template>
  <Row>
    <div v-if="editMode">
      <edit-modal :ok="okMethod" :cancel="cancel" :data="selectedClient"></edit-modal>
    </div>
    <Spin size="large" fix v-if="loading">
      <bl-loader color="green"></bl-loader>
    </Spin>
    <Row type="flex" justify="end">
      <Col span="2">
      <Button type="primary" class="m10" @click="newClient">New Client</Button>
      </Col>
      <Col span="10">
      <Form :label-width="80" class="m10">
        <FormItem label="Search">
          <Input v-model="filter" placeholder="Search for clients..."></Input>
        </FormItem>
      </Form>
      </Col>
    </Row>
    <Row sm="12" class="col-sm-12">
      <Table stripe :columns="fields" :data="filteredClients" :height="height" no-data-text="אין מה להציג"></Table>
    </Row>
  </Row>
</template>

<script>
  import EditModal from './EditModal'
  export default {
    name: 'bl-clients',
    data() {
      return {
        selectedClientIndex: null,
        selectedClient: {},
        editMode: false,
        filter: '',
        okMethod: function() {},
        fields: [{
            key: 'hebName',
            title: 'שם המשתלה',
            sortable: true,
            sortType: 'asc'
          },
          {
            key: 'engName',
            title: 'Name',
            sortable: true
          },
          {
            key: 'location',
            title: 'מיקום',
            sortable: true
          },
          {
            title: 'Actions',
            key: 'actions',
            width: 130,
            align: 'left',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    icon: 'edit',
                    shape: 'circle'
                  },
                  style: {
                    marginRight: '15px',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.edit(params.index)
                    }
                  }
                }),
                h('Button', {
                  props: {
                    type: 'error',
                    icon: 'trash-a',
                    shape: 'circle'
                  },
                  style: {
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                })
              ])
            }
          }
        ]
      }
    },
    created() {
      this.$store.dispatch('loadClients')
    },
    computed: {
      clients() {
        return this.$store.getters.clients
      },
      loading() {
        return this.$store.getters.loading
      },
      filteredClients() {
        return this.clients.filter(client => {
          return client.hebName.toLowerCase().includes(this.filter.toLowerCase()) ||
            client.engName.toLowerCase().includes(this.filter.toLowerCase()) ||
            client.location.toLowerCase().includes(this.filter.toLowerCase())
        })
      },
      height() {
        const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
        return h - 130
      }
    },
    methods: {
      update(data) {
        this.editMode = false
        this.$store.dispatch('updateClient', data)
        this.selectedClient = null
        this.selectedClientIndex = null
      },
      create(data) {
        this.editMode = false
        this.$store.dispatch('createClient', data)
      },
      cancel() {
        this.editMode = false
      },
      edit(index) {
        this.okMethod = this.update
        this.editMode = true
        this.selectedClient = this.clients[index]
        this.selectedClientIndex = index
      },
      newClient() {
        this.okMethod = this.create
        this.editMode = true
        this.selectedClient = null
      },
      remove(index) {
        this.$Modal.confirm({
          title: 'Delete Client',
          content: `<p>Are you sure you want to delete <strong>${this.clients[index].engName}</strong>?</p>`,
          loading: true,
          okText: 'Yes',
          cancelText: 'Cancel',
          onOk: () => {
            const id = this.clients[index].id
            return this.$store.dispatch('deleteClient', id).then(() => {
              this.$Modal.remove()
              this.$Message.info('Client was deleted')
          })
          }
        })
      }
    },
    components: {
      EditModal
    }
  }
</script>

<style scoped>

</style>
