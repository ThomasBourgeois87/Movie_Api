'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');
const Encrypt = require("@thomas_bourgeois/iut-encrypt");
const Jwt = require("@hapi/jwt");

module.exports = class MovieService extends Service {

    create(movie) {
        const { Movie } = this.server.models();

        return Movie.query().insertAndFetch(movie)
            .catch((err) => {
                return err;
            });
    }

    delete(id) {
        const { Movie } = this.server.models();
        return Movie.query()
            .deleteById(id)
            .then( ( requestResult ) => {
                if ( requestResult ) {
                    return '';
                }

                return Boom.notFound('Movie with id = ' + id + ' not found.');
            })
            .catch( ( err ) => {
                return err;
            });
    }

    update(id, user) {
        const { Movie } = this.server.models();
        return Movie.query()
            .patchAndFetchById(id, user)
            .then( ( requestResult ) => {
                if ( requestResult ) {
                    return '';
                }

                return Boom.notFound('Movie with id = ' + id + ' not found.');
            })
            .catch( ( err ) => {
                return err;
            });
    }

    getAll() {
        const { Movie } = this.server.models();
        return Movie.query()
            .catch( (err) => {
                return err;
            });
    }

    getById(id) {
        const { Movie } = this.server.models();

        return Movie.query()
            .findById(id)
            .then( ( requestResult ) => {
                if ( requestResult ) {
                    return requestResult;
                }

                return Boom.notFound('Movie with id = ' + id + ' not found.');
            })
            .catch( ( err ) => {
                return err;
            });
    }
};
