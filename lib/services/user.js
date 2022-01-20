'use strict';

const { Service } = require('@hapipal/schmervice');
const Encrypt = require('@thomas_bourgeois/iut-encrypt');
const Boom = require('@hapi/boom');
const Jwt = require('@hapi/jwt');

module.exports = class UserService extends Service {
    create( user ) {
        const { User } = this.server.models();
        const { mailService } = this.server.services();

        return User.query()
            .insertAndFetch(user)
            .then((user) => {
                mailService.sendEmail(user.email);
                return user;
            })
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
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        scope: user.role
                    },
                    {
                        key: 'random_string',
                        algorithm: 'HS512'
                    },
                    {
                        ttlSec: 14400 // 4 hours
                    }
                );

                return { login: 'Bearer ' + token };
            })
            .catch( (err) => {
                return err;
            });
    }
};
