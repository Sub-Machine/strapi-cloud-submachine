"use strict";

module.exports = {
  routes: [
    // {
    //   method: "GET",
    //   path: "/v1/offers",
    //   handler: "api::offer.offer.find",
    //   config: {
    //     policies: [],
    //     middlewares: [],
    //   },
    // },
    // {
    //   method: "GET",
    //   path: "/v1/offers/:id",
    //   handler: "api::offer.offer.findOne",
    //   config: {
    //     policies: [],
    //     middlewares: [],
    //   },
    // },
    // {
    //   method: "POST",
    //   path: "/v1/offers",
    //   handler: "api::offer.offer.create",
    //   config: {
    //     policies: [],
    //     middlewares: [],
    //   },
    // },
    // {
    //   method: "PUT",
    //   path: "/v1/offers/:id",
    //   handler: "api::offer.offer.update",
    //   config: {
    //     policies: [],
    //     middlewares: [],
    //   },
    // },
    // {
    //   method: "DELETE",
    //   path: "/v1/offers/:id",
    //   handler: "api::offer.offer.delete",
    //   config: {
    //     policies: [],
    //     middlewares: [],
    //   },
    // },

    // SP Get All Offers
    {
      method: "GET",
      path: "/v1/offers/:sp_id",
      handler: "api::offer.offer.getAllOffers",
      config: {
        policies: [],
        middlewares: [],
      },
    },

    // SP Get Offer by ID
    {
      method: "GET",
      path: "/v1/offers/:sp_id/:subscription_id",
      handler: "api::offer.offer.getOfferById",
      config: {
        policies: [],
        middlewares: [],
      },
    },

    // Get Package Price
    {
      method: "GET",
      path: "/v1/offer-price",
      handler: "api::offer.offer.getPackagePrice",
      config: {
        policies: [],
        middlewares: [],
      },
    },

    // Update Offer
    {
      method: "PUT",
      path: "/v1/offers/:subscription_id",
      handler: "api::offer.offer.updateOffer",
      config: {
        policies: [],
        middlewares: [],
      },
    },

    // Delete Offer
    {
      method: "DELETE",
      path: "/v1/offers/:subscription_id",
      handler: "api::offer.offer.deleteOffer",
      config: {
        policies: [],
        middlewares: [],
      },
    },

    // Update Package
    {
      method: "PUT",
      path: "/v1/offers/:subscription_id/:package_id",
      handler: "api::offer.offer.updatePackage",
      config: {
        policies: [],
        middlewares: [],
      },
    },

    // Delete Package
    {
      method: "DELETE",
      path: "/v1/offers/:subscription_id/:package_id",
      handler: "api::offer.offer.deletePackage",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
