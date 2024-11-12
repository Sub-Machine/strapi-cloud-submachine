'use strict';

/**
 * taxonomy service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::taxonomy.taxonomy');
