import * as amqp from 'amqplib'

// 连接 rabbitmq 服务
const connect = await amqp.connect(`amqp://localhost:5672`)
const channel = await connect.createChannel()

const { queue } = await channel.assertQueue('aaa')
channel.consume(queue, msg => {
  console.log('dyk---', msg.content.toString())
}, { noAck: true })
