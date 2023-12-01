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

// ROUTES - LOGIN/LOGOUT/REGISTER
app.post('/login', async (req, res) => {
  const {email, password, userType} = req.body;

  try {
    const result = await vanLife.authenticateUser(email, password, userType);
    const user = result.user;

    if (user) {
      if (userType === "host") {
        req.session.hostId = user.owner_id;
      } else if (userType === "renter") {
        req.session.renterId = user.renter_id;
      }

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

app.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, userType } = req.body;

  try {
    const result = await vanLife.authenticateUser(email, password, userType);
    const user = result.user;

    if (user) {
      res.status(409).json({ success: false, message: 'User already exists with that email'})
      return;
    } 

    let msg
    if (userType === "host") {
      msg = await vanLife.insertOwner(email, password, firstName, lastName)
    } else if (userType === "renter") {
      msg = await vanLife.insertRenter(email, password, firstName, lastName)
    }

    res.json({ success: true, message: msg })
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
})

// ROUTES - RENTALS
app.get('/rentals', async (req, res) => {
  try {
    let email = ""

    if (req.session.hostId) {
      const host = await vanLife.getHostById(req.session.hostId)
      email = host.user.email
    } else if (req.session.renterId) {
      const renter = await vanLife.getRenterById(req.session.renterId)
      email = renter.user.email
    }
    const result = await vanLife.getUserRentals(email)
    const rentals = result.rentals
    res.json({ rentals })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message });
  }
})

app.post('/rentals/review', async (req, res) => {
  const { email, vanId, rating, description } = req.body;

  try {
    const msg = await vanLife.insertReview(email, vanId, rating, description);
    res.json({ success: true, message: msg })
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
})

// ROUTES - VANS
app.get('/vans', async (req, res) => {
  try {
    let result
    if (req.session.hostId) {
      result = await vanLife.getAvailableVansForHost(req.session.hostId)
    } else if (req.session.renterId) {
      result = await vanLife.getAvaliableVansForRenter()
    } else {
      result = await vanLife.getVans()
    }
    const vans = result.vans
    res.json({ vans })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message });
  }
})

app.get('/vans/:id', async (req, res) => {
  const vanId = req.params.id

  try {
    const result = await vanLife.getVanById(vanId)
    const van = result.van

    res.json({ van })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message });
  }
})

app.post('/vans/:id/rent', async (req, res) => {
  const vanId = req.params.id

  
  let email = ""
  if (req.session.hostId) {
    const host = await vanLife.getHostById(req.session.hostId)
    email = host.user.email
  } else if (req.session.renterId) {
    const renter = await vanLife.getRenterById(req.session.renterId)
    email = renter.user.email
  }
  
  const { totalCost, startDate, endDate } = req.body

  try {
    const msg = await vanLife.insertRental(vanId, email, totalCost, startDate, endDate)
    res.json({ success: true, message: msg })
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
})

app.get('/host/vans', async (req, res) => {
  const hostId = req.session.hostId

  try {
    const result = await vanLife.getHostVans(hostId)
    const hostVans = result.hostVans
    
    res.json({ hostVans })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message });
  }
})

app.get('/host/vans/rented', async (req, res) => {
  const hostId = req.session.hostId
  try {
    const result = await vanLife.getHostRentedVans(hostId)
    const hostRentedVans = result.hostRentedVans

    res.json({ hostRentedVans })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message });
  }
})

app.get('/host/vans/:id', async (req, res) => {
  const hostId = req.session.hostId
  const vanId = req.params.id

  try {
    const result = await vanLife.getHostVanById(hostId, vanId)
    const hostVan = result.hostVan

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