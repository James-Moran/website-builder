const router = require("express").Router();

router.use("/users", require("./users"));
router.use("/shops", require("./shops"));
router.use("/images", require("./images"));

module.exports = router;
