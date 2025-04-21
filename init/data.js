const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    bio: "Charming cottage steps from the beach.",
    category: "beach",
    description: "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=60"
    },
    price: 1500,
    location: "Malibu",
    country: "United States",
    coordinates: {
      latitude: 34.0309,
      longitude: -118.7827
    }
  },
  {
    title: "Modern Loft in Downtown",
    bio: "Stylish loft in the heart of the city.",
    category: "city",
    description: "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60"
    },
    price: 1200,
    location: "New York City",
    country: "United States",
    coordinates: {
      latitude: 40.7128,
      longitude: -74.0060
    }
  },
  {
    title: "Mountain Retreat",
    bio: "Peaceful mountain cabin to unwind.",
    category: "mountain",
    description: "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=60"
    },
    price: 1000,
    location: "Aspen",
    country: "United States",
    coordinates: {
      latitude: 39.1911,
      longitude: -106.8175
    }
  },
  {
    title: "Historic Villa in Tuscany",
    bio: "Elegant historic villa among vineyards.",
    category: "farms",
    description: "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60"
    },
    price: 2500,
    location: "Florence",
    country: "Italy",
    coordinates: {
      latitude: 43.7696,
      longitude: 11.2558
    }
  },
  {
    title: "Secluded Treehouse Getaway",
    bio: "Live among treetops in solitude.",
    category: "forest",
    description: "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=60"
    },
    price: 800,
    location: "Portland",
    country: "United States",
    coordinates: {
      latitude: 45.5051,
      longitude: -122.6750
    }
  },
  {
    title: "Beachfront Paradise",
    bio: "Condo with direct beach access.",
    category: "beach",
    description: "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=60"
    },
    price: 2000,
    location: "Cancun",
    country: "Mexico",
    coordinates: {
      latitude: 21.1619,
      longitude: -86.8515
    }
  },
  {
    title: "Rustic Cabin by the Lake",
    bio: "Rustic lakeside cabin for nature lovers.",
    category: "mountain",
    description: "Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=60"
    },
    price: 900,
    location: "Lake Tahoe",
    country: "United States",
    coordinates: {
      latitude: 39.0968,
      longitude: -120.0324
    }
  },
  {
    title: "Luxury Penthouse with City Views",
    bio: "Luxury city penthouse with skyline view.",
    category: "city",
    description: "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?auto=format&fit=crop&w=800&q=60"
    },
    price: 3500,
    location: "Los Angeles",
    country: "United States",
    coordinates: {
      latitude: 34.0522,
      longitude: -118.2437
    }
  },
  {
    title: "Ski-In/Ski-Out Chalet",
    bio: "Ski lovers’ dream in the Alps.",
    category: "mountain",
    description: "Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=60"
    },
    price: 3000,
    location: "Verbier",
    country: "Switzerland",
    coordinates: {
      latitude: 46.0978,
      longitude: 7.2295
    }
  },
  {
    title: "Safari Lodge in the Serengeti",
    bio: "Luxury lodge in the African wilderness.",
    category: "camping",
    description: "Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800&q=60"
    },
    price: 4000,
    location: "Serengeti National Park",
    country: "Tanzania",
    coordinates: {
      latitude: -2.3333,
      longitude: 34.8333
    }
  },
  {
    title: "Historic Canal House",
    bio: "Charming canal house with history.",
    category: "city",
    description: "Stay in a piece of history in this beautifully preserved canal house in Amsterdam's iconic district.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=60"
    },
    price: 1800,
    location: "Amsterdam",
    country: "Netherlands",
    coordinates: {
      latitude: 52.3667,
      longitude: 4.9000
    }
  },
  {
    title: "Private Island Retreat",
    bio: "Live on your own private island.",
    category: "island",
    description: "Have an entire island to yourself for a truly exclusive and unforgettable vacation experience.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1618140052121-39fc6db33972?auto=format&fit=crop&w=800&q=60"
    },
    price: 10000,
    location: "Fiji",
    country: "Fiji",
    coordinates: {
      latitude: -17.7134,
      longitude: 178.0650
    }
  },
  {
    title: "Charming Cottage in the Cotswolds",
    bio: "Storybook charm in the English countryside.",
    category: "farms",
    description: "Escape to the picturesque Cotswolds in this quaint and charming cottage with a thatched roof.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1602088113235-229c19758e9f?auto=format&fit=crop&w=800&q=60"
    },
    price: 1200,
    location: "Cotswolds",
    country: "United Kingdom",
    coordinates: {
      latitude: 51.8330,
      longitude: -1.8430
    }
  },
  {
    title: "Historic Brownstone in Boston",
    bio: "Elegant and classic brownstone stay.",
    category: "city",
    description: "Step back in time in this elegant historic brownstone located in the heart of Boston.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1533619239233-6280475a633a?auto=format&fit=crop&w=800&q=60"
    },
    price: 2200,
    location: "Boston",
    country: "United States",
    coordinates: {
      latitude: 42.3601,
      longitude: -71.0589
    }
  },
  {
    title: "Beachfront Bungalow in Bali",
    bio: "Private pool and paradise on the beach.",
    category: "beach",
    description: "Relax on the sandy shores of Bali in this beautiful beachfront bungalow with a private pool.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1602391833977-358a52198938?auto=format&fit=crop&w=800&q=60"
    },
    price: 1800,
    location: "Bali",
    country: "Indonesia",
    coordinates: {
      latitude: -8.3405,
      longitude: 115.0917
    }
  },
  {
    title: "Mountain View Cabin in Banff",
    bio: "Cozy retreat with stunning mountain views.",
    category: "mountain",
    description: "Enjoy breathtaking mountain views from this cozy cabin in the Canadian Rockies.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?auto=format&fit=crop&w=800&q=60"
    },
    price: 1500,
    location: "Banff",
    country: "Canada",
    coordinates: {
      latitude: 51.1784,
      longitude: -115.5708
    }
  }
];


module.exports = { data: sampleListings };