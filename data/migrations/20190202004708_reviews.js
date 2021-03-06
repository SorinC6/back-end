
exports.up = function(knex, Promise) {

    return knex.schema.createTable('reviews', tbl => {
        tbl.increments();

        tbl.string('review', 600).notNullable();

        tbl.integer('rating').notNullable();

        tbl.string('reviewer', 128).notNullable();

        tbl.integer('books_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('books');

        // tbl.integer('users_id', 128)
        //     .unsigned()
        //     .references('id')
        //     .inTable('users');

        // tbl.string('reviewerName', 255)
        //     .unsigned()
        //     .notNullable()
        //     .references('username')
        //     .inTable('users');

        // tbl.string('titlename', 355)
        //     .unsigned()
        //     .notNullable()
        //     .references('title')
        //     .inTable('books');

        tbl.timestamps(true, true);
    });
  
};

exports.down = function(knex, Promise) {

    return knex.schema.dropTableIfExists ('reviews');
  
};
