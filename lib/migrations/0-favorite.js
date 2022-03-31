'use strict';

module.exports = {

    async up(knex) {
        await knex.schema.createTable('favorite', (table) => {
            table.increments('id').primary();
            table.integer('id_user').index().references('id').inTable('movie').notNullable();
            table.integer('id_movie').index().references('id').inTable('user').notNullable();
            table.unique(['id_movie', 'id_user']);
        });
    },

    async down(knex) {
        await knex.schema.dropTableIfExists('favorite');
    }
};
