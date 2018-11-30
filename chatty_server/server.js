const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v4');

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.on('connection', (ws) => {

  const size = { 
    content: `There are ${wss.clients.size} users online.`,
    type: 'clientsSize'
  }
  wss.clients.forEach(client => {
    client.send(JSON.stringify(size));
  })

  ws.on('message', (message) => {
    const msg = JSON.parse(message);
    let msgObj;
    if (msg.type === 'message') {
      msgObj = userMessage(msg);
    } else if (msg.type === 'notification') {
      msgObj = notification(msg);
    }
    wss.clients.forEach((client) => {
      client.send(JSON.stringify(msgObj));
    })
    
  });

  ws.on('close', () => {
    wss.clients.forEach(client => {
      const size = { 
        content: `There are ${wss.clients.size} users online.`,
        type: 'clientsSize'
      }
      client.send(JSON.stringify(size));
    })
    
  });

  function userMessage({ username, content }){
    const msgObj = {
      id: uuid(),
      username,
      content,
      type: 'message'
    }
    if(msgObj.content.length > 0){
      return msgObj;
    }
  }

  function notification({ content }){
    const msgObj = {
      id: uuid(),
      content,
      type: 'notification'
    }
    return msgObj;
  }
});