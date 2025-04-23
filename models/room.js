const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
    highlight: {
        type: String,
    },
    ac: {
        type: Boolean,
        required: true,
        default: false
    }, 
    maxCapacity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    amenities: {
        type: [String]
    },
    bookings: [
        {
            checkin: {
                type: Date,
                required: true,
            },
            checkout:{
                type: Date,
                required: true,
            },
            username: {
                type: String,
                required: true,
            },
            guests : {
                total: {
                    type: Number,
                    required: true,
                },
                adults: {
                    type: Number,
                    required: true,
                },
                children: {
                    type: Number,
                    default: 0,
                },
            },
            customer: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        }
    ]
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;