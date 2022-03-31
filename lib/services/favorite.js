'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');

module.exports = class FavoriteService extends Service {
    async create(movie, user) {
        const { Movie } = this.server.models();
        const { User } = this.server.models();
        const { Favorite } = this.server.models();

        const userId = await User.query()
            .findById(user)
            .then((user) => {
                return user;
            })
            .catch((error) => {
                Boom.notFound('User not found');
            });

        const movieId = await Movie.query()
            .findById(movie)
            .then((movie) => {
                return movie;
            })
            .catch((error) => {
                Boom.notFound('Movie not found');
            });

        const favorite = Favorite.query()
            .insert({ id_user: movie, id_movie: user })
            .then((favorite) => {
                return favorite;
            })
            .catch((error) => {
                Boom.badRequest('Favorite already existed');
            });

        return favorite;
    }

    delete(id) {
        const { Favorite } = this.server.models();
        return Favorite.query()
            .deleteById(id)
            .then( ( requestResult ) => {
                if ( requestResult ) {
                    return '';
                }

                return Boom.notFound('Favorite with id = ' + id + ' not found.');
            })
            .catch( ( err ) => {
                return err;
            });
    }

    listAll() {
        const { Favorite } = this.server.models();
        return Favorite.query()
            .catch( (err) => {
                return err;
            });
    }

    getById(id) {
        const { Favorite } = this.server.models();

        return Favorite.query()
            .findById(id)
            .then( ( requestResult ) => {
                if ( requestResult ) {
                    return requestResult;
                }
                return Boom.notFound('Favorite with id = ' + id + ' not found.');
            })
            .catch( ( err ) => {
                return err;
            });
    }
};
