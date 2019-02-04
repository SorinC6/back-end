
exports.up = function(knex, Promise) {
    return knex.schema.createTable('reviews', tbl => {
        tbl.increments();

        tbl.string('review').notNullable();

        tbl.integer('rating',1).notNullable();

        tbl.integer(books_id).unsigned().notNullable()
            .references('id').inTable('books');

        tbl.integer(users_id).unsigned().notNullable()
            .references('id').inTable('users');

        tbl.string(username).unsigned().notNullable()
        .references('username').inTable('users');

        tbl.string(titlename).unsigned().notNullable().references('title').inTable('books');

        tbl.timestamp(true, true);
    })
  
};

exports.down = function(knex, Promise) {
  
};
