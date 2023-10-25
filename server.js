const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose(); 
const app = express();
const port = 4000;

app.use(bodyParser.json());

const db = new sqlite3.Database('chat.db');

db.run(`
  CREATE TABLE IF NOT EXISTS chat_transcripts (
    id INTEGER PRIMARY KEY,
    sender TEXT,
    receiver TEXT,
    message TEXT
  )
`);

function addLinksToConversation(conversation) {
  return {
    ...conversation,
    links: [
      { rel: 'self', href: `/conversations/${conversation.id}` },
      { rel: 'update', href: `/conversations/${conversation.id}`, method: 'PUT' },
      { rel: 'delete', href: `/conversations/${conversation.id}`, method: 'DELETE' },
      { rel: 'all-conversations', href: '/conversations' },
    ],
  };
}
app.post('/conversations', (req, res) => {
  const { sender, receiver, message } = req.body;
  
  db.run(
    'INSERT INTO chat_transcripts (sender, receiver, message) VALUES (?, ?, ?)',
    [sender, receiver, message],
    function(err) {
      if (err) {
        res.status(500).json({ error: 'Error creating conversation' });
      } else {
        res.status(201).json(addLinksToConversation({
          id: this.lastID, 
          sender,
          receiver,
          message,
        }));
      }
    }
  );
});

app.get('/conversations/:id', (req, res) => {
    const id = req.params.id;
  
    db.get('SELECT * FROM chat_transcripts WHERE id = ?', [id], (err, row) => {
      if (err) {
        res.status(500).send('Error retrieving conversation');
      } else if (row) {
        const formattedMessage = `${row.sender}: ${row.message}\n`;
        res.send(formattedMessage);
      } else {
        res.status(404).send('Conversation not found');
      }
    });
  });
  app.get('/conversations', (req, res) => {
    db.all('SELECT * FROM chat_transcripts', (err, rows) => {
      if (err) {
        res.status(500).send('Error retrieving conversations');
      } else {
        const conversationText = rows.map(row => `${row.sender}: ${row.message}\n\n`).join('');
        res.send(conversationText);
      }
    });
  });
app.put('/conversations/:id', (req, res) => {
  const id = req.params.id;
  const { sender, receiver, message } = req.body;
  
  db.run(
    'UPDATE chat_transcripts SET sender = ?, receiver = ?, message = ? WHERE id = ?',
    [sender, receiver, message, id],
    function(err) {
      if (err) {
        res.status(500).json({ error: 'Error updating conversation' });
      } else if (this.changes > 0) {
        res.json(addLinksToConversation({ id, sender, receiver, message }));
      } else {
        res.status(404).json({ error: 'Conversation not found' });
      }
    }
  );
});
app.delete('/conversations/:id', (req, res) => {
  const id = req.params.id;
  
  db.run('DELETE FROM chat_transcripts WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ error: 'Error deleting conversation' });
    } else if (this.changes > 0) {
      res.json(addLinksToConversation({ id }));
    } else {
      res.status(404).json({ error: 'Conversation not found' });
    }
  });
});

app.listen(port, () => {
  console.log(`Chat Transcripts API is listening on port ${port}`);
});
