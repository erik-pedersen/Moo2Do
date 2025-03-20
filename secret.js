const express = require("express");
const router = express.Router();

router.get("/", (req,res) => {
    res.send("Sorry pal, no secrets here!")
});

module.exports = router;
