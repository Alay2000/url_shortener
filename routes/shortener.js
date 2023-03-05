const express = require("express");
const router = express.Router();
const Shortener = require('../services/Shortener');

router.post('/short_url', async (req, res) => {
    const shortener_obj = new Shortener();
    try {
        const result = await shortener_obj.getShortUrl(req.body.url);
        res.send(result);
    } catch (error) {
        res.send(error.message);
    }
});
router.get('/:url', async (req, res) => {
    const shortener_obj = new Shortener();
    try {
        const url = await shortener_obj.getUrl(req.params.url);
        if (req.params.redirect == 'true') {
            res.redirect(url);
        }
        res.send(url);
    } catch (error) {
        res.send(error.message);
    }
})

module.exports = router;