const { Router } = require('express');
const router = Router();
const {index, addRelease, remove, update} = require("../controllers/release");

router.get("/all", index);
router.post("/add/:artistId", addRelease);
router.delete("/delete/:artistId", remove)
router.put("/edit/:artistId", update)

module.exports = router;