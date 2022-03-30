'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Movie extends Model {

    static get tableName() {
        return 'movie';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            title: Joi.string().min(3).example('Iron man').description('Title of the movie').required(),
            description: Joi.string().max(1500).example('Tony Stark the best').description('Description of the movie'),
            director: Joi.string().min(3).example('Jon Favreau').description('Name of the director'),
            releasedAt: Joi.date().example('2008-04-30').description('Released date of the movie').required(),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    $beforeInsert(queryContext) {
        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
    }

    $beforeUpdate(opt, queryContext) {
        this.updatedAt = new Date();
    }

};
