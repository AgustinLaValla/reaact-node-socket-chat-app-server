const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => res.send('Server is running'));

module.exports = router;