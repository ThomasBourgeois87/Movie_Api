'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class UserService extends Service {

    create(user){
        const { User } = this.server.models();
        return User.query().insertAndFetch(user);
    }

    getAll(){

        const { User } = this.server.models();
        return User.query();
    }

    delete(id){
        const { User } = this.server.models();
        return User.query().deleteById(id);
    }
}