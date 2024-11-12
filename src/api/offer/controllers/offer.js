"use strict";

/**
 * offer controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::offer.offer", ({ strapi }) => ({
  async findOne(ctx) {
    try {
      const { id } = ctx.params;

      if (!id) {
        console.warn("Missing service provider ID.");
        return ctx.badRequest("Missing service provider ID.");
      }

      const serviceProviderId = parseInt(id, 10);
      if (isNaN(serviceProviderId)) {
        console.warn("Invalid service provider ID:", id);
        return ctx.badRequest("Service provider ID must be a valid number.");
      }

      const offers = await strapi.entityService.findMany("api::offer.offer", {
        populate: ["taxonomy", "service_provider"],
        filters: { service_provider: { id: serviceProviderId } },
      });

      if (!offers || offers.length === 0) {
        console.info(
          "No offers found for service provider ID:",
          serviceProviderId
        );
        return ctx.notFound(
          "No offers found for the given service provider ID."
        );
      }

      return ctx.send({ data: offers });
    } catch (error) {
      console.error("Error fetching offer:", error);
      return ctx.internalServerError(
        "An error occurred while fetching the offer."
      );
    }
  },
}));
