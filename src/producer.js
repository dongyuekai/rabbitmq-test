import * as amqp from 'amqplib'

// 连接 rabbitmq 服务
const connect = await amqp.connect(`amqp://localhost:5672`)
const channel = await connect.createChannel()

// 创建一个aaa的队列 并向队列中发送了一个消息
await channel.assertQueue('aaa')
// await channel.sendToQueue('aaa', Buffer.from('hello'))

// 控制并发数 生产者每0.5s发送一次消息
let i = 1
setInterval(async () => {
  const msg = 'hello===' + i
  console.log('发送消息---', msg)
  await channel.sendToQueue('aaa', Buffer.from(msg))
  i++
}, 500)