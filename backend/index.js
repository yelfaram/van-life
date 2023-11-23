import express from "express";
import session from 'express-session';
import cors from "cors";
import 'dotenv/config';
import connection from "./db/connection.js";
import * as vanLife from "./vanLife.js"

// create an express application
const app = express();
const PORT = process.env.PORT || 3000;

// Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served.
app.use(
  cors({
      origin: 'http://localhost:5173',
      credentials: true,
  })
);
// session config
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
// using JSON file from any client to Express
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
})

// ROUTES - LOGIN/LOGOUT
app.post('/login', async (req, res) => {
  const {email, password} = req.body;

  try {
    const hostId = await vanLife.authenticateUser(email, password);
    if (hostId) {
      req.session.hostId = hostId,
      res.json({ success: true, message: 'Login successful'})
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
})

app.get('/logout', async (req, res) => {
  req.session.destroy();
  res.json({ success: true, message: 'Logout successful' });
})

// ROUTES - VANS
app.get('/vans', async (req, res) => {
  try {
    const vans = await vanLife.getVans()
    res.json({ vans })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message });
  }
})

app.get('/vans/:id', async (req, res) => {
  const vanId = req.params.id
  try {
    const van = await vanLife.getVanById(vanId)
    res.json({ van })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message });
  }
})

app.get('/host/vans', async (req, res) => {
  const hostId = req.session.hostId
  try {
    const hostVans = await vanLife.getHostVans(hostId)
    res.json({ hostVans })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message });
  }
})

app.get('/host/vans/:id', async (req, res) => {
  const hostId = req.session.hostId
  const vanId = req.params.id
  try {
    const hostVan = await vanLife.getHostVanById(hostId, vanId)
    res.json({ hostVan })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message });
  }
})


// app listens to 3000 port
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`);
});

//test connection
connection.connect(err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Connected to the database');
});