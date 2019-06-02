const { h } = require('hyperapp')

const Response = ({ responses }) => ([
  responses.length > 0 ? [
    h('pre', {}, JSON.stringify(responses[0]))
  ] : h('h3', {}, 'Send your transaction and see result on place of this placeholder')
])

const StartLetter = ({ message, author }, { submit, updateMessage, updateAuthor }) => ([
  h('h3', {}, '1. Start Letter'),
  h('input', {
    type: 'text',
    placeholder: 'Message',
    value: message,
    oninput: updateMessage
  }),
  h('input', {
    type: 'text',
    placeholder: 'Author',
    value: author,
    oninput: updateAuthor
  }),
  h('button', {
    onclick: [submit, {
      message,
      author
    }]
  }, 'Start Letter')
])

const AppendMessage = ({ message, link, author }, { submit, updateMessage, updateLink, updateAuthor }) => ([
  h('h3', {}, '2. Append Message'),
  h('input', {
    type: 'text',
    placeholder: 'Message',
    value: message,
    oninput: updateMessage
  }),
  h('input', {
    type: 'text',
    placeholder: 'Link',
    value: link,
    oninput: updateLink
  }),
  h('input', {
    type: 'text',
    placeholder: 'Author',
    value: author,
    oninput: updateAuthor
  }),
  h('button', {
    onclick: [submit, {
      message,
      link,
      author
    }]
  }, 'Append Message')
])

const ClaimReceipt = ({ messageHash, recipient}, { submit, updateMessageHash, updateRecipient }) => ([
  h('h3', {}, '3. Claim Receipt'),
  h('input', {
    type: 'text',
    placeholder: 'Message hash',
    value: messageHash,
    oninput: updateMessageHash
  }),
  h('input', {
    type: 'text',
    placeholder: 'Recipient',
    value: recipient,
    oninput: updateRecipient
  }),
  h('button', {
    onclick: [submit, {
      messageHash,
      recipient
    }]
  }, 'Claim Receipt')
])

const GetMessages = ({ owner }, { submit, updateOwner }) => ([
  h('h3', {}, '4. Get Messages'),
  h('input', {
    type: 'text',
    placeholder: 'Owner',
    value: owner,
    oninput: updateOwner
  }),
  h('button', {
    onclick: [submit, {
      owner
    }]
  }, 'Get Messages')
])

module.exports = {
  Response, StartLetter, AppendMessage, ClaimReceipt, GetMessages
}
