"use strict";

/**
 * offer controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::offer.offer", ({ strapi }) => ({
  async getAllOffers(ctx) {
    try {
      const { sp_id } = ctx.params;

      if (!sp_id) {
        return ctx.badRequest("Missing service provider ID.");
      }

      const page = parseInt(ctx.query.page, 10) || 1;
      const pageSize = parseInt(ctx.query.pageSize, 10) || 10;
      const start = (page - 1) * pageSize;

      const offers = await strapi.entityService.findMany("api::offer.offer", {
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
        filters: { service_provider: { id: sp_id } },
        limit: pageSize,
        start: start,
      });

      const totalOffers = await strapi.entityService.count("api::offer.offer", {
        filters: { service_provider: { id: sp_id } },
      });

      const pageCount = Math.ceil(totalOffers / pageSize);

      if (!offers || offers.length === 0) {
        return ctx.notFound(
          "No offers found for the given service provider ID."
        );
      }

      return ctx.send({
        data: offers,
        message: "Get offers successfully!",
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
      const { sp_id, subscription_id } = ctx.params;

      if (!sp_id) {
        return ctx.badRequest("Missing service provider ID.");
      }
      if (!subscription_id) {
        return ctx.badRequest("Missing subscription ID.");
      }

      const offers = await strapi.entityService.findMany("api::offer.offer", {
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
        filters: {
          service_provider: { id: sp_id },
          subscriptions: { id: subscription_id },
        },
      });

      if (!offers || offers.length === 0) {
        return ctx.notFound(
          "No offers found for the given service provider ID."
        );
      }

      return ctx.send({
        data: offers,
        message: "Get Offer by subscription successfully!",
      });
    } catch (error) {
      return ctx.internalServerError(
        "An error occurred while fetching the data."
      );
    }
  },

  async getPackagePrice(ctx) {
    try {
      const subscriptionId = ctx.query.subscription;
      const packageId = ctx.query.package;

      if (!subscriptionId) {
        return ctx.badRequest("Missing subscription ID.");
      }
      if (!packageId) {
        return ctx.badRequest("Missing package ID.");
      }

      const offers = await strapi.entityService.findMany("api::offer.offer", {
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
        filters: {
          subscriptions: {
            id: subscriptionId,
            package: { id: packageId },
          },
        },
      });

      if (!offers || offers.length === 0) {
        return ctx.notFound(
          "No offers found for the given subscription and package ID."
        );
      }

      return ctx.send({
        data: offers,
        message: "Get Offer by subscription successfully!",
      });
    } catch (error) {
      return ctx.internalServerError(
        "An error occurred while fetching the data."
      );
    }
  },

  async updateOffer(ctx) {
    try {
      const { subscription_id } = ctx.params;

      if (!subscription_id) {
        return ctx.badRequest("Missing subscription ID.");
      }

      const subscriptionId = parseInt(subscription_id, 10);
      if (isNaN(subscriptionId)) {
        return ctx.badRequest("Subscription ID must be a valid number.");
      }

      const offer = await strapi.entityService.findMany("api::offer.offer", {
        populate: "subscriptions",
        filters: {
          subscriptions: { id: subscription_id },
        },
      });

      if (!offer || offer.length === 0) {
        return ctx.notFound("No offers found for the given subscription ID.");
      }

      const updatedOffer = await strapi.entityService.update(
        "api::offer.offer",
        offer[0].id,
        {
          data: ctx.request.body,
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
        }
      );

      if (!updatedOffer) {
        return ctx.notFound("Offer not found.");
      }

      return ctx.send({
        data: updatedOffer,
        message: "Offer updated successfully.",
      });
    } catch (error) {
      return ctx.internalServerError(
        "An error occurred while updating the offer."
      );
    }
  },

  async deleteOffer(ctx) {
    try {
      const { subscription_id } = ctx.params;

      if (!subscription_id) {
        return ctx.badRequest("Missing subscription ID.");
      }

      const subscriptionId = parseInt(subscription_id, 10);
      if (isNaN(subscriptionId)) {
        return ctx.badRequest("Subscription ID must be a valid number.");
      }

      const offer = await strapi.entityService.findMany("api::offer.offer", {
        populate: "subscriptions",
        filters: {
          subscriptions: { id: subscription_id },
        },
      });
      console.log("<== offer ==>", offer);

      if (!offer || offer.length === 0) {
        return ctx.notFound("No offers found for the given subscription ID.");
      }

      const deletedOffer = await strapi.entityService.delete(
        "api::offer.offer",
        offer[0].id
      );

      if (!deletedOffer) {
        return ctx.notFound("Offer not found.");
      }

      return ctx.send({
        data: deletedOffer,
        message: "Offer deleted successfully.",
      });
    } catch (error) {
      return ctx.internalServerError(
        "An error occurred while deleting the offer."
      );
    }
  },

  async updatePackage(ctx) {
    try {
      const { package_id, subscription_id } = ctx.params;

      if (!package_id || !subscription_id) {
        return ctx.badRequest("Missing package ID or subscription ID.");
      }

      const packageId = parseInt(package_id, 10);
      const subscriptionId = parseInt(subscription_id, 10);

      if (isNaN(packageId) || isNaN(subscriptionId)) {
        return ctx.badRequest(
          "Both package ID and subscription ID must be valid numbers."
        );
      }

      const data = await strapi.entityService.findMany(
        "api::subscription.subscription",
        {
          populate: "package",
          filters: {
            id: subscription_id,
            package: { id: package_id },
          },
        }
      );

      if (!data || data.length === 0) {
        return ctx.notFound("No offers found for the given subscription ID.");
      }

      const updatedPackage = await strapi.entityService.update(
        "api::package.package",
        data[0].package.id,
        {
          data: ctx.request.body,
          populate: {
            taxonomy: true,
            service_provider: {
              populate: ["image", "taxonomy"],
            },
          },
        }
      );

      if (!updatedPackage) {
        return ctx.notFound("Package not found.");
      }

      return ctx.send({
        data: updatedPackage,
        message: "Package updated successfully.",
      });
    } catch (error) {
      return ctx.internalServerError(
        "An error occurred while updating the package.",
        error
      );
    }
  },

  async deletePackage(ctx) {
    try {
      const { package_id, subscription_id } = ctx.params;

      if (!package_id || !subscription_id) {
        return ctx.badRequest("Missing package ID or subscription ID.");
      }

      const packageId = parseInt(package_id, 10);
      const subscriptionId = parseInt(subscription_id, 10);

      if (isNaN(packageId) || isNaN(subscriptionId)) {
        return ctx.badRequest(
          "Both package ID and subscription ID must be valid numbers."
        );
      }

      const data = await strapi.entityService.findMany(
        "api::subscription.subscription",
        {
          populate: "package",
          filters: {
            id: subscription_id,
            package: { id: package_id },
          },
        }
      );

      if (!data || data.length === 0) {
        return ctx.notFound("No offers found for the given subscription ID.");
      }

      const deletedPackage = await strapi.entityService.delete(
        "api::package.package",
        data[0].package.id
      );

      if (!deletedPackage) {
        return ctx.notFound("Package not found.");
      }

      return ctx.send({
        data: deletedPackage,
        message: "Package deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting package:", error);
      return ctx.internalServerError(
        "An error occurred while deleting the package."
      );
    }
  },
}));
