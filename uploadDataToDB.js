const data = require('./data')
var admin = require('firebase-admin')

var serviceAccount = require('./balaban-30080-firebase-adminsdk-ef4zn-d55ef6764b.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://balaban-30080.firebaseio.com'
})
const clientsRef = admin.database().ref('clients')
data.clients.forEach(function(client, idx) {
  clientsRef.push().set(client)
  console.log('pushed client:', idx)

}, this)

const plantsRef = admin.database().ref('plants')
data.plants.forEach(function(plant, idx) {
  plantsRef.push().set(plant)
  console.log('pushed plant:', idx)
}, this)
