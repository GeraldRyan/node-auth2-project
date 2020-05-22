const cleaner = require('knex-cleaner')
exports.seed = function (knex)
{
  // Deletes ALL existing entries
  return cleaner
    .clean(knex, {
      mode: 'delete',
      restartIdentity: true,
      ignoreTables: ["knex_migrations", "knex_migrations_lock"]
    })
    .then(() => console.log("\n== all tables truncated, ready to seed ==\n"))
};
