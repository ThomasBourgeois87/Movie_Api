'use strict';

module.exports = {

    async up(knex) {
        await knex.schema.createTable('movie', (table) => {
            table.increments('id').primary();
            table.string('title').notNullable();
            table.string('description');
            table.string('director');
            table.date('releasedAt').notNullable();

            table.dateTime('createdAt').notNullable().defaultTo(knex.fn.now());
            table.dateTime('updatedAt').notNullable().defaultTo(knex.fn.now());
        });
    },

    async down(knex) {
        await knex.schema.dropTableIfExists('movie');
    }
};
