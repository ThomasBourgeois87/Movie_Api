'use strict';

const Joi = require('joi')

module.exports = [
    // add user
    {
        method: 'post',
        path: '/user',
        options: {
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                    lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user')
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
            tags: ['api'],
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
            tags: ['api'],
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

];

