<template>
  <Modal :value="true" title="Edit" @on-ok="done" @on-cancel="cancel" :ok-text="okText" cancel-text="Cancel">
    <Form>
      <FormItem label="English Name">
        <Input v-model="item.engName" placeholder="English Name">
        </Input>
      </FormItem>
      <FormItem label="Hebrew Name">
        <Input v-model="item.hebName" placeholder="Hebrew Name">
        </Input>
      </FormItem>
      <FormItem label="Location">
        <Input v-model="item.location" placeholder="Location">
        </Input>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
  export default {
    name: 'edit-modal',
    props: ['ok', 'cancel', 'data'],
    data() {
      return {
        item: {}
      }
    },
    created() {
      if (this.data) {
        this.item = { ...this.data
        }
      } else {
        this.item = {
          engName: '',
          hebName: '',
          location: ''
        }
      }
    },
    computed: {
      okText() {
        return this.data ? 'Update' : 'Save'
      }
    },
    methods: {
      done() {
        this.ok(this.item)
        this.$Modal.remove()
      }
    }
  }
</script>

<style scoped>

</style>
