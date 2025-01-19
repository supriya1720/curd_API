const express = require('express');
const app = express();
const itemsRouter = require('./routes/items');

// Middleware for parsing JSON requests
app.use(express.json());

// Correctly use the items router for the `/items` route prefix
app.use('/items', itemsRouter);

// Ensure the server is running on the right port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
