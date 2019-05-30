const { describe } = require('riteway')
const Server = require('../src/server')

const letter = {
  startLetter: () => 'message-hash',
  appendMessage: () => 'message-hash',
  claimReceipt: () => 'transaction-id',
  getMessages: () => [1]
}

describe('Server', async assert => {
  const server = Server(letter)

  const startResponse = await server.inject({
    method: 'GET',
    url: `/startLetter`
  })

  const appendResponse = await server.inject({
    method: 'GET',
    url: '/appendMessage'
  })

  const claimResponse = await server.inject({
    method: 'GET',
    url: '/claimReceipt'
  })

  const getMessagesResponse = await server.inject({
    method: 'GET',
    url: '/getMessages'
  })

  assert({
    given: 'start request',
    should: 'return message hash',
    actual: JSON.parse(startResponse.body).messageHash,
    expected: letter.startLetter()
  })

  assert({
    given: 'append request',
    should: 'return message hash',
    actual: JSON.parse(appendResponse.body).messageHash,
    expected: letter.appendMessage()
  })

  assert({
    given: 'claim request',
    should: 'return transaction id',
    actual: JSON.parse(claimResponse.body).transactionId,
    expected: letter.claimReceipt()
  })

  assert({
    given: 'get messages request',
    should: 'return revealed messages',
    actual: JSON.parse(getMessagesResponse.body).messages,
    expected: letter.getMessages()
  })
})
