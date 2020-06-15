exports.up = function(knex) {
  knex.schema.creatTable('contacts', function(table) {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('surname');
    table.string('telephone').notNullable();
    table.string('email');
  });
};

exports.down = function(knex) {
  knex.schema.creatTable('contacts');
};
