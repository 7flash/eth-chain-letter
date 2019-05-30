const Fastify = require('fastify')

const Server = (letter) => {
  const fastify = Fastify({ logger: true })

  fastify.get('/startLetter', async (request, reply) => {
    const { message, author } = request.query
    const messageHash = await letter.startLetter(message, author)

    reply.type('application/json').code(200)
    return { messageHash }
  })

  fastify.get('/appendMessage', async (request, reply) => {
    const { message, link, author } = request.query
    const messageHash = await letter.appendMessage(message, link, author)

    reply.type('application/json').code(200)
    return { messageHash }
  })

  fastify.get('/claimReceipt', async (request, reply) => {
    const { messageHash, recipient } = request.query
    const transactionId = await letter.claimReceipt(messageHash, recipient)

    reply.type('application/json').code(200)
    return { transactionId }
  })

  fastify.get('/getMessages', async (request, reply) => {
    const { owner } = request.query

    const messages = await letter.getMessages(owner)

    reply.type('application/json').code(200)
    return { messages }
  })

  return fastify
}

module.exports = Server
