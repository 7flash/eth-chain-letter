require('dotenv').config()
const { artifacts, ethereum } = require("@nomiclabs/buidler")
const Contract = artifacts.require('Letter')
const Fastify = require('fastify')
const Letter = require('../service/letter')
const withAPI = require('../service/withAPI')
const withUI = require('../service/withUI')

const { PORT, ADDRESS } = process.env

const main = async () => {
  const fastify = Fastify({ logger: true })

  const contract = await Contract.at(ADDRESS)

  const letter = Letter(contract)

  const server = withUI(
    withAPI(
      fastify,
      letter
    )
  )

  await server.listen(PORT)
}

main()
