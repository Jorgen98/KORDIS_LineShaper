const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
const Pool = require('pg').Pool;

// .env file include
dotenv.config();
// CORS setup
app.use(cors());

const dbPoint = require('./mapPoint.js');
const dbRoutingData = require('./routingData.js');

// DB connection established
const db = new Pool({
    user: process.env.DB_USER,
    host: '172.25.182.3',
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  })

app.get('/mapStats', async (req, res) => {
    res.send(await dbPoint.getStats(db));
    });

app.delete('/layer', async (req, res) => {
    res.send(await dbPoint.deleteLayer(db, req.query));
    });

// Map points CRUD operations
app.get('/mapPoint', async (req, res) => {
        res.send(await dbPoint.getPoint(db, req.query));
    })
    .post('/mapPoint', async (req, res) => {
        res.send(await dbPoint.createPoint(db, req.query));
    })
    .put('/mapPoint', async (req, res) => {
        res.send(await dbPoint.updatePoint(db, req.query));
    })
    .delete('/mapPoint', async (req, res) => {
        res.send(await dbPoint.deletePoint(db, req.query));
    });

app.post('/createPoints', async (req, res) => {
        res.send(await dbPoint.createPoints(db, req.query));
    })

app.get('/pointsInRad', async (req, res) => {
        res.send(await dbPoint.getPointsInRad(db, req.query));
    })

app.get('/pointsByGid', async (req, res) => {
        res.send(await dbPoint.getPointsByGID(db, req.query));
    })

app.put('/changeDirection', async (req, res) => {
        res.send(await dbPoint.changeDirection(db, req.query));
    })

app.delete('/section', async (req, res) => {
    res.send(await dbPoint.deleteSection(db, req.query));
})

// Clean data in stop, line or line code tables
app.post('/clearRoutingData', async (req, res) => {
    res.send(await dbRoutingData.clearData(db, req.query));
})

// Import stop data
app.post('/createStops', async (req, res) => {
    res.send(await dbRoutingData.createStops(db, req.query));
})

// Import line data
app.post('/saveLines', async (req, res) => {
    res.send(await dbRoutingData.saveLines(db, req.query));
})

// Get stop and its info around some point
app.get('/stopsInRad', async (req, res) => {
    res.send(await dbRoutingData.getStopsInRad(db, req.query));
})

// Get lines info
app.get('/lines', async (req, res) => {
    res.send(await dbRoutingData.getLines(db, req.query));
})

// Get route based on stop codes
app.get('/route', async (req, res) => {
    res.send(await dbRoutingData.getRoute(db, req.query));
})

// Get whole line route based on code and direction
app.get('/lineRoute', async (req, res) => {
    res.send(await dbRoutingData.getLineRoute(db, req.query));
})

// Running API itself
app.listen(process.env.API_PORT, async () => {
    // Try to connect
    try {
        await db.connect();
    } catch(error) {
        console.log(error);
        return false;
    }

    // API is ready
    console.log(`App listening on port ${process.env.API_PORT}`);
})