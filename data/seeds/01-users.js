exports.seed = function (knex) {
    // Resets ALL existing entries
    return knex('users')
        .truncate()
        .then(function () {
            // Inserts seed entries
            return knex('users').insert([
                {
                    username: 'Korra',
                    password: 'i<3naaga',
                    nation: 'Water Tribe',
                },
            ]);
        });
};
