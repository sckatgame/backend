
exports.up = function(knex) {
    return knex.schema.createTable('info_users',function(table){
        table.string('id').notNullable();
        table.string('name').notNullable();
        table.integer('scorre').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('info_users');
};
