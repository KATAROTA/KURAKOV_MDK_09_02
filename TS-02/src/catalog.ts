const productNames: string[] = ["Мышь", "Клавиатура", "Монитор", "Коврик", "Наушники"];
const prices: number[] = [1200, 2500.5, 12000, 450.75, 3200];
const availability: boolean[] = [true, false, true, true, false];

const productRows: [string, number, boolean][] = productNames.map((name, index) => [name, prices[index], availability[index]]);
const availableProducts = productRows.filter(product => product[2]);
const priceLabels: string[] = productRows.map(product => `${product[0]}: ${product[1]} руб.`);
const total = availableProducts.reduce((sum, product) => sum + product[1], 0);

function printStatistics(): void {
    console.log("Все товары:", priceLabels);
    console.log("Доступные товары:", availableProducts);
    console.log("Количество доступных:", availableProducts.length);
    console.log("Сумма доступных:", total);
}

printStatistics();
