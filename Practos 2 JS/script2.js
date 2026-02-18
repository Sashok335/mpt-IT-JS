let expenses = [];
let nextId = 1;

function addExpense(title, amount, category) { 
    if (title === "" ||  amount <= 0 ||  category === "" || isNaN(amount)) {
        return;
    }
    
    let expense = {
        id: nextId,
        title: title,
        amount: amount,
        category: category
    };
    
    expenses.push(expense);
    nextId++;
    console.log("Расход добавлен: " + title);
}

function printAllExpenses() { 
    console.log("\n========== ВСЕ РАСХОДЫ ==========");
    if (expenses.length === 0) {
        console.log("Расходов нет");
        return;
    }
    
    for (let i = 0; i < expenses.length; i++) {
        let e = expenses[i];
        console.log(e.id + " | " + e.title + " | " + e.amount + "руб | " + e.category);
    }
}

function getTotalAmount() { 
    let total = 0;
    for (let i = 0; i < expenses.length; i++) {
        total = total + expenses[i].amount;  
    }
    
    console.log("\n========== ЧЕК ==========");
    console.log("Всего потрачено: " + total + " рублей");
    return total;
}

function getExpensesByCategory(category) { 
    let result = [];
    let total = 0;
    
    console.log("\n========== КАТЕГОРИЯ: " + category + " ==========");
    
    for (let i = 0; i < expenses.length; i++) {
        if (expenses[i].category === category) {
            result.push(expenses[i]);
            total = total + expenses[i].amount;
            console.log(expenses[i].title + " - " + expenses[i].amount + "руб");
        }
    }
    
    if (result.length > 0) {
        console.log("Итого по категории: " + total + "руб");
    } else {
        console.log("Нет расходов в этой категории");
    }
    
    return result;
}

function findExpenseByTitle(search) { 
    if (search === "") {
        console.log("Ошибка: строка поиска пустая");
        return null;
    }
    
    for (let i = 0; i < expenses.length; i++) {
        if (expenses[i].title.indexOf(search) !== -1) {
            let expense = expenses[i];
            
            console.log("\n========== НАЙДЕНО ==========");
            console.log("ID: " + expense.id);
            console.log("Название: " + expense.title);
            console.log("Сумма: " + expense.amount + "руб");
            console.log("Категория: " + expense.category);
            return expense;
        }
    }
    
    console.log("Ничего не найдено");
    return null;
}

let expenseTracker = {
    expenses: expenses,
    
    addExpense: function(title, amount, category) {
        addExpense(title, amount, category);
    },
    
    getTotalAmount: function() {
        return getTotalAmount();
    },
    
    getExpensesByCategory: function(category) {
        return getExpensesByCategory(category);
    },
    
    findExpenseByTitle: function(search) {
        return findExpenseByTitle(search);
    },
    
    nextExpense: function() {
        console.log("\n========== ПЕРЕКЛЮЧЕНИЕ ==========");
        if (expenses.length === 0) {
            console.log("Нет расходов");
            return;
        }
        let randomIndex = Math.floor(Math.random() * expenses.length);
        let e = expenses[randomIndex];

        console.log("Текущий расход: " + e.title + " (" + e.amount + "руб)");
    },
    
    deleteExpenseById: function(id) {
        let newExpenses = [];
        let found = false;
        
        for (let i = 0; i < expenses.length; i++) {
            if (expenses[i].id === id) {
                console.log("Удален расход: " + expenses[i].title);
                found = true;
            } else {
                newExpenses.push(expenses[i]);
            }
        }
        
        if (found) {
            expenses = newExpenses;
            this.expenses = expenses;
        } else {
            console.log("Расход с ID " + id + " не найден");
        }
    },
    
    printCategoryStats: function() {
        console.log("\n========== СТАТИСТИКА ПО КАТЕГОРИЯМ ==========");
        let cats = [];
        for (let i = 0; i < expenses.length; i++) {
            let category = expenses[i].category;
            let found = false;
            
            for (let j = 0; j < cats.length; j++) {
                if (cats[j] === category) {
                    found = true;
                    break;
                }
            }
            
            if (!found) {
                cats.push(category);
            }
        }
        
        for (let i = 0; i < cats.length; i++) {
            let cat = cats[i];
            let total = 0;
            let count = 0;
            
            for (let j = 0; j < expenses.length; j++) {
                if (expenses[j].category === cat) {
                    total = total + expenses[j].amount;
                    count++;
                }
            }
            
            console.log(cat + ": " + count + " операций, сумма: " + total + "руб");
        }
        
        if (cats.length === 0) {
            console.log("Нет данных для статистики");
        }
    }
};

console.log("========== ТРЕКЕР РАСХОДОВ ==========\n");

console.log("--- Добавление тестовых расходов ---");
addExpense("Пицца Маргарита", 850, "Еда");
addExpense("Метро", 60, "Транспорт");
addExpense("Кино билеты", 1200, "Развлечения");
addExpense("Бургер сет", 650, "Еда");
addExpense("Такси", 450, "Транспорт");
addExpense("Наушники", 5000, "Техника");
addExpense("Сок в кафе", 320, "Еда");

console.log("\n--- ЗАДАНИЕ 1: Вывод всех расходов ---");
printAllExpenses();

console.log("\n--- ЗАДАНИЕ 2: Подсчёт общего баланса ---");
getTotalAmount();

console.log("\n--- ЗАДАНИЕ 3: Фильтрация по категории 'Еда' ---");
getExpensesByCategory("Еда");

console.log("\n--- ЗАДАНИЕ 4: Поиск расхода по названию 'Такси' ---");
findExpenseByTitle("Такси");

console.log("\n--- ЗАДАНИЕ 5: Переключение между расходами ---");
expenseTracker.nextExpense();
expenseTracker.nextExpense();

console.log("\n--- ЗАДАНИЕ 6: Статистика по категориям ---");
expenseTracker.printCategoryStats();

console.log("\n--- ЗАДАНИЕ 7: Удаление расхода по ID ---");
console.log("Удаляем расход с ID 3");
expenseTracker.deleteExpenseById(3); 

console.log("\n--- Проверка после удаления ---");
printAllExpenses();
getTotalAmount();