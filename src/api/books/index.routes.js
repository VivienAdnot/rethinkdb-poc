import handlers from './index.handlers';
import responseSender from '../../services/responseSender';

const routes = [{
    method: 'GET',
    path: '/authors',
    handlers: [
        handlers.getAuthors,
        responseSender.responseSender
    ]
}, {
    method: 'GET',
    path: '/authors/:name',
    handlers: [
        handlers.getAuthorsByName,
        responseSender.responseSender
    ]
}, {
    method: 'GET',
    path: '/activeAuthors',
    handlers: [
        handlers.getActiveAuthors,
        responseSender.responseSender
    ]
}, {
    method: 'GET',
    path: '/authorsById/:id',
    handlers: [
        handlers.getAuthorsById,
        responseSender.responseSender
    ]
}, {
    method: 'POST',
    path: '/authors',
    handlers: [
        handlers.postAuthors,
        responseSender.responseSender
    ]
}, {
    method: 'PUT',
    path: '/authors/:id',
    handlers: [
        handlers.putAuthor,
        responseSender.responseSender
    ]
}];

module.exports = routes;
