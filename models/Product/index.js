const products = [
  {
    _id: 0,
    name: "product0",
    slug: "product0",
    category: {
      name: "sleepbag",
      slug: "sleepbag",
    },
    subCategories: [
      {
        name: "sleepbag turbat",
        slug: "sleepbag_turbat",
        parent: 33,
      },
    ],
    description: "jslkfja;lsjfiefkjdsoifjawpofs",
    shipping: 12,
    refundPolicy: "30 days",
    rating: 0,
    numReviews: 0,
    reviews: [],
    subProducts: [
      {
        discount: 0,
        color: {
          color: "#f15f6f",
          image: "photos/04blackhole1-articleLarge-v3.jpg",
        },
        sizes: [
          {
            size: "M",
            qty: 12,
            price: 70,
          },
          {
            size: "S",
            qty: 9,
            price: 72,
          },
          {
            size: "XS",
            qty: 3,
            price: 65,
          },
        ],
        images: [
          {
            url: "photos/HRW-0230209.jpg",
          },
          {
            url: "photos/photo_2022-03-16_18-22-51.jpg",
          },
        ],
      },
      {
        discount: 3,
        color: {
          color: "#ecd297",
          image: "photos/20221010_125826.jpg",
        },
        sizes: [
          {
            size: "M",
            qty: 2,
            price: 54,
          },
          {
            size: "S",
            qty: 33,
            price: 22,
          },
          {
            size: "XS",
            qty: 332,
            price: 11,
          },
        ],
        images: [
          {
            url: "photos/photo_2022-06-01_21-03-38.jpg",
          },
          {
            url: "photos/HRW-0230209.jpg",
          },
        ],
      },
    ],
    details: [
      {
        name: "color",
        value: "blue",
      },
      {
        name: "type",
        value: "blouse",
      },
    ],
  },
  {
    _id: 1,
    name: "Tide Laundry Detergent Liquid Soap Eco-Box, Ultra Concentrated High Efficiency (HE), Original Scent, 96 Loads",
    slug: "Tide_Laundry_Detergent_Liquid_Soap",
    category: {
      name: "flowers",
      slug: "flowers",
    },
    subCategories: [
      {
        name: "roses",
        slug: "roses",
        parent: 22,
      },
    ],
    description: "More concentrated laundry detergent for more cleaning power per drop *vs. 4.43L bottle"+
    "Shipping-safe packaging to prevent laundry detergent liquid leaks on the way to your home"+
    "No-drip tap and stand to raise the box and allow for clean, easy detergent dispensing"+
    "Ramp inside the box to help you use every last drop of detergent"+
    "Tide EcoBox is created with 60% less plastic and less water than the 4.43L bottle"+
    "Compatible with both HE and non-HE machines",
    shipping: 0,
    refundPolicy: "30 days",
    rating: 0,
    numReviews: 0,
    reviews: [],
    subProducts: [
      {
        discount: 23,
        color: {
          color: "#ffd448",
          image: "photos/blue.png",
        },
        sizes: [
          {
            size: "M",
            qty: 12,
            price: 94,
          },
          {
            size: "S",
            qty: 12,
            price: 16,
          },
          {
            size: "XS",
            qty: 15,
            price: 62,
          },
        ],
        images: [
          {
            url: "photos/tide.jpg",
          },
          {
            url: "photos/tide1.jpg",
          },
        ],
      },
      {
        discount: 17,
        color: {
          color: "#f4f531",
          image: "photos/04blackhole1-articleLarge-v3.jpg",
        },
        sizes: [
          {
            size: "M",
            qty: 32,
            price: 99,
          },
          {
            size: "S",
            qty: 17,
            price: 78,
          },
          {
            size: "XS",
            qty: 44,
            price: 33,
          },
        ],
        images: [
          {
            url: "photos/photo_2022-03-16_18-22-51.jpg",
          },
          {
            url: "photos/photo_2022-06-01_21-03-38.jpg",
          },
        ],
      },
    ],
    details: [
      {
        name: "color",
        value: "blue",
      },
      {
        name: "style",
        value: "loundry",
      },
    ],
  },
  {
    _id: 2,
    name: "product2",
    slug: "product2",
    category: {
      name: "clothes",
      slug: "clothes",
    },
    subCategories: [
      {
        name: "blouses",
        slug: "blouses",
        parent: 11,
      },
      {
        name: "pants",
        slug: "pants",
        paret: 11,
      },
    ],
    description: "q[oripoi./mc.,mvnxzbvzkfhreriu vteuteorip kjhyut",
    shipping: 4,
    refundPolicy: "30 days",
    rating: 0,
    numReviews: 0,
    reviews: [],
    subProducts: [
      {
        discount: 4,
        color: {
          color: "#ecd297",
          image: "photos/04blackhole1-articleLarge-v3.jpg",
        },
        sizes: [
          {
            size: "M",
            qty: 62,
            price: 34,
          },
          {
            size: "S",
            qty: 72,
            price: 12,
          },
          {
            size: "XS",
            qty: 12,
            price: 55,
          },
        ],
        images: [
          {
            url: "photos/photo_2022-06-01_21-03-38.jpg",
          },
          {
            url: "photos/photo_2022-03-16_18-22-51.jpg",
          },
        ],
      },
      {
        discount: 12,
        color: {
          color: "#ecd297",
          image: "photos/20221010_125826.jpg",
        },
        sizes: [
          {
            size: "M",
            qty: 12,
            price: 34,
          },
          {
            size: "S",
            qty: 12,
            price: 12,
          },
          {
            size: "XS",
            qty: 12,
            price: 55,
          },
        ],
        images: [
          {
            url: "photos/HRW-0230209.jpg",
          },
          {
            url: "photos/photo_2022-06-01_21-03-38.jpg",
          },
        ],
      },
    ],
    details: [
      {
        name: "color",
        value: "green",
      },
      {
        name: "style",
        value: "style1",
      },
    ],
  },
];

export { products };
