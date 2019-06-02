const path = require('path')

const withUI = (fastify) => {
  fastify.register(require('fastify-static'), {
    root: path.join(__dirname, '..', 'dist'),
  })

  return fastify
}

module.exports = withUI
