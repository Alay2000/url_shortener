const _ = require('lodash');
const db = require('../middleware/database');

/**
 * @template {Record<string,any>} RecordBuilder
 */
class BaseModel {
    /** @type {string} */
    table_name;

    /** @type {number} */
    id;


    /**
     * @param {Partial<RecordBuilder>} identifier
     * @returns {Promise<this>}
     */
    async getBy(identifier) {
        let result = await db(this.table_name)
            .where(identifier)
            .first();

        return result;
    }

    /**
     * @param {Partial<RecordBuilder>} params
     * @param {Knex.Transaction} [trx]
     * @return {Promise<number>} Row ID
     */
    async insert(params, trx) {
        let attrs = this.serialize(params);
        let query = null;
        if (trx) {
            query = db(this.table_name)
                .transacting(trx).insert(attrs);
        } else {
            query = db(this.table_name)
                .insert(attrs);
        }

        [this.id] = await query;
        return this.id;
    }

    /**
     * @param {number} id
     * @param {object} params
     * @param {Knex.Transaction} [trx]
     * @returns {Promise<number>} Number of updated rows
     */
    async update(id, params, trx = null) {
        if (Object.keys(params).length === 0) return 0;
        if (!id) throw new Error(`Missing id for update operation for table: ${this.table_name}`);
        const attrs = this.serialize(params);
        let query = null;
        if (trx) {
            query = db(this.table_name)
                .where('id', id)
                .update(attrs);
        } else {
            query = db(this.table_name)
                .where('id', id)
                .update(attrs);
        }
        const result = await query;
        return result;
    }

    /**
     * @param {Partial<RecordBuilder>} builder
     * @returns {Partial<Record<keyof RecordBuilder, any>>}
     */
    serialize(builder) {
        // @ts-ignore
        return _.omitBy(builder, _.isUndefined);
    }

}

module.exports = BaseModel;
