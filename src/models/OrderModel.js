class OrderModel {
  constructor(orderId = Date.now(), orderDate = '', name = '', plants = []) {
    {
      this.orderId = orderId
      this.orderDate = orderDate
      this.name = name
      this.plants = plants.length
        ? plants
        : [
            {
              hebName: '',
              engName: '',
              quantity: '',
              thaiName: '',
              size: ''
            }
          ]
    }
  }
}

export default OrderModel
