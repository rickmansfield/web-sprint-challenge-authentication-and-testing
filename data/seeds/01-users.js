
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'Rick', password: "1234"},
        { username: 'Sara', password: "1234" },
        { username: 'Max', password: "1234"},
      ]);
    });
};
