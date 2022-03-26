'use strict';

const Boom = require('@hapi/boom');
const Joi = require('joi')
const Encrypt = require('@thomas_bourgeois/iut-encrypt');
const Jwt = require('@hapi/jwt');

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
                    username: Joi.string().required().example('john1234').description('User username'),
                })
            }
        },
        handler: async (request, h) => {
            const {userService} = request.services();
            if(request.payload)
            return await userService.create(request.payload);
        }
    },

    // list allUsers
    {
        method: 'get',
        path: '/user',
        options: {
            tags: ['api'],
        },
        handler: async (request, h) => {
            const {userService} = request.services();
            return await userService.getAll();
        }
    },

    // delete user
    {
        method: 'delete',
        path: '/user/{id}',
        options: {
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.string().required().example('150').description('Id of the user')
                })
            }
        },
        handler: async (request, h) => {
            const {userService} = request.services();
            let deletedUser = await userService.delete(request.params.id);

            if (deletedUser === 0) {
                return Boom.notFound('User with id = ' + request.params.id + ' doesn\'t exist.');
            }
            return deletedUser;
        }
    },

    // update user
    {
        method: 'patch',
        path: '/user/{id}',
        options: {
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.string().required().example('150').description('Id of the user')
                }),
                payload: Joi.object({
                    firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                    lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
                    password: Joi.string().required().min(3).example('azerty1234').description('User password'),
                    email: Joi.string().required().min(3).example('john@gmail.com').description('User email'),
                    username: Joi.string().required().min(3).example('john1234').description('User username'),
                }),
            }
        },
        handler: async (request, h) => {
            const {userService} = request.services();
            let updatedData = await userService.update(request.params.id, request.payload);

            if (updatedData === undefined){
                return Boom.notFound('User with id = ' + request.params.id + ' doesn\'t exist.')
            }

            return updatedData;
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
                    password: Joi.string().required().min(3).example('azerty1234').description('User password'),
                })
            }
        },
        handler: async (request, h) => {
            const {userService} = request.services();
            let user = await userService.login(request.payload);
            // incorrect email
            if (user === undefined) {
                return Boom.unauthorized('Email or password is incorrect.');
            }

            console.log(user.password);
            // console.log(request.payload.password)
            if(!Encrypt.compareSha1(request.payload.password, user.password)) {
                return Boom.unauthorized('Email or password is incorrect.');
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
                                key: 'random_string', // La clé qui est définit dans lib/auth/strategies/jwt.js
                                algorithm: 'HS512'
                            },
                            {
                                ttlSec: 14400 // 4 hours
                            }
                        );

            return token;
        }
    },

];

