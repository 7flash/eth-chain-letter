const { mergeDeepRight } = require('ramda')
const effects = require('./effects')

const handleResponse = (state, response) =>
  mergeDeepRight(state, {
    responses: [response, ...state.responses]
  })

const startLetter = (state, { message, author }) => [
  state,
  effects.startLetter({
    message, author,
    action: handleResponse
  })
]

const appendMessage = (state, { message, link, author }) => [
  state,
  effects.appendMessage({
    message, link, author,
    action: handleResponse
  })
]

const claimReceipt = (state, { messageHash, recipient }) => [
  state,
  effects.claimReceipt({
    messageHash, recipient,
    action: handleResponse
  })
]

const getMessages = (state, { owner }) => [
  state,
  effects.getMessages({
    owner,
    action: handleResponse
  })
]

const update = (form, field) => (state, event) =>
  mergeDeepRight(state, {
    [form]: {
      [field]: event.target.value
    }
  })

module.exports = {
  startLetter, appendMessage, claimReceipt, getMessages, update
}
