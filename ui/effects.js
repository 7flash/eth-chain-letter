const { pickBy } = require('ramda')

const BASE_URL = 'http://localhost:3000'

const handler = (path) => (dispatch, payload) =>
  fetch(`${BASE_URL}/${path}`, {
    method: 'POST',
    body: JSON.stringify(
      pickBy((_, key) => key !== 'action')(payload)
    )
  })
    .then(response => response.json())
    .then(response => dispatch(payload.action, response))

const effect = (handler) => (props) => [ handler, props ]

module.exports = {
  startLetter: effect(handler('startLetter')),
  appendMessage: effect(handler('appendMessage')),
  claimReceipt: effect(handler('claimReceipt')),
  getMessages: effect(handler('getMessages'))
}
