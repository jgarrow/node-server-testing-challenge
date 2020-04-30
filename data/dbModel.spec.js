// it.todo('');
const db = require('./dbConfig'); // configured instance of knex
const DbModel = require('./dbModel');

describe('users model', () => {
    describe('addUser()', () => {
        it('should insert user into the db', async () => {
            await DbModel.addUser({
                username: 'Bolin',
                password: 'fireFerrets4life',
                nation: 'Republic City',
            });

            await DbModel.addUser({
                username: 'Korra',
                password: 'i<3Moko&Asami',
                nation: 'Water Tribe',
            });

            const addedUsers = await db('users');
            expect(addedUsers).toHaveLength(2);
        });

        it('should add a single user', async () => {
            let user = await DbModel.addUser({
                username: 'Moko',
                password: 'i<3Korra&Asami',
                nation: 'Republic City',
            });
            expect(user.username).toBe('Moko');

            user = await DbModel.addUser({
                username: 'Asami',
                password: 'i<3Korra',
                nation: 'Republic City',
            });

            expect(user.username).toBe('Asami');
        });
    });

    describe('deleteUser()', () => {
        it('should remove the specified user', async () => {
            await DbModel.addUser({
                username: 'Bolin',
                password: 'fireFerrets4life',
                nation: 'Republic City',
            });

            await DbModel.addUser({
                username: 'Ginger',
                password: 'i<3Nuktuk',
                nation: 'Republic City',
            });

            await DbModel.deleteUser(2);

            const users = await DbModel.getAllUsers();

            expect(users.find((user) => user.id === 2)).toBeFalse;
        });

        it('should return 0 if an invalid ID is provided', async () => {
            await DbModel.addUser({
                username: 'Amon',
                password: 'equalists4RepublicCity',
                nation: 'Republic City',
            });

            const res = await DbModel.deleteUser(5);

            expect(res).toBe(0);
        });
    });

    describe('getAllUsers()', () => {
        it('should return an array of user objects that have a username and password', async () => {
            await DbModel.addUser({
                username: 'Bolin',
                password: 'fireFerrets4life',
                nation: 'Republic City',
            });

            await DbModel.addUser({
                username: 'Asami',
                password: 'i<3Korra',
                nation: 'Republic City',
            });

            const users = await DbModel.getAllUsers();
            const userKeys = await users.map((user) => {
                return Object.keys(user);
            });

            userKeys.forEach((userKeysObject) => {
                expect(userKeysObject).toContain('username');
                expect(userKeysObject).toContain('password');
            });
        });

        it('should return an array', async () => {
            const users = await DbModel.getAllUsers();

            expect(users).toHaveLength(0);
        });
    });
});

beforeEach(async () => {
    // this function executes and clears out the table before each test
    await db('users').truncate();
});
