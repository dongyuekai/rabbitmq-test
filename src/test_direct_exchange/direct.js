import * as amqp from 'amqplib'

const connect = await amqp.connect(`amqp://localhost:5672`)
const channel = await connect.createChannel()

// direct交换机  把消息放到交换机的指定 key 的队列
await channel.assertExchange('direct-test-exchange', 'direct')

// 不再直接sendToQueue 而是创建一个exchange 然后调用publish往这个exchange发消息
// 其中第二个参数是 routing key 也就是消息路由到哪个队列
channel.publish('direct-test-exchange', 'aaa', Buffer.from('hello1'))
channel.publish('direct-test-exchange', 'bbb', Buffer.from('hello2'))
channel.publish('direct-test-exchange', 'ccc', Buffer.from('hello3'))