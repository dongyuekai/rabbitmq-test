import * as amqp from 'amqplib'

const connect = await amqp.connect(`amqp://localhost:5672`);
const channel = await connect.createChannel();

await channel.assertExchange('topic-test-exchange', 'topic');

// 生产者端创建叫topic-test-exchange的topic类型的交换机 然后发三条消息
channel.publish('topic-test-exchange', 'aaa.1', Buffer.from('hello1'));
channel.publish('topic-test-exchange', 'aaa.2', Buffer.from('hello2'));
channel.publish('topic-test-exchange', 'bbb.1', Buffer.from('hello3'));


// topic 交换机 把消息放到交换机的指定 key 的队列，支持模糊匹配