import * as amqp from 'amqplib'

const connect = await amqp.connect(`amqp://localhost:5672`)
const channel = await connect.createChannel()

// direct交换机 
await channel.assertExchange('')