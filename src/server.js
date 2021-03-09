const app = require('./app');
const PORT = 3001;

app.listen(PORT);
console.log('>>>>>>>>>> ', process.env.NODE_ENV);
console.log(`Server running on port ${PORT}`);
