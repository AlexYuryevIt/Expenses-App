const LIMIT = 10000;

const inputNode = document.querySelector(".js-expenses-input");
const btnNode = document.querySelector(".js-expenses-btn");
const logNode = document.querySelector(".js-expenses-log");
const totalNode = document.querySelector(".js-total");
const limitNode = document.querySelector(".js-expenses-limit");
const resetBtn = document.querySelector(".js-reset-btn");

const expenses = [];

limitNode.innerText = `${LIMIT} \u{20BD}`;
logNode.innerText = "Трат нет";

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
    expensesListHTML += `<li>${element} &#8381</li>`;
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
    limitNode.innerText = "Лимит исчерпан";
  } else if (sum >= LIMIT) {
    limitNode.innerText = "Лимит превышен";
  }
});

resetBtn.addEventListener("click", function () {
  resetBtn.classList.remove("expenses__btn-reset_active");
  logNode.innerText = "Трат нет";
  limitNode.innerText = `${LIMIT} \u{20BD}`;
  totalNode.innerText = 0;
  expenses.length = 0;
});
