// The user schema should include: `username`, `password` and `department`. The `department` should be a string used to group the users. No need for a `departments` table or setting up relationships.

exports.up = function (knex)
{
  return knex.schema

    .createTable('users', tbl =>
    {
      tbl.increments()
      tbl.string("username", 128).unique().notNullable().index()
      tbl.string("password", 128).notNullable()
      tbl.string('department')
    })
};

exports.down = function (knex)
{
  return knex.schema.dropTableIfExists('users')
};
