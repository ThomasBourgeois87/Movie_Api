'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');
const Encrypt = require('@thomas_bourgeois/iut-encrypt');

module.exports = class User extends Model {

    static get tableName() {

        return 'user';
    }

    static get jsonAttributes() {

        return ['scope'];
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
            lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
            password: Joi.string().min(3).example('azerty1234').description('Password of the user'),
            email: Joi.string().example('hello@hello.fr').description('Email of the user'),
            username: Joi.string().min(8).example('john.doe').description('Username of the user'),
            createdAt: Joi.date(),
            updatedAt: Joi.date(),
            role: Joi.string().default('user').description('Role of the user')
        });
    }

    $beforeInsert(queryContext) {

        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
        this.password = Encrypt.sha1(this.password);
        this.role = this.role === 'admin' ? 'admin' : 'user';
    }

    $beforeUpdate(opt, queryContext) {
        this.updatedAt = new Date();
    }

};
