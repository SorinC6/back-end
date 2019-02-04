
exports.up = function(knex, Promise) {

    return knex.schema.createTable('users', tbl => {
      
        tbl.increments();
    
        tbl.string('username', 255).notNullable().unique();
    
        tbl.string('password', 355).notNullable();
        // .unique();

        // tbl.string('passwordConfirm', 355).notNullable().unique();
    
        tbl.integer('role', 1).notNullable();
        // const { admin patron guest user } = possible Roles; 
        // user is 0 and admin  true
        // false 0 empty string nan
    
        tbl.timestamp(true, true);
      });
  
};

exports.down = function(knex, Promise) {

  return knex.schema.dropTableIfExists ('users');
  
};
