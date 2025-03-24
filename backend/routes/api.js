const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('API server started!');
})

router.use('/auth' , require('../routes/auth.routes'));

module.exports = router;

