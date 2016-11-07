
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', (table) => {
    table.increments();
    table.string('facebook_id');
    table.text('picture');
    table.string('name');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user');
};
