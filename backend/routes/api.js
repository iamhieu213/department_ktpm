const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('API server started!');
})

router.use('/auth' , require('../routes/auth.routes'));
router.use('/apartment' , require('../routes/apartment.routes'));
module.exports = router;

