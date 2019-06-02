const { artifacts, ethereum } = require("@nomiclabs/buidler");
const { describe } = require('riteway')
const R = require('ramda')
const LetterChain = require('../service/letter')

const contract = (() => {
  let hashes = {}
  let messages = {}

  const revealMessage = (to, hash, message) => {
    if (!hashes[to]) hashes[to] = []
    hashes[to].push(hash)
    messages[hash] = message
    return { tx: 'transaction-hash' }
  }

  const getTokens = (owner) => hashes[owner]

  const tokenURI = (hash) => messages[hash]

  return { revealMessage, getTokens, tokenURI }
})()

describe('Letter', async assert => {
  const letter = LetterChain(contract)

  const [ alice, bob, calvin, deckart, service ] = await ethereum.send("eth_accounts")

  const aliceMessage = 'alice-secret-message'
  const bobMessage = 'bob-secret-message'

  // Alice create a new message
  const aliceMessageHash = await letter.startLetter(aliceMessage, alice)

  // Bob claims receipt of the message from Alice
  await letter.claimReceipt(aliceMessageHash, bob)

  // Bob crafts his own message
  const bobMessageHash = await letter.appendMessage(bobMessage, aliceMessageHash, bob)

  // Calvin claims receipt of Bob's message
  await letter.claimReceipt(bobMessageHash, calvin)

  // Service has minted token for Bob revealing the message of Alice
  assert({
    given: 'Calvin claimed receipt of message from Bob',
    should: 'Token revealing message of Alice minted for Bob',
    actual: await letter.getMessages(bob),
    expected: [ aliceMessage ]
  })
})
