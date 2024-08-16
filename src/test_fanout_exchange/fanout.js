// fanout把消息广播到这个交换机的所有 Queue

import * as amqp from 'amqplib'

const connnect = await amqp.connect(`amqp://localhost:5672`)
const channel = await connnect.createChannel()

await channel.assertExchange('fanout-text-exchange', 'fanout')
channel.publish('fanout-text-exchange', '', Buffer.from('hello1'))
channel.publish('fanout-text-exchange', '', Buffer.from('hello2'))
channel.publish('fanout-text-exchange', '', Buffer.from('hello3'))