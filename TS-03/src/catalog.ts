interface Contact {
    email?: string;
    phone?: string;
}

interface Supplier {
    name: string;
    country: string;
    contact?: Contact;
}

interface Product {
    readonly id: number;
    name: string;
    category: string;
    price: number;
    isAvailable: boolean;
    tags: string[];
    supplier: Supplier;
    description?: string;
}

const products: Product[] = [
    { id: 1, name: "Мышь", category: "Аксессуары", price: 1200, isAvailable: true, tags: ["USB"], supplier: { name: "Tech", country: "Китай", contact: { email: "tech@example.com" } }, description: "Проводная мышь" },
    { id: 2, name: "Клавиатура", category: "Аксессуары", price: 2900, isAvailable: false, tags: ["Bluetooth"], supplier: { name: "Input", country: "Корея" } },
    { id: 3, name: "Монитор", category: "Экраны", price: 15000, isAvailable: true, tags: ["HDMI"], supplier: { name: "Display", country: "Япония", contact: { phone: "+123456789" } }, description: "24 дюйма" },
    { id: 4, name: "Наушники", category: "Аудио", price: 3500, isAvailable: true, tags: ["Звук"], supplier: { name: "Tech", country: "Китай" } },
    { id: 5, name: "Колонки", category: "Аудио", price: 4200, isAvailable: false, tags: ["Стерео"], supplier: { name: "Sound", country: "Германия", contact: { email: "sound@example.com" } } },
    { id: 6, name: "Коврик", category: "Аксессуары", price: 500, isAvailable: true, tags: ["Для мыши"], supplier: { name: "Input", country: "Корея" }, description: "Большой коврик" }
];

const availableProducts = products.filter(product => product.isAvailable);
const names: string[] = products.map(product => product.name);
const found = products.find(product => product.id === 3);

products[0].price = 1100;
console.log("Доступные:", availableProducts);
console.log("Названия:", names);
if (found) console.log("Найден:", found.name);
for (const product of products) {
    if (product.description !== undefined) console.log("Описание:", product.description);
    console.log("Поставщик:", product.supplier.name, product.supplier.country);
    if (product.supplier.contact?.email !== undefined) console.log("Email:", product.supplier.contact.email);
}
