"use strict";

/**
 * offer router
 */
// module.exports = createCoreRouter("api::offer.offer", {
//   prefix: "/v1",
//   only: ["find", "findOne"],
// });

// const { createCoreRouter } = require("@strapi/strapi").factories;

const customOfferRoutes = require("./custom-offer.js");

module.exports = {
  routes: [
    // ...createCoreRouter("api::offer.offer").routes,
    ...customOfferRoutes.routes,
  ],
};
