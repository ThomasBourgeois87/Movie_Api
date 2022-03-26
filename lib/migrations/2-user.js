'use strict';

module.exports = {

    async up(knex) {
        await knex.schema.alterTable('user', (table) => {
            table.string('role').notNullable().defaultTo('user');
        });
    },

    async down(knex) {
        await knex.schema.alterTable('user', (table) => {
            table.dropColumns(['role']);
        });
    }
};
