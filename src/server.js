import { app } from './app.js';

const PORT = 3333;
const HOST = '0.0.0.0'

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});