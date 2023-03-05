const BaseModel = require('./BaseModel');

class URLShortener extends BaseModel {
    table_name = 'url_mapping'
    constructor(attrs) {
        super();
        this.key = attrs?.key;
        this.url = attrs?.url;
        this.count = attrs?.count;
        this.secure_protocol = attrs?.secure_protocol;
    }
}

module.exports = URLShortener;