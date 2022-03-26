'use strict';

const { Service } = require('@hapipal/schmervice');
const Encrypt = require('@thomas_bourgeois/iut-encrypt');
const Boom = require('@hapi/boom');
const Jwt = require('@hapi/jwt');

module.exports = class UserService extends Service {

    create( user ) {
        const { User } = this.server.models();
        return User.query()
            .insertAndFetch(user)
            .catch((err) => {
                return err;
            });
    }

    getAll() {
        const { User } = this.server.models();
        return User.query()
            .catch( (err) => {
                return err;
            });
    }

    delete(id) {
        const { User } = this.server.models();
        return User.query()
            .deleteById(id)
            .then( ( requestResult ) => {
                if ( requestResult ) {
                    return '';
                }

                return Boom.notFound('User with id = ' + id + ' not found.');
            })
            .catch( ( err ) => {
                return err;
            });
    }

    update(id, user) {
        const { User } = this.server.models();
        return User.query()
            .patchAndFetchById(id, user)
            .then( ( requestResult ) => {
                if ( requestResult ) {
                    return '';
                }

                return Boom.notFound('User with id = ' + id + ' not found.');
            })
            .catch( ( err ) => {
                return err;
            });
    }

    login(userData) {
        const { User } = this.server.models();

        return User.query()
            .findOne('email', '=', userData.email)
            .then( ( user ) => {
                if ( !user ) {
                    return Boom.unauthorized('User not found.');
                }

                if ( !Encrypt.compareSha1(userData.password, user.password) ) {
                    return Boom.unauthorized('Wrong password.');
                }

                const token = Jwt.token.generate(
                    {
                        aud: 'urn:audience:iut',
                        iss: 'urn:issuer:iut',
                        firstName: 'John',
                        lastName: 'Doe',
                        email: 'test@example.com'
                    },
                    {
                        key: 'random_string',
                        algorithm: 'HS512'
                    },
                    {
                        ttlSec: 14400 // 4 hours
                    }
                );

                return token;
            })
            .catch( (err) => {
                return err;
            });
    }
};
