const router = require("express").Router();

router.use("/api/users", require("./users"));
router.use("/api/shops", require("./shops"));
router.use("/api/images", require("./images"));

module.exports = router;
