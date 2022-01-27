const router = require("express").Router();

var multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { uploadFile, generateUploadURL } = require("../s3");

const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

router.get("/uploadurl", async (req, res, next) => {
  await generateUploadURL()
    .then((result) => {
      res.send({ success: true, url: result });
    })
    .catch((err) => {
      res.send({ success: false });
    });
});

router.post("/upload", upload.single("image"), async (req, res, next) => {
  await uploadFile(req.file)
    .then((result) => res.send({ success: true, location: result.Location }))
    .then(() => {
      unlinkFile(req.file.path);
    })
    .catch((err) => {
      console.log(err);
      unlinkFile(req.file.path);
      res.send({ success: false });
    });
});

module.exports = router;
