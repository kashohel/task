import express, { application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
const port = 400;

const app = express();
app.use(cors());

app.use('/', (req, res) => {
    res.send('Api server is working fine');
})

import taskRoute from './routes/task.js';
app.use('/api', taskRoute);

app.listen(port, () => {
    console.log('Server is running on http://localhost:'+port);
});