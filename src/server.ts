import app from './main.js';

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server listening on Port: ${port}`);
});
