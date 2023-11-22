import express from "express";
import cors from "cors";
import 'dotenv/config';

// create an express application
const app = express();

// using JSON file from any client to Express
app.use(express.json());
// Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served.
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
})

// app listens to 3000 port
app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}.`);
});