// Массив с транзакциями
const transactions = [ 
    // Транзакция 1
    {
        transaction_id: 1,
        transaction_date: "2025-02-17",
        transaction_amount: 150.75,
        transaction_type: "приход",
        transaction_description: "Перевод от друга",
        merchant_name: "Victoria",
        card_type: "дебетовая"
    },
    // Транзакция 2
    {
        transaction_id: 2,
        transaction_date: "2025-02-16",
        transaction_amount: -200.50,
        transaction_type: "расход",
        transaction_description: "Покупка в магазине",
        merchant_name: "Linella",
        card_type: "кредитная"
    },
    // Транзакция 3
    {
        transaction_id: 3,
        transaction_date: "2025-02-15",
        transaction_amount: -500.00,
        transaction_type: "расход",
        transaction_description: "Оплата услуг интернета",
        merchant_name: "Moldtelecom",
        card_type: "дебетовая"
    },
    // Транзакция 4
    {
        transaction_id: 4,
        transaction_date: "2025-02-14",
        transaction_amount: 1000.00,
        transaction_type: "приход",
        transaction_description: "Зарплата",
        merchant_name: "Работодатель",
        card_type: "дебетовая"
    }
];

// 1 Функция для получения уникальных типов транзакций
function getUniqueTransactionTypes(transactions) {
    return [...new Set(transactions.map(t => t.transaction_type))];
}

// 2  Функция для расчета общей суммы транзакций
function calculateTotalAmount(transactions) {
    return transactions.reduce((sum, t) => sum + t.transaction_amount, 0);
}

// 3 Функция для расчета общей суммы транзакций по дате
function calculateTotalAmountByDate(transactions, year, month, day) {
    return transactions
        .filter(t => {
            const date = new Date(t.transaction_date);
            return (!year || date.getFullYear() === year) &&
                   (!month || date.getMonth() + 1 === month) &&
                   (!day || date.getDate() === day);
        })
        .reduce((sum, t) => sum + t.transaction_amount, 0);
}

// 4 Функция для получения транзакций по типу
function getTransactionByType(transactions, type) {
    return transactions.filter(t => t.transaction_type === type);
}

// 5 Функция для получения транзакций в диапазоне дат
function getTransactionsInDateRange(transactions, startDate, endDate) {
    return transactions.filter(t => {
        const date = new Date(t.transaction_date);
        return date >= new Date(startDate) && date <= new Date(endDate);
    });
}

// 6 Функция для получения транзакций по магазину
function getTransactionsByMerchant(transactions, merchantName) {
    return transactions.filter(t => t.merchant_name === merchantName);
}

// 7 Функция для расчета средней суммы транзакций
function calculateAverageTransactionAmount(transactions) {
    if (transactions.length === 0) return "Нет данных";
    return calculateTotalAmount(transactions) / transactions.length;
}

// 8 Функция для получения транзакций по диапазону суммы
function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
    return transactions.filter(t => t.transaction_amount >= minAmount && t.transaction_amount <= maxAmount);
}

// 9 Функция для расчета общей суммы дебетовых транзакций
function calculateTotalDebitAmount(transactions) {
    return transactions
        .filter(t => t.card_type === "дебетовая")
        .reduce((sum, t) => sum + t.transaction_amount, 0);
}

// 10 Функция для поиска месяца с наибольшим числом транзакций
function findMostTransactionsMonth(transactions) {
    const counts = transactions.reduce((acc, t) => {
        const month = new Date(t.transaction_date).getMonth() + 1;
        acc[month] = (acc[month] || 0) + 1;
        return acc;
    }, {});
    const maxCount = Math.max(...Object.values(counts));
    return Object.keys(counts).filter(m => counts[m] === maxCount);
}

// 11 Функция для поиска месяца с наибольшим числом дебетовых транзакций
function findMostDebitTransactionMonth(transactions) {
    const counts = transactions.reduce((acc, t) => {
        if (t.card_type === "дебетовая") {
            const month = new Date(t.transaction_date).getMonth() + 1;
            acc[month] = (acc[month] || 0) + 1;
        }
        return acc;
    }, {});
    const maxCount = Math.max(...Object.values(counts));
    return Object.keys(counts).filter(m => counts[m] === maxCount);
}

// 12 Функция для определения типа транзакций с наибольшим количеством
function mostTransactionTypes(transactions) {
    const debitCount = transactions.filter(t => t.card_type === "дебетовая").length;
    const creditCount = transactions.filter(t => t.card_type === "кредитная").length;
    return debitCount > creditCount ? "debit" : creditCount > debitCount ? "credit" : "equal";
}

// 13 Функция для получения транзакций до заданной даты
function getTransactionsBeforeDate(transactions, date) {
    return transactions.filter(t => new Date(t.transaction_date) < new Date(date));
}

// 14 Функция для поиска транзакции по ID
function findTransactionById(transactions, id) {
    return transactions.find(t => t.transaction_id === id);
}

// 15 Функция для получения описаний всех транзакций
function mapTransactionDescriptions(transactions) {
    return transactions.map(t => t.transaction_description);
}

// Пример вызова функций
console.log("Уникальные типы транзакций:", getUniqueTransactionTypes(transactions));
console.log("Общая сумма транзакций:", calculateTotalAmount(transactions));
console.log("Транзакции за 2025-02-16:", calculateTotalAmountByDate(transactions, 2025, 2, 16));
console.log("Транзакции типа приход:", getTransactionByType(transactions, "приход"));
console.log("Транзакции в диапазоне дат:", getTransactionsInDateRange(transactions, "2025-02-14", "2025-02-17"));
console.log("Транзакции по магазину Linella:", getTransactionsByMerchant(transactions, "Linella"));
console.log("Средняя сумма транзакции:", calculateAverageTransactionAmount(transactions));
console.log("Транзакции в диапазоне сумм:", getTransactionsByAmountRange(transactions, -300, 200));
console.log("Общая сумма дебетовых транзакций:", calculateTotalDebitAmount(transactions));
console.log("Месяцы с наибольшим числом транзакций:", findMostTransactionsMonth(transactions));
console.log("Месяцы с наибольшим числом дебетовых транзакций:", findMostDebitTransactionMonth(transactions));
console.log("Какого типа транзакций больше:", mostTransactionTypes(transactions));
console.log("Транзакции до 2025-02-15:", getTransactionsBeforeDate(transactions, "2025-02-15"));
console.log("Поиск транзакции по ID (2):", findTransactionById(transactions, 2));
console.log("Описания всех транзакций:", mapTransactionDescriptions(transactions));
