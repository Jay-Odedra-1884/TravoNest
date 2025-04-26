const joi = require("joi");


//for listing
module.exports.listingSchema = joi.object({
    listing : joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        bio: joi.string().required(),
        category: joi.string().required().valid("city", "mountain", "beach", "forest", "desert", "castels", "house-boat", "amazing-pools", "farms", "island", "camping"),
        image: joi.object({
            url:joi.string().required(),
            filename: joi.string().required()
        }),
        price: joi.number().required(),
        country: joi.string().required(),
        location: joi.string().required(),
        coordinates: joi.object({
            latitude: joi.number().required(),
            longitude: joi.number().required(),
        })
    }).required() 
});


//for review
module.exports.reviewSchema = joi.object({
    review: joi.object({
        comment: joi.string().required(),
        rating: joi.number().required().min(1).max(5),
    }).required(),
});

module.exports.bookingSchema= joi.object({
    checkin: joi.date().required().min('now').label("checkin").messages({
        "date.min": "Checkin date must be in the future",
        "any.required": "Checkin date is required"
      }),
    checkout: joi.date().required().greater(joi.ref('checkin')).label('checkout').messages({
        "date.greater": "Checkout date must be after checkin date",
        "any.required": "Checkout date is required"
      }),
    guests: joi.object({
        total: joi.number().required().min(1),
        adults: joi.number().required().min(1),
        children: joi.number().default(0).required().min(0),
    }).custom((guests, helpers) => {
        const expextedTotal = guests.adults + guests.children;

        if(guests.total !== expextedTotal) {
            return helpers.message(`Total guests must be equal to the sum of adults and children. Expected ${expextedTotal}, but got ${guests.total}`);
        }
        return guests;
    }).required(),
})