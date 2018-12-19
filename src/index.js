'use strict';

module.exports.handleEvent = (request, response) => {
  response.status(200).send('Hello World!');
};

