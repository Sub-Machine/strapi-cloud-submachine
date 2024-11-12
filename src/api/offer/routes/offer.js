"use strict";

/**
 * offer router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::offer.offer", {
  prefix: "/v1",
  only: ["find", "findOne"],
});
