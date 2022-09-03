'use strict';

module.exports = {

    async up(knex) {
        await knex.schema.createTable('favorite', (table) => {
            table.increments('id').primary();
            table.integer('id_user').unsigned().index().references('id').inTable('movie').notNullable();
            table.integer('id_movie').unsigned().index().references('id').inTable('user').notNullable();
        });
    },

    async down(knex) {
        await knex.schema.dropTableIfExists('favorite');
    }
};
