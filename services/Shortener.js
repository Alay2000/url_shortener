const shortid = require("shortid");
const md5 = require('md5');
const URLShortener = require('../Models/URLShortener');

class Shortener {
    #base_url = 'http://localhost:5300/'
    constructor() {
        this.url_obj = new URLShortener();
    }
    async getUrl(short_url) {
        const url = await this.url_obj.getBy({ key: short_url });
        if (!url) throw new Error('URL not found');
        return url.url;
    }
    async getShortUrl(url) {
        if (!this.#validateUrl(url)) {
            throw new Error('Invalid URL');
        }
        const existing_url = await this.#checkExisting(url);
        if (existing_url) return `${this.#base_url}${existing_url.key}`;
        const key = this.#getKey();
        await this.url_obj.insert({
            key,
            url,
            hashed_url: this.#getHash(url),
            count: 1
        });
        return `${this.#base_url}${key}`;
    }
    #getKey() {
        return shortid.generate()
    }
    #getHash(url) {
        return md5(url);
    }
    async #checkExisting(url) {
        return this.url_obj.getBy({ hashed_url: this.#getHash(url) });
    }
    #validateUrl(url) {
        var urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
            '(\\#[-a-z\\d_]*)?$', 'i');

        return urlPattern.test(url);
    }
}
module.exports = Shortener;