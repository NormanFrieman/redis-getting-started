const redis = require('redis');
const express = require('express');

(async () => {
    const app = express();

    app.use(express.json());
    const client = redis.createClient();

    client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect();

    app.get('/:term', async (req, res) => {
        const { term } = req.params;
        const value = await client.get(term);
        
        return res.json(value);
    });
    app.post('/', async (req, res) => {
        const { term, value } = req.body;

        await client.set(term, value);
        return res.json();
    })

    app.listen(3333, () => {
        console.log('listening port 3333');
    });
})();