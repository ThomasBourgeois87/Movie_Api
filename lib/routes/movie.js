'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = [
    // add movie
    {
        method: 'post',
        path: '/movie',
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    title: Joi.string().min(3).example('Iron man').description('Title of the movie').required(),
                    description: Joi.string().max(1500).example('Tony Stark the best').description('Description of the movie'),
                    director: Joi.string().min(3).example('Jon Favreau').description('Name of the director'),
                    releasedAt: Joi.date().example('2008-04-30').description('Released date of the movie').required()
                })
            }
        },
        handler: async (request, h) => {
            const { movieService } = request.services();
            const { userService } = request.services();
            const { mailService } = request.services();

            const newMovie =  await movieService.create(request.payload);

            const mails =  await userService.getAll();
            const subject = 'New film ' + newMovie.title;
            const text = 'new film added, come see it !';

            console.log(mails);

            let listMails = '';
            // eslint-disable-next-line @hapi/hapi/for-loop
            mails.forEach(e => {
                listMails += e.email + ', ';
            });

            console.log(listMails);

            await mailService.sendEmail(listMails, subject, text);

            return newMovie;

        }
    },
    // delete movie
    {
        method: 'delete',
        path: '/movie/{id}',
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
            const { movieService } = request.services();

            return await movieService.delete(request.params.id);
        }
    },
    // update movie
    {
        method: 'patch',
        path: '/movie/{id}',
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
                    title: Joi.string().min(3).example('Iron man').description('Title of the movie').required(),
                    description: Joi.string().max(1500).example('Tony Stark the best').description('Description of the movie'),
                    director: Joi.string().min(3).example('Jon Favreau').description('Name of the director'),
                    releasedAt: Joi.date().example('2008-04-30').description('Released date of the movie').required()
                })
            }
        },
        handler: async (request, h) => {
            const { movieService } = request.services();
            return await movieService.update(request.params.id, request.payload);
        }
    },
    // list all movies
    {
        method: 'get',
        path: '/movie',
        options: {
            tags: ['api'],
            auth: {
                scope: ['user', 'admin']
            }
        },
        handler: async (request, h) => {
            const { movieService } = request.services();
            return await movieService.getAll();
        }
    },
    // get a movie
    {
        method: 'get',
        path: '/movie/{id}',
        options: {
            auth: {
                scope: ['user', 'admin']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.string().required().example('150').description('Id of the user')
                })
            }
        },
        handler: async (request, h) => {
            const { movieService } = request.services();
            return await movieService.getById(request.params.id);
        }
    }

];
