<template>
  <Row>
    <Spin size="large" fix v-if="loading">
      <bl-loader color="green"></bl-loader>
    </Spin>
    <Row type="flex" justify="end">
      <Col span="10">
      <Form :label-width="80" class="m10">
        <FormItem label="Search">
          <Input v-model="filter" placeholder="Search for plants..."></Input>
        </FormItem>
      </Form>
      </Col>
    </Row>
    <Row sm="12" class="col-sm-12">
      <Table stripe :columns="fields" :data="filteredPlants" :height="height" no-data-text="אין מה להציג"></Table>
    </Row>
  </Row>
</template>

<script>
  export default {
    name: 'bl-plants',
    data() {
      return {
        filter: '',
        fields: [{
            key: 'plantNameEng',
            title: 'Name',
            sortable: true,
            sortType: 'asc'
          },
          {
            key: 'plantNameHeb',
            title: 'שם הצמח',
            sortable: true
          },
          {
            key: 'size',
            title: 'Size',
            sortable: true
          },
          {
            key: 'thailand',
            title: 'Thailand',
            sortable: true
          },
           {
            key: 'quantity',
            title: 'Quantity',
            width: 150,
            sortable: true
          },
          {
            title: 'Action',
            key: 'action',
            width: 150,
            align: 'center',
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
                    cursor:'pointer'
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
                    cursor:'pointer'
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
      this.$store.dispatch('loadPlants')
    },
    computed: {
      plants() {
        return this.$store.getters.plants
      },
       loading() {
        return this.$store.getters.loading
      },
      filteredPlants() {
        return this.plants.filter(plant => {
          return plant.plantNameEng.toLowerCase().includes(this.filter.toLowerCase()) ||
            plant.plantNameHeb.toLowerCase().includes(this.filter.toLowerCase()) ||
            plant.size.toLowerCase().includes(this.filter.toLowerCase()) ||
            plant.thailand.toLowerCase().includes(this.filter.toLowerCase())
        })
      },
      height() {
        const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
        return h - 130
      }
    },
    methods: {
      edit(index) {
        console.log('editing', this.plants[index])
      },
      remove(index) {
        console.log('removing', this.plants[index])
      }
    }
  }
</script>

<style scoped>
  input {
    width: 300px;
  }
</style>
