"use strict";

const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
const { env } = require("@strapi/utils");

module.exports = {
  async afterCreate(event) {
    const { result } = event;

    try {
      const fullOffer = await strapi.entityService.findOne(
        "api::offer.offer",
        result.id,
        {
          populate: {
            service_provider: {
              populate: ["image"],
            },
          },
        }
      );

      const requiredFields = {
        name: fullOffer.service_provider.name,
        hs_sku: fullOffer.offer_id,
        description: fullOffer.service_provider.synopsis,
        hs_product_type: "service",
        hs_images: fullOffer.service_provider.image?.url || null,
        hs_url: null,
        price: fullOffer.price,
        recurringbillingfrequency: null,
        hs_cost_of_goods_sold: null,
        hs_recurring_billing_period: null,
      };

      const snsClient = new SNSClient({
        region: env("REGION"),
        credentials: {
          accessKeyId: env("ACCESS_KEY_ID"),
          secretAccessKey: env("SECRET_ACCESS_KEY"),
        },
      });

      const params = {
        TopicArn:
          "arn:aws:sns:us-east-1:180939226808:offer-webhook-hubspot-product",
        Message: JSON.stringify({ hubspot: requiredFields, offer: fullOffer }),
        Subject: `New Offer Created: ${requiredFields.name}`,
      };

      const command = new PublishCommand(params);
      await snsClient.send(command);

      strapi.log.info(
        `SNS message sent successfully for offer ID ${result.id}`
      );
    } catch (error) {
      strapi.log.error(
        `Error sending SNS message for offer ID ${result.id}:`,
        error
      );
    }
  },
};
