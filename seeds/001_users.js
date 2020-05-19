
exports.seed = function (knex)
{
  // Deletes ALL existing entries

  const users = [
    {
      username: 'groot',
      password: 'iamgroot',
      department: "Sales"
    },
    {
      username: 'Aladdin',
      password: 'jasmine',
      department: "Customer Service"
    },
    {
      username: 'pumba',
      password: 'getonit',
      department: "admin"
    },
    {
      username: 'Jafar',
      password: 'i rule',
      department: "Engineering"
    },

  ]

  return knex('users').del()
    .then(function ()
    {
      // Inserts seed entries
      return knex('users').insert(users);
    });
};
