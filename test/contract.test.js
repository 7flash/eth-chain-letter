const { describe } = require('riteway')
const { artifacts, ethereum } = require("@nomiclabs/buidler")
const Contract = artifacts.require('Letter')

describe('Contract', async assert => {
  const contract = await Contract.new()

  const bob = '0x95c68e85814ab38d8cf4799b23770e16dd90f6b2'
  const aliceMessageHash = '0xe0a464c9ce56070c4139f5ba542b4eb3d2a1e43b322d1be2908e69f6a5abc981'
  const aliceMessage = 'alice-secret-message'

  const res = await contract.revealMessage(bob, aliceMessageHash, aliceMessage)

  const tokens = await contract.getTokens(bob)

  const messages = await Promise.all(
    tokens.map(
      token => contract.tokenURI(token)
    )
  )

  assert({
    given: 'reveal message',
    should: 'mint token',
    actual: messages,
    expected: [ aliceMessage ]
  })

  process.exit(1)
})
