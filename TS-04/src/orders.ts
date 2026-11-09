interface OrderItem {
    id: number;
    title: string;
    unitPrice: number;
    quantity: number;
}

interface Order {
    id: number;
    customer: string;
    items: OrderItem[];
    discountPercent?: number;
}

type PriceFormatter = (value: number) => string;

const orders: Order[] = [
    { id: 1, customer: "Иван", items: [{ id: 1, title: "Мышь", unitPrice: 1200, quantity: 2 }, { id: 2, title: "Коврик", unitPrice: 500, quantity: 1 }], discountPercent: 10 },
    { id: 2, customer: "Анна", items: [{ id: 3, title: "Монитор", unitPrice: 14000, quantity: 1 }, { id: 4, title: "Клавиатура", unitPrice: 2600, quantity: 2 }] },
    { id: 3, customer: "Олег", items: [{ id: 5, title: "Наушники", unitPrice: 3200, quantity: 3 }, { id: 6, title: "Колонки", unitPrice: 4500, quantity: 1 }], discountPercent: 5 }
];

function calculateItemTotal(item: OrderItem): number {
    return item.unitPrice * item.quantity;
}

function calculateSubtotal(items: OrderItem[]): number {
    return items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
}

function applyDiscount(subtotal: number, percent: number = 0): number {
    if (percent < 0 || percent > 100) throw new Error("Скидка должна быть от 0 до 100");
    return subtotal * (1 - percent / 100);
}

function formatPrice(value: number, currency: string = "RUB"): string {
    return `${value.toFixed(2)} ${currency}`;
}

function formatOrder(order: Order, formatter: PriceFormatter = formatPrice): string {
    const total = applyDiscount(calculateSubtotal(order.items), order.discountPercent);
    return `Заказ №${order.id}, ${order.customer}: ${formatter(total)}`;
}

function selectItems(items: OrderItem[], predicate: (item: OrderItem) => boolean): OrderItem[] {
    return items.filter(predicate);
}

const expensive = (item: OrderItem): boolean => item.unitPrice > 3000;
const multiple = (item: OrderItem): boolean => item.quantity > 1;

for (const order of orders) {
    console.log(formatOrder(order));
    console.log(formatOrder(order, value => formatPrice(value, "руб.")));
    console.log("Сумма без скидки:", formatPrice(calculateSubtotal(order.items)));
    console.log("Дорогие:", selectItems(order.items, expensive));
    console.log("Несколько штук:", selectItems(order.items, multiple));
    const titles: string[] = order.items.map(item => item.title);
    console.log("Названия:", titles);
    const found = order.items.find(item => item.id === 1);
    console.log("Поиск:", found ? found.title : "Не найдено");
}
console.log("Без скидки:", applyDiscount(1000));
console.log("Валюта по умолчанию:", formatPrice(1000));
