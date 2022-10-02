const amqp = require('amqplib')

async function sendMsg () {
  const exchangeName = 'logs'

  const connection = await amqp.connect('amqp://localhost:5672')
  const channel = await connection.createChannel()
  await channel.assertExchange(exchangeName, 'fanout', { durable: true })
  channel.publish(exchangeName, '', Buffer.from('Hey Puppet'))

  setTimeout(() => {
    connection.close()
    process.exit(0)
  })
}

sendMsg()
