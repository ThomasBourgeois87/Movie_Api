'use strict';

const Joi = require('joi');

module.exports = [
    // add user
    {
        method: 'post',
        path: '/user',
        options: {
            auth: false,
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    firstName: Joi.string().required().example('John').description('Firstname of the user'),
                    lastName: Joi.string().required().example('Doe').description('Lastname of the user'),
                    password: Joi.string().min(8).required().example('azerty1234').description('User password'),
                    email: Joi.string().min(8).required().example('john@gmail.com').description('User email'),
                    username: Joi.string().required().example('john1234').description('User username')
                })
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();
            return await userService.create(request.payload);
        }
    },

    // list allUsers
    {
        method: 'get',
        path: '/user',
        options: {
            tags: ['api'],
            auth: {
                scope: ['user', 'admin']
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();
            return await userService.getAll();
        }
    },

    // delete user
    {
        method: 'delete',
        path: '/user/{id}',
        options: {
            tags: ['api'],
            auth: {
                scope: ['admin']
            },
            validate: {
                params: Joi.object({
                    id: Joi.string().required().example('150').description('Id of the user')
                })
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();

            return await userService.delete(request.params.id);
        }
    },

    // update user
    {
        method: 'patch',
        path: '/user/{id}',
        options: {
            tags: ['api'],
            auth: {
                scope: ['admin']
            },
            validate: {
                params: Joi.object({
                    id: Joi.string().required().example('150').description('Id of the user')
                }),
                payload: Joi.object({
                    firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                    lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
                    password: Joi.string().required().min(3).example('azerty1234').description('User password'),
                    email: Joi.string().required().min(3).example('john@gmail.com').description('User email'),
                    username: Joi.string().required().min(3).example('john1234').description('User username')
                })
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();
            return await userService.update(request.params.id, request.payload);
        }
    },

    // login user
    {
        method: 'post',
        path: '/user/login',
        options: {
            auth: false,
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    email: Joi.string().required().min(3).example('john@gmail.com').description('User email'),
                    password: Joi.string().required().min(3).example('azerty1234').description('User password')
                })
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();
            return await userService.login(request.payload);
        }
    },

    // set admin
    {
        method: 'patch',
        path: '/user/set_admin/{id}',
        options: {
            tags: ['api'],
            auth: {
                scope: ['admin']
            },
            validate: {
                params: Joi.object({
                    id: Joi.string().required().example('150').description('Id of the user')
                })
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();

            return await userService.setAdmin(request.params.id);
        }
    }

];

