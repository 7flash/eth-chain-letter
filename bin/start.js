require('dotenv').config()
const { artifacts, ethereum } = require("@nomiclabs/buidler")
const Contract = artifacts.require('Letter')
const Letter = require('../src/letter')
const Server = require('../src/server')

const { PORT, ADDRESS } = process.env

const main = async () => {
  const contract = await Contract.at(ADDRESS)

  const server = Server(
    Letter(contract)
  )

  await server.listen(PORT)
}

main()
