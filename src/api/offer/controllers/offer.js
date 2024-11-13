"use strict";

/**
 * offer controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::offer.offer", ({ strapi }) => ({
  async getAllOffers(ctx) {
    try {
      const { providerId } = ctx.params;

      if (!providerId) {
        return ctx.badRequest("Missing service provider ID.");
      }

      const serviceProviderId = parseInt(providerId, 10);
      if (isNaN(serviceProviderId)) {
        return ctx.badRequest("Service provider ID must be a valid number.");
      }

      const page = parseInt(ctx.query.page, 10) || 1;
      const pageSize = parseInt(ctx.query.pageSize, 10) || 10;
      const start = (page - 1) * pageSize;

      const offers = await strapi.entityService.findMany("api::offer.offer", {
        populate: ["taxonomy", "service_provider", "subscriptions"],
        filters: { service_provider: { id: serviceProviderId } },
        limit: pageSize,
        start: start,
      });

      const totalOffers = await strapi.entityService.count("api::offer.offer", {
        filters: { service_provider: { id: serviceProviderId } },
      });

      const pageCount = Math.ceil(totalOffers / pageSize);

      if (!offers || offers.length === 0) {
        return ctx.notFound(
          "No offers found for the given service provider ID."
        );
      }

      return ctx.send({
        data: offers,
        meta: {
          pagination: {
            page,
            pageSize,
            pageCount,
            total: totalOffers,
          },
        },
      });
    } catch (error) {
      return ctx.internalServerError(
        "An error occurred while fetching the offer."
      );
    }
  },

  async getOfferById(ctx) {
    try {
      const { providerId, spSubscriptionId } = ctx.params;

      if (!providerId) {
        return ctx.badRequest("Missing service provider ID.");
      }
      if (!spSubscriptionId) {
        return ctx.badRequest("Missing subscription ID.");
      }

      const serviceProviderId = parseInt(providerId, 10);
      if (isNaN(serviceProviderId)) {
        return ctx.badRequest("Service provider ID must be a valid number.");
      }
      const subscriptionId = parseInt(spSubscriptionId, 10);
      if (isNaN(subscriptionId)) {
        return ctx.badRequest("Subscription ID must be a valid number.");
      }

      return ctx.send({
        data: {
          provider_id: providerId,
          sp_subscription_id: spSubscriptionId,
          message: "Get offer by id controller is working",
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      return ctx.internalServerError(
        "An error occurred while fetching the data."
      );
    }
  },
  async getPackagePrice(ctx) {
    try {
      return ctx.send({
        data: {
          message: "Get package price controller is working",
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      return ctx.internalServerError(
        "An error occurred while fetching the data."
      );
    }
  },
  async updateOffer(ctx) {
    try {
      const { spSubscriptionId } = ctx.params;

      if (!spSubscriptionId) {
        return ctx.badRequest("Missing subscription ID.");
      }

      const subscriptionId = parseInt(spSubscriptionId, 10);
      if (isNaN(subscriptionId)) {
        return ctx.badRequest("Subscription ID must be a valid number.");
      }

      return ctx.send({
        data: {
          sp_subscription_id: spSubscriptionId,
          message: "Update offer controller is working",
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      return ctx.internalServerError(
        "An error occurred while fetching the data."
      );
    }
  },
  async deleteOffer(ctx) {
    try {
      const { spSubscriptionId } = ctx.params;

      if (!spSubscriptionId) {
        return ctx.badRequest("Missing subscription ID.");
      }

      const subscriptionId = parseInt(spSubscriptionId, 10);
      if (isNaN(subscriptionId)) {
        return ctx.badRequest("Subscription ID must be a valid number.");
      }

      return ctx.send({
        data: {
          sp_subscription_id: spSubscriptionId,
          message: "Delete offer controller is working",
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      return ctx.internalServerError(
        "An error occurred while fetching the data."
      );
    }
  },
  async updatePackage(ctx) {
    try {
      const { spPackageId, spSubscriptionId } = ctx.params;

      if (!spPackageId) {
        return ctx.badRequest("Missing service provider ID.");
      }
      if (!spSubscriptionId) {
        return ctx.badRequest("Missing subscription ID.");
      }

      const serviceProviderId = parseInt(spPackageId, 10);
      if (isNaN(serviceProviderId)) {
        return ctx.badRequest("Service provider ID must be a valid number.");
      }
      const subscriptionId = parseInt(spSubscriptionId, 10);
      if (isNaN(subscriptionId)) {
        return ctx.badRequest("Subscription ID must be a valid number.");
      }

      return ctx.send({
        data: {
          provider_id: serviceProviderId,
          sp_subscription_id: spSubscriptionId,
          message: "Update package by id controller is working",
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      return ctx.internalServerError(
        "An error occurred while fetching the data."
      );
    }
  },
  async deletePackage(ctx) {
    try {
      const { spPackageId, spSubscriptionId } = ctx.params;

      if (!spPackageId) {
        return ctx.badRequest("Missing service provider ID.");
      }
      if (!spSubscriptionId) {
        return ctx.badRequest("Missing subscription ID.");
      }

      const serviceProviderId = parseInt(spPackageId, 10);
      if (isNaN(serviceProviderId)) {
        return ctx.badRequest("Service provider ID must be a valid number.");
      }
      const subscriptionId = parseInt(spSubscriptionId, 10);
      if (isNaN(subscriptionId)) {
        return ctx.badRequest("Subscription ID must be a valid number.");
      }

      return ctx.send({
        data: {
          provider_id: serviceProviderId,
          sp_subscription_id: spSubscriptionId,
          message: "Delete Package by id controller is working",
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      return ctx.internalServerError(
        "An error occurred while fetching the data."
      );
    }
  },
}));
