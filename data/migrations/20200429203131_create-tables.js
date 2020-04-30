exports.up = function (knex) {
    return knex.schema.createTable('users', (tbl) => {
        tbl.increments();
        tbl.string('username', 16).unique().notNullable();
        tbl.string('password', 16).notNullable();
        tbl.string('nation', 16);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users');
};
