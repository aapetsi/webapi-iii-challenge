// code away!
const express = require('express');

const app = express();

app.use(express.json());

const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
