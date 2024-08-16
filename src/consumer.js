import * as amqp from 'amqplib'

// 连接 rabbitmq 服务
const connect = await amqp.connect(`amqp://localhost:5672`)
const channel = await connect.createChannel()

// const { queue } = await channel.assertQueue('aaa')
// channel.consume(queue, msg => {
//   console.log('dyk---', msg.content.toString())
// }, { noAck: true })

// 控制消费者每1s处理一条消息
const { queue } = await channel.assertQueue('aaa')
// 每次最多取回3条消息处理
channel.prefetch(3)

const currentTask = []
channel.consume(queue, msg => { 
  currentTask.push(msg)
  console.log('收到消息---', msg.content.toString())
}, { noAck: false }) // noAck设置为不自动确认 每条消费者收到的消息要确认后才会在MQ里删除，可以收到消息后自动确认，也可以手动确认

setInterval(() => {
  // 把收到的消息放入一个数组中，每 1s 确认一次
  const curMsg = currentTask.pop()
  channel.ack(curMsg)
}, 1000)

