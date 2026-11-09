const productName: string = "Беспроводная мышь";
const unitPrice: number = 1500;
const quantity = 3;
const total = unitPrice * quantity;
const message = `${productName}: ${total} руб.`;

const result = document.getElementById("result");
if (result) {
    result.textContent = message;
}
console.log(message);
