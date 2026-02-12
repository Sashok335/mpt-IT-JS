//Задание 1
function getActiveUsers(users) {
  return users.filter(user => user.isActive);
}

//Задание 2
const getUserNames = (users) => {
  return users.map(user => user.name);
};

//Задание 3
function findUserById(users, id) {
  return users.find(user => user.id === id) || null;
}

//Задание 4
function getUsersStatistics(users) {
  const active = users.filter(user => user.isActive).length;
  const pasive = users.length - active;
  
  return {
    total: users.length,
    active: active,
    inactive: pasive
  };
}

//Задание 5
function getAverageAge(users) {
  const totalAge = users.reduce((sum, user) => sum + user.age, 0);
  return totalAge / users.length;
}

//Задание 6
function groupUsersByCity(users) {
  return users.reduce((nazvanie, user) => {
    const city = user.city;
    if (!nazvanie[city]) {
      nazvanie[city] = [];
    }
    nazvanie[city].push(user);
    return nazvanie;
  }, {});
}

const users = [
  { id: 1, name: "Anna", age: 22, city: "Moscow", isActive: true },
  { id: 2, name: "Oleg", age: 17, city: "Kazan", isActive: false },
  { id: 3, name: "Ivan", age: 30, city: "Moscow", isActive: true },
  { id: 4, name: "Maria", age: 25, city: "Sochi", isActive: false }
];

console.log(getActiveUsers(users));
console.log(getUserNames(users));
console.log(findUserById(users, 3));
console.log(findUserById(users, 5));
console.log(getUsersStatistics(users));
console.log(getAverageAge(users));
console.log(groupUsersByCity(users));
