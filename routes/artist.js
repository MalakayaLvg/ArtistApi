const { Router } = require('express');
const router = Router();
const {index, create, update, remove, show} = require('../controllers/artist');


router.get('/all', index);
router.post('/create', create);
router.get('/show/:id', show);
router.put('/update/:id', update)
router.delete('/delete/:id', remove);


module.exports = router;