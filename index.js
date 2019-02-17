import app from './src/express-app';
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`App listenings on port ${port}!`));