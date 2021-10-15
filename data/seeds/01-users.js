exports.seed = function(knex) {
  return knex('users')
    .truncate()
    .then(function () {
      return knex('users').insert([
        { username: 'Rick', password: "1234"},
        { username: 'Sara', password: "1234" },
        { username: 'Max', password: "1234"},
      ]);
    });
};
