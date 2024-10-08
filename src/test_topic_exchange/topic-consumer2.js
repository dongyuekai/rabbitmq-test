import * as amqp from 'amqplib'

const connect = await amqp.connect(`amqp://localhost:5672`);
const channel = await connect.createChannel();

await channel.assertExchange('topic-test-exchange', 'topic');

const { queue } = await channel.assertQueue('queue2');
await channel.bindQueue(queue, 'topic-test-exchange', 'bbb.*');

channel.consume(queue, msg => {
  console.log('queue2---', msg.content.toString())
}, { noAck: true });

