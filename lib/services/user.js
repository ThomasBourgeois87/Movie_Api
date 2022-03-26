'use strict';

const { Service } = require('@hapipal/schmervice');
const Encrypt = require('@thomas_bourgeois/iut-encrypt');

module.exports = class UserService extends Service {

    create(user) {
        const { User } = this.server.models();
        return User.query().insertAndFetch(user);
    }

    getAll() {
        const { User } = this.server.models();
        return User.query();
    }

    delete(id) {
        const { User } = this.server.models();
        return User.query().deleteById(id);
    }

    update(id, user) {
        const { User } = this.server.models();
        return User.query().patchAndFetchById(id, user);
    }

    login(userData) {
        const { User } = this.server.models();

        return User.query().findOne('email', '=', userData.email);
    }
}
