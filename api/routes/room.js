import express from 'express';

const router = express.Router();

router.post('/rooms', (req, res) => {
    res.send('Hello World! from rooms');
    });

export default router;