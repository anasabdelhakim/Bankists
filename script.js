"use strict";

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];
let CurrentAccount;
let sort = false;
let totalMoneyAccount;
//inputs feild
const inputUsername = document.querySelector(".input-login-username");
const inputPassword = document.querySelector(".input-login-password");
const inputMoneyTransferd = document.querySelector(".input-Transfer-to");
const inputAmountTransferd = document.querySelector(".input-Amount-transfered");
const Requestloan = document.querySelector(".request-loan");
const ConfirmUser = document.querySelector(".Confirm-user");
const ConfirmPIN = document.querySelector(".Confirm-PIN");
const User_Iinput = document.querySelector(".user__name");
const User_Password = document.querySelector(".user__password");

//btn clicker

const btnLogin = document.querySelector(".btn--login");
const btnTransferMney = document.querySelector(".btn-transfer");
const btnLoan = document.querySelector(".btn-loan");
const btncloseAcount = document.querySelector(".btn-close-account");
const btnsort = document.querySelector(".btn--sort");
const btnSubmit = document.querySelector(".submit");

//text changes
const Bank = document.querySelector(".internal_app");
const movmentcont = document.querySelector(".all");
const CurrentMovment = document.querySelector(".movments");
const loginText = document.querySelector(".login-text");
const MoenyBalanceText = document.querySelector(".moeny-balance");
const ValueIn = document.querySelector(".summary__value--in");
const ValueOut = document.querySelector(".summary__value--out");
const ValueInterest = document.querySelector(".summary__value--interest");

let AccountTransferTo, AmountLoan;

//Body Section{
document.querySelector("body").style.overflowY = "hidden";
// document.querySelector(".overlay").classList.add("hidden");
//}
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".account_User").classList.add("sclad");
});

Bank.classList.add("opac__close");
const m = function (first, then) {
  first.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      then.focus();
    }
  });
};

//transtions focus inputs
User_Iinput.focus();
m(inputUsername, inputPassword, btnLogin);
m(inputMoneyTransferd, inputAmountTransferd);
m(ConfirmUser, ConfirmPIN);
m(User_Iinput, User_Password);

const createUserAccount = (e) => {
  e.preventDefault();
  const UserAccount = {
    owner: document.getElementById("user_name").value,
    movements: [750, -250],
    interestRate: 1.2,
    pin: parseInt(document.getElementById("user_pin").value),
  };
  if (
    isNaN(User_Iinput.value.split(" ").join("")) &&
    User_Iinput.value.split(" ").length > 1 &&
    accounts.every((ac) => ac.owner !== User_Iinput.value) &&
    accounts.every((ac) => ac.pin !== +User_Password.value) &&
    User_Iinput.value.length >= 8 &&
    User_Iinput.value.length <= 12 &&
    User_Password.value.length >= 4
  ) {
    accounts.push(UserAccount);
    document.querySelector(".account_User").classList.remove("sclad");
    document.querySelector(".account_User").classList.add("scladoff");
    document.querySelector(".overlay").classList.add("overlayoff");
  }
  //create a Username
  const CreateUsername = function (acc) {
    acc.forEach((el) => {
      el.username = el.owner
        .split(" ")
        .map((letter) => letter[0])
        .join("")
        .toLowerCase();
    });
  };
  CreateUsername(accounts);
};

btnSubmit.addEventListener("click", createUserAccount);

function displayMovemnts(movment, s = false) {
  movmentcont.innerHTML = "";
  const movarange = s ? movment.slice().sort((a, b) => a - b) : movment;
  movarange.forEach((m, i) => {
    let type = m > 0 ? "DEPOSIT" : "WITHDRAWAL";
    const html = `<div class="all">
    <div class="movments">
      <div class="Current-movments">
        <p class= "movments-${type}">${i + 1} ${type}</p>
        <p class="dateof-movment">24/01/2037</p>
      </div>

      <h3 class="text_money">${m} <span>€</span></h3>
    </div>
    </div>`;

    movmentcont.insertAdjacentHTML("afterbegin", html);
  });
}
function calcdisplaybalance(ad) {
  totalMoneyAccount = ad.movements.reduce((acc, per) => acc + per, 0);
  MoenyBalanceText.textContent = `${totalMoneyAccount} €`;
}

function calcSummary(acs) {
  const incomes = acs.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  ValueIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acs.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  ValueOut.textContent = `${Math.abs(out.toFixed(2))}€`;

  const interest = acs.movements
    .filter((mov) => mov > 0)
    .map((dep) => (dep * acs.interestRate) / 100)
    .filter((id, i, arr) => {
      return id >= 1;
    })
    .reduce((acc, k) => acc + k, 0);
  ValueInterest.textContent = `${interest.toFixed(2)}€`;
}

function update(acc) {
  displayMovemnts(acc.movements);
  calcdisplaybalance(acc);
  calcSummary(acc);
}

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  CurrentAccount = accounts.find((le) => le.username === inputUsername.value);
  if (CurrentAccount?.pin === +inputPassword.value) {
    document.querySelector("body").style.overflowY = "auto";
    loginText.textContent = `Welcome back, ${
      CurrentAccount.owner.split(" ")[0]
    }`;
    inputUsername.value = "";
    inputPassword.value = "";
    inputPassword.blur();
    Bank.classList.remove("opac__close");
    Bank.classList.add("opac__open");
    update(CurrentAccount);
  }
});

btnsort.addEventListener("click", function (e) {
  e.preventDefault();
  sort = !sort;
  displayMovemnts(CurrentAccount.movements, sort);
});

btnTransferMney.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    inputMoneyTransferd.value !== CurrentAccount.username &&
    +inputAmountTransferd.value > 0 &&
    +inputAmountTransferd.value <= totalMoneyAccount &&
    accounts.some((ac) => ac.username === inputMoneyTransferd.value)
  ) {
    totalMoneyAccount -= +inputAmountTransferd.value;

    AccountTransferTo = accounts.find(
      (ac) => ac.username === inputMoneyTransferd.value
    );

    AccountTransferTo.movements.push(+inputAmountTransferd.value);
    CurrentAccount.movements.push(-+inputAmountTransferd.value);
    inputMoneyTransferd.value = "";
    inputAmountTransferd.value = "";
    inputAmountTransferd.blur();
    update(CurrentAccount);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  AmountLoan = +Requestloan.value;
  if (
    AmountLoan > 0 &&
    CurrentAccount.movements.some((mov) => mov >= +Requestloan.value * 0.1)
  ) {
    CurrentAccount.movements.push(AmountLoan);
    Requestloan.value = "";
    update(CurrentAccount);
  }
});

btncloseAcount.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    CurrentAccount.pin === +ConfirmPIN.value &&
    CurrentAccount.username === ConfirmUser.value
  ) {
    loginText.textContent = `Log in to get started`;
    const RemoveAccountIndex = accounts.findIndex(
      (le) => le.pin === +ConfirmPIN.value
    );

    accounts.splice(RemoveAccountIndex, 1);
    Bank.classList.remove("opac__open");
    Bank.classList.add("opac__close");
    ConfirmUser.value = "";
    ConfirmPIN.value = "";
  }
});
