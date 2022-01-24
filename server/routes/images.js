const router = require("express").Router();
const axios = require("axios");
require("dotenv").config();

router.get("/uploadurl", async function (req, res, next) {
  console.log("url");
  console.log(`Bearer ${process.env.CLOUDFLARE_IMAGES_UPLOAD_TOKEN}`);
  axios({
    method: "post",
    url: "https://api.cloudflare.com/client/v4/accounts/feda017e6233c5789ef75f385d5c0dae/images/v1/direct_upload",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.CLOUDFLARE_IMAGES_UPLOAD_TOKEN}`,
    },
  })
    .then((resp) => {
      console.log("success");
      console.log(resp.data);
      res.status(200).json(resp.data);
    })
    .catch((err) => {
      console.log("error");
      console.log(err);
      res.status(500).json({ message: err });
    });
});

module.exports = router;
