const LIMIT = 10000;
const CURRENCY = `\u{20BD}`;
const LIMIT_EXHAUSTED = "Лимит исчерпан";
const LIMIT_EXCEEDED = "Лимит превышен";
const NO_EXPENSES = "Трат нет";

const inputNode = document.querySelector(".js-expenses-input");
const btnNode = document.querySelector(".js-expenses-btn");
const logNode = document.querySelector(".js-expenses-log");
const totalNode = document.querySelector(".js-total");
const limitNode = document.querySelector(".js-expenses-limit");
const resetBtn = document.querySelector(".js-reset-btn");

const expenses = [];

limitNode.innerText = LIMIT;
logNode.innerText = NO_EXPENSES;

btnNode.addEventListener("click", function () {
  if (!inputNode.value) {
    return;
  }

  const expense = parseInt(inputNode.value);
  inputNode.value = "";

  resetBtn.classList.add("expenses__btn-reset_active");

  expenses.push(expense);

  let expensesListHTML = "";

  expenses.forEach((element) => {
    expensesListHTML += `<li>${element} ${CURRENCY}</li>`;
  });

  logNode.innerHTML = `<ol class="expenses__list">${expensesListHTML}</ol>`;

  let sum = 0;
  expenses.forEach((element) => {
    sum += element;

    totalNode.innerText = sum;
  });

  if (sum < LIMIT) {
    limitNode.innerText = LIMIT - sum;
  } else if (sum == LIMIT) {
    limitNode.innerText = LIMIT_EXHAUSTED;
  } else if (sum >= LIMIT) {
    limitNode.innerText = LIMIT_EXCEEDED;
  }
});

resetBtn.addEventListener("click", function () {
  resetBtn.classList.remove("expenses__btn-reset_active");
  logNode.innerText = NO_EXPENSES;
  limitNode.innerText = `${LIMIT} ${CURRENCY}`;
  totalNode.innerText = 0;
  expenses.length = 0;
});
