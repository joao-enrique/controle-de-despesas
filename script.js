const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expenses");
const transactionList = document.getElementById("transaction-list");
const form = document.getElementById("transaction-form");
const descInput = document.getElementById("desc");
const amountInput = document.getElementById("amount");

let transactions = [];

function updateValues() {
    const amounts = transactions.map(t => t.amount);

    const total = amounts.reduce((acc, val) => acc + val, 0).toFixed(2);
    const income = amounts.filter(v => v > 0).reduce((acc, val) => acc + val, 0).toFixed(2);
    const expense = (amounts.filter(v => v < 0).reduce((acc, val) => acc + val, 0) * -1).toFixed(2);

    balanceEl.innerText = `$${total}`;
    incomeEl.innerText = `$${income}`;
    expenseEl.innerText = `$${expense}`;
}

function addTransactionDOM(transaction) {
    const sign = transaction.amount > 0 ? "+" : "-";
    const li = document.createElement("li");

    li.classList.add(transaction.amount > 0 ? "income-item" : "expense-item");

    li.innerHTML = `
        ${transaction.text} 
        <span>${sign}$${Math.abs(transaction.amount).toFixed(2)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>
    `;

    transactionList.appendChild(li);
}

function addTransaction(e) {
    e.preventDefault();

    const text = descInput.value.trim();
    const amount = +amountInput.value.trim();

    if (text === "" || isNaN(amount)) {
        alert("Preencha todos os campos!");
        return;
    }

    const transaction = {
        id: Date.now(),
        text,
        amount
    };

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();

    descInput.value = "";
    amountInput.value = "";
}

function removeTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    init();
}

function init() {
    transactionList.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
}

form.addEventListener("submit", addTransaction);

init();
