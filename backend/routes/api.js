const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('API server started!');
})

router.use('/auth' , require('../routes/auth.routes'));
router.use('/apartment',require('../routes/apartment.routes'));
router.use('/residents' , require('../routes/residents.routes'));
router.use('/fees', require('../routes/fees.routes'));
router.use('vehicles',require('../routes/vehicles.routes'));

module.exports = router;

