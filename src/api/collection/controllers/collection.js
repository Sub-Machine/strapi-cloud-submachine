"use strict";

/**
 * collection controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::collection.collection",
  ({ strapi }) => ({
    async getAllCollections(ctx) {
      try {
        const page = parseInt(ctx.query.page, 10) || 1;
        const pageSize = parseInt(ctx.query.pageSize, 10) || 10;
        const start = (page - 1) * pageSize;

        const collections = await strapi.entityService.findMany(
          "api::collection.collection",
          {
            populate: {
              image: true,
              taxonomy: true,
              tiles: {
                populate: {
                  image: true,
                  taxonomy: true,
                  offer: {
                    populate: {
                      taxonomy: true,
                      service_provider: {
                        populate: ["image", "taxonomy"],
                      },
                      subscriptions: {
                        populate: {
                          taxonomy: true,
                          service_provider: {
                            populate: ["image", "taxonomy"],
                          },
                          package: {
                            populate: {
                              taxonomy: true,
                              service_provider: {
                                populate: ["image", "taxonomy"],
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },

            limit: pageSize,
            start: start,
          }
        );

        const totalCollections = await strapi.entityService.count(
          "api::collection.collection"
        );

        const pageCount = Math.ceil(totalCollections / pageSize);

        if (!collections || collections.length === 0) {
          return ctx.notFound("No data found");
        }

        return ctx.send({
          data: collections,
          message: "Get data successfully!",
          meta: {
            pagination: {
              page,
              pageSize,
              pageCount,
              total: totalCollections,
            },
          },
        });
      } catch (error) {
        return ctx.internalServerError(
          "An error occurred while fetching the data."
        );
      }
    },
    async getCollection(ctx) {
      console.log(ctx);
    },
  })
);
