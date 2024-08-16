// headers交换机把消息放到交换机的满足某些 header 的队列

import * as amqp from 'amqplib'

const connect = await amqp.connect(`amqp://localhost:5672`);
const channel = await connect.createChannel();

await channel.assertExchange('headers-test-exchange', 'headers');

channel.publish('headers-test-exchange', '', Buffer.from('hello1'), {
  headers: {
    name: 'dong'
  }
});
channel.publish('headers-test-exchange', '', Buffer.from('hello2'), {
  headers: {
    name: 'dong'
  }
});
channel.publish('headers-test-exchange', '', Buffer.from('hello3'), {
  headers: {
    name: 'dong'
  }
});

