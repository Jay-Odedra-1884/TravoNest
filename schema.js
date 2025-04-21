const joi = require("joi");


//for listing
module.exports.listingSchema = joi.object({
    listing : joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        bio: joi.string().required(),
        category: joi.string().required().valid("city", "mountain", "beach", "forest", "desert", "castels", "house-boat", "amazing-pools", "farms", "island", "camping"),
        image: joi.string().allow("", null),
        price: joi.number().required(),
        country: joi.string().required(),
        location: joi.string().required(),
    }).required()
});


//for review
module.exports.reviewSchema = joi.object({
    review: joi.object({
        comment: joi.string().required(),
        rating: joi.number().required().min(1).max(5),
    }).required(),
});