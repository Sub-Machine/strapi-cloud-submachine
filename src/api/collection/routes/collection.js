"use strict";

/**
 * collection router
 */

// const { createCoreRouter } = require('@strapi/strapi').factories;

// module.exports = createCoreRouter('api::collection.collection');

const customCollectionRoutes = require("./01-custom-collection.js");

module.exports = {
  routes: [...customCollectionRoutes.routes],
};
