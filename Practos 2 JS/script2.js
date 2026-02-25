let expenses = [];
let nextId = 1;

const expenseTracker = {
    expenses: [],

    addExpense(title, amount, category) {
        if (!title || title.trim() === "") {
            alert("Ошибка: Название не может быть пустым.");
            return false;
        }
        if (!category || category.trim() === "") {
            alert("Ошибка: Категория не может быть пустой.");
            return false;
        }
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            alert("Ошибка: Сумма должна быть положительным числом.");
            return false;
        }

        const expense = {
            id: nextId++,
            title: title.trim(),
            amount: numAmount,
            category: category.trim()
        };

        this.expenses.push(expense);
        alert("Расход добавлен: " + expense.title + " (" + expense.amount + " руб)");
        return true;
    },

    printAllExpenses() {
        if (this.expenses.length === 0) {
            alert("Все расходы:\n\nСписок расходов пуст.");
            return;
        }
        
        let output = "ВСЕ РАСХОДЫ:\n\n";
        this.expenses.forEach(e => {
            output += "ID: " + e.id + " | " + e.title + " | " + e.amount + " руб | " + e.category + "\n";
        });
        alert(output);
    },

    getTotalAmount() {
        const total = this.expenses.reduce((sum, item) => sum + item.amount, 0);
        alert("ЧЕК:\n\nВсего операций: " + this.expenses.length + "\nВсего потрачено: " + total + " рублей");
        return total;
    },

    getExpensesByCategory(category) {
        const result = this.expenses.filter(e => e.category.toLowerCase() === category.toLowerCase());
        
        if (result.length === 0) {
            alert("Категория " + category + ":\n\nРасходов в этой категории не найдено.");
            return result;
        }

        let total = 0;
        let output = "Категория " + category + ":\n\n";
        result.forEach(e => {
            output += e.title + " - " + e.amount + " руб\n";
            total += e.amount;
        });
        output += "\nИтого: " + total + " руб";
        alert(output);
        return result;
    },

    findExpenseByTitle(search) {
        if (!search || search.trim() === "") {
            alert("Строка поиска не может быть пустой.");
            return null;
        }

        const found = this.expenses.find(e => e.title.toLowerCase().includes(search.toLowerCase()));

        if (found) {
            alert("НАЙДЕНО:\n\nID: " + found.id + "\nНазвание: " + found.title + "\nСумма: " + found.amount + " руб\nКатегория: " + found.category);
            return found;
        } else {
            const wantToAdd = confirm("Расход " + search + " не найден.\n\nХотите добавить его?");
            if (wantToAdd) {
                const amount = prompt("Введите сумму:");
                const category = prompt("Введите категорию:");
                if (amount && category) {
                    this.addExpense(search, amount, category);
                }
            }
            return null;
        }
    },

    deleteExpenseById(id) {
        const initialLength = this.expenses.length;
        this.expenses = this.expenses.filter(e => e.id !== id);

        if (this.expenses.length < initialLength) {
            alert("Расход с ID " + id + " удален.");
        } else {
            alert("Расход с ID " + id + " не найден.");
        }
    },

    printCategoryStats() {
        if (this.expenses.length === 0) {
            alert("СТАТИСТИКА:\n\nНет данных для статистики.");
            return;
        }

        const stats = {};
        this.expenses.forEach(e => {
            if (!stats[e.category]) {
                stats[e.category] = { count: 0, total: 0 };
            }
            stats[e.category].count++;
            stats[e.category].total += e.amount;
        });

        let output = "СТАТИСТИКА ПО КАТЕГОРИЯМ:\n\n";
        for (const [cat, data] of Object.entries(stats)) {
            output += cat + ": " + data.count + " оп., сумма: " + data.total + " руб.\n";
        }
        alert(output);
    },

    nextExpense() {
        if (this.expenses.length === 0) {
            alert("Нет расходов для переключения.");
            return;
        }
        const randomIndex = Math.floor(Math.random() * this.expenses.length);
        const e = this.expenses[randomIndex];
        alert("Случайный расход:\n\n" + e.title + " (" + e.amount + " руб)");
    }
};

function showMenu() {
    const choice = prompt(
        "=== МЕНЮ ТРЕКЕРА РАСХОДОВ ===\n\n" +
        "1. Добавить расход\n" +
        "2. Показать все расходы\n" +
        "3. Общий баланс (Чек)\n" +
        "4. Расходы по категории\n" +
        "5. Поиск расхода\n" +
        "6. Статистика по категориям\n" +
        "7. Удалить расход по ID\n" +
        "8. Случайный расход\n" +
        "0. Выход\n\n" +
        "Выберите действие (0-8):"
    );

    handleMenuInput(choice);
}

function handleMenuInput(choice) {
    if (choice === null) return;

    switch (choice.trim()) {
        case '1':
            const title = prompt("Название расхода:");
            const amount = prompt("Сумма:");
            const category = prompt("Категория:");
            if (title && amount && category) {
                expenseTracker.addExpense(title, amount, category);
            }
            showMenu();
            break;
        case '2':
            expenseTracker.printAllExpenses();
            showMenu();
            break;
        case '3':
            expenseTracker.getTotalAmount();
            showMenu();
            break;
        case '4':
            const cat = prompt("Введите категорию:");
            if (cat) {
                expenseTracker.getExpensesByCategory(cat);
            }
            showMenu();
            break;
        case '5':
            const search = prompt("Что ищем? (часть названия):");
            if (search) {
                expenseTracker.findExpenseByTitle(search);
            }
            showMenu();
            break;
        case '6':
            expenseTracker.printCategoryStats();
            showMenu();
            break;
        case '7':
            const id = prompt("Введите ID для удаления:");
            if (id) {
                expenseTracker.deleteExpenseById(parseInt(id));
            }
            showMenu();
            break;
        case '8':
            expenseTracker.nextExpense();
            showMenu();
            break;
        case '0':
            alert("До свидания!");
            break;
        default:
            alert("Неверная команда. Попробуйте снова.");
            showMenu();
    }
}

alert("Персональный трекер расходов запущен!");
showMenu();
