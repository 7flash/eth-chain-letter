const withAPI = (server, letter) => {
  server.post('/startLetter', async (request, reply) => {
    const { message, author } = JSON.parse(request.body)
    const messageHash = await letter.startLetter(message, author)

    reply.type('application/json').code(200)
    return { messageHash }
  })

  server.post('/appendMessage', async (request, reply) => {
    const { message, link, author } = JSON.parse(request.body)
    const messageHash = await letter.appendMessage(message, link, author)

    reply.type('application/json').code(200)
    return { messageHash }
  })

  server.post('/claimReceipt', async (request, reply) => {
    const { messageHash, recipient } = JSON.parse(request.body)
    const transactionId = await letter.claimReceipt(messageHash, recipient)

    reply.type('application/json').code(200)
    return { transactionId }
  })

  server.post('/getMessages', async (request, reply) => {
    const { owner } = JSON.parse(request.body)

    const messages = await letter.getMessages(owner)

    reply.type('application/json').code(200)
    return { messages }
  })

  return server
}

module.exports = withAPI
