
exports.up = function(knex) {
  return knex.schema.createTable('user',function(table){
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('password').notNullable();
      table.string('code').notNullable();
      table.integer('scorre').notNullable();
      table.string('authorization').notNullable();
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('user');
};
