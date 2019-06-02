const { h, app } = require('hyperapp')

const state = require('./state')
const actions = require('./actions')
const { Response, StartLetter, AppendMessage, ClaimReceipt, GetMessages } = require('./components')

app({
  init: () => state,
  view: state =>
    h('section', {}, [
      h('h2', {}, 'Letter Chain'),
      h('hr'),
      h('div', {}, [
        Response({
          responses: state.responses
        }),
        h('hr'),
        StartLetter({
          message: state.startLetter.message,
          author: state.startLetter.author
        }, {
          submit: actions.startLetter,
          updateMessage: actions.update('startLetter', 'message'),
          updateAuthor: actions.update('startLetter', 'author')
        }),
        h('hr'),
        AppendMessage({
          message: state.appendMessage.message,
          link: state.appendMessage.link,
          author: state.appendMessage.author
        }, {
          submit: actions.appendMessage,
          updateMessage: actions.update('appendMessage', 'message'),
          updateLink: actions.update('appendMessage', 'link'),
          updateAuthor: actions.update('appendMessage', 'author')
        }),
        h('hr'),
        ClaimReceipt({
          messageHash: state.claimReceipt.messageHash,
          recipient: state.claimReceipt.recipient
        }, {
          submit: actions.claimReceipt,
          updateMessageHash: actions.update('claimReceipt', 'messageHash'),
          updateRecipient: actions.update('claimReceipt', 'recipient')
        }),
        h('hr'),
        GetMessages({
          owner: state.getMessages.owner
        }, {
          submit: actions.getMessages,
          updateOwner: actions.update('getMessages', 'owner')
        })
      ])
    ]),
  node: document.getElementById("app")
})
