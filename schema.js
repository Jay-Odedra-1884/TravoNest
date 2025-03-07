const joi = require("joi");

module.exports.listingSchema = joi.object({
    // listing : joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        image: joi.string().allow("", null),
        price: joi.number().required(),
        country: joi.string().required(),
        location: joi.string().required(),
    // }).required()
})