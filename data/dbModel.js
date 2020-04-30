const db = require('./dbConfig');

async function getAllUsers() {
    return db('users');
}

// returns newly added user
async function addUser(user) {
    const [id] = await db('users').insert(user, 'id');

    return db('users').where({ id }).first();
}

// returns number of records that were deleted (0 if invalid ID)
async function deleteUser(userId) {
    return db('users').where({ id: userId }).del();
}
module.exports = {
    getAllUsers,
    addUser,
    deleteUser,
};
