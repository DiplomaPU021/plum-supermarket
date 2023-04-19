export const deliveryTypes = [
    {
        name: "Самовивіз з наших магазинів",
        id: "selfPickup",
        description: "Безкоштовно",
        price: "Безкоштовно",
        adresses: [
            {
                id:"add1",
                cityType:"м.",
                city: "Львів",
                street: "вул. Кульпарківська, 72"
            },
            {
                id:"add2",
                cityType:"м.",
                city: "Львів",
                street: "вул. Мазепи, 127"
            },
            {
                id:"add3",
                cityType:"м.",
                city: "Львів",
                street: "вул. Антоновича, 31/2"
            },
            {
                id:"add4",
                cityType:"м.",
                city: "Київ",
                street: "вул. Василевської Ванди, 17"
            },
            {
                id: "add5",
                cityType:"м.",
                city: "Київ",
                street: "вул. Хрещатик, 7"
            },
        ]
    },
    {
        name: "Кур'єр на вашу адресу",
        id: "postmanDelivery",
        description: "",
        price: 98,
    },
    {
        name: "Нова пошта",
        id: "novaPoshta",
        description: "за тарифами перевізника",
        price: "за тарифами перевізника",
    }
]