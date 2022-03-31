'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = [
    // add favorite
    {
        method: 'post',
        path: '/favorite',
        options: {
            auth: {
                scope: ['user', 'admin']
            },
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    id_user: Joi.number().integer().greater(0).description('User\'s id'),
                    id_movie: Joi.number().integer().greater(0).description('Movie\'s id')
                })
            }
        },
        handler: async (request, h) => {
            const { favoriteService } = request.services();
            const userId = request.payload.id_user;
            const movieId = request.payload.id_movie;

            return await favoriteService.create(userId, movieId);
        }
    },
    // delete favorite
    {
        method: 'delete',
        path: '/favorite/{id}',
        options: {
            tags: ['api'],
            auth: {
                scope: ['user', 'admin']
            },
            validate: {
                params: Joi.object({
                    id: Joi.string().required().example('150').description('Id of the user')
                })
            }
        },
        handler: async (request, h) => {
            const { favoriteService } = request.services();

            return await favoriteService.delete(request.params.id);
        }    },
    // get all favorite
    {
        method: 'get',
        path: '/favorite',
        options: {
            auth: {
                scope: ['user', 'admin']
            },
            tags: ['api']
        },
        handler: async (request, h) => {
            const { favoriteService } = request.services();

            return await favoriteService.listAll();
        }
    },
    // get by id
    {
        method: 'get',
        path: '/favorite/{id}',
        options: {
            auth: {
                scope: ['user', 'admin']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.string().required().example('150').description('Id of the favorite')
                })
            }
        },
        handler: async (request, h) => {
            const { favoriteService } = request.services();
            return await favoriteService.getById(request.params.id);
        }
    }
];
