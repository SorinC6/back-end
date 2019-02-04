
exports.up = function(knex, Promise) {

    return knex.schema.createTable('books', tbl => {

        tbl.increments();
    
        tbl.string('title', 355).notNullable().unique();
    
        tbl.string('author', 255).notNullable();

        tbl.string('publisher', 255).notNullable();

        tbl.string('summary', 600);
    
        tbl.timestamp(true, true);
      });
  
};

exports.down = function(knex, Promise) {

    return knex.schema.dropTableIfExists ('books');
    
};
