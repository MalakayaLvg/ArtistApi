const { Router } = require('express');
const router = Router();
const {index, addRelease, remove, update} = require("../controllers/release");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/all", index);
router.post("/add/:artistId",authMiddleware, addRelease);
router.delete("/delete/:artistId",authMiddleware, remove);
router.put("/edit/:artistId",authMiddleware, update);

module.exports = router;