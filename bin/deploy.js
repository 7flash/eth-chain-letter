require('dotenv').config()
const { artifacts, ethereum } = require("@nomiclabs/buidler")
const Contract = artifacts.require('Letter')

const main = async () => {
  const { address, transactionHash } = await Contract.new()

  console.log(`🚀 Contract deployed on ${address} (transaction: ${transactionHash})`)

  process.exit(1)
}

main()
