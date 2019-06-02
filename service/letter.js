const cryptoHash = require('crypto-hashing')

const hash = (buffer) => '0x' + cryptoHash('hash256', buffer).toString('hex')

const Letter = (contract) => {
  let messages = {}

  const startLetter = (message, author) => {
    const messageHash = hash(message)

    messages[messageHash] = { message, author, link: null }

    return messageHash
  }

  const appendMessage = (message, link, author) => {
    const messageHash = hash(message)

    messages[messageHash] = { message, author, link }

    return messageHash
  }

  const claimReceipt = async (messageHash, recipient) => {
    const { author, link } = messages[messageHash]

    if (link) {
      if (messages[link]) {
        const { message } = messages[link]

        const { tx } = await contract.revealMessage(author, messageHash, message)

        return tx
      } else {
        throw new Error('message not existing')
      }
    }
  }

  const getMessages = async (owner) => {
    const tokens = await contract.getTokens(owner)

    const messages = await Promise.all(
      tokens.map(
        token => contract.tokenURI(token)
      )
    )

    return messages
  }

  return {
    startLetter,
    appendMessage,
    claimReceipt,
    getMessages
  }
}

module.exports = Letter
