"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/v1/collections",
      handler: "api::collection.collection.getAllCollections",
      config: {
        policies: [],
        middlewares: ["strapi::cors"],
      },
    },
    {
      method: "GET",
      path: "/v1/collections/id",
      handler: "api::collection.collection.getCollection",
      config: {
        policies: [],
        middlewares: [{ name: "strapi::cors" }],
      },
    },
  ],
};
