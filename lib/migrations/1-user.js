'use strict';

module.exports = {

    async up(knex) {
        await knex.schema.alterTable('user', (table) => {
            table.string('username').notNullable();
            table.string('password').notNullable();
            table.string('email').notNullable();
            table.unique('username');
            table.unique('email');
        });
    },

    async down(knex) {
        await knex.schema.alterTable('user', (table) => {
            table.dropColumns(['username', 'password', 'email']);
        });
    }
};
