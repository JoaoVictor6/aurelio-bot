import express from 'express';

const server = express();
const port = process.env.PORT as unknown as number || 80;
server.listen(port, () => {
  console.log('Listening on port %d', port);
});
