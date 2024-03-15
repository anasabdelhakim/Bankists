"use strict";

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    "2024-03-07T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT",
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  currency: "CNY",
  locale: "zh-CN",
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  currency: "JPY",
  locale: "ja-JP", // Japanese (Japan)
};

const accounts = [account1, account2, account3, account4];
let CurrentAccount;
let sort = false;
let mort = false;
let totalMoneyAccount;
let Knownlocal;
let timercheck;

let tim;
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
const CurrencyType = document.getElementById("currency");
//btn clicker

const btnLogin = document.querySelector(".btn--login");
const btnTransferMney = document.querySelector(".btn-transfer");
const btnLoan = document.querySelector(".btn-loan");
const btncloseAcount = document.querySelector(".btn-close-account");
const btnsort = document.querySelector(".btn--sort");
const btnSubmit = document.querySelector(".submit");
const btnmassege = document.querySelectorAll(".cente_x");

//text changes
const Bank = document.querySelector(".internal_app");
const movmentcont = document.querySelector(".all");
const CurrentMovment = document.querySelector(".movments");
const loginText = document.querySelector(".login-text");
const MoenyBalanceText = document.querySelector(".moeny-balance");
const ValueIn = document.querySelector(".summary__value--in");
const ValueOut = document.querySelector(".summary__value--out");
const ValueInterest = document.querySelector(".summary__value--interest");
const date = document.querySelector(".date-balance");
const timeText = document.querySelector(".timer");
let AccountTransferTo, AmountLoan;
document.querySelector(".masege_USER.accept").classList.add("hidden");
document.querySelector(".masege_USER.erorr").classList.add("hidden");

//check erorr
const accountUser = document.querySelector(".account_User");
const overlay = document.querySelector(".overlay");
const acceptMessage = document.querySelector(".accept");
const errorMessage = document.querySelector(".erorr");

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

function scrollToTopOfHeader() {
  const header = document.querySelector("header");
  const headerPosition = header.getBoundingClientRect().top;
  window.scrollTo({
    top: headerPosition,
    behavior: "smooth",
  });
  window.addEventListener("scroll", function () {
    if (window.scrollY === 0 && mort) {
      document.querySelector("body").style.overflowY = "hidden";
    } else {
      document.querySelector("body").style.overflowY = "auto";
    }
  });
}
btnmassege.forEach((btn) => {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".masege_USER").forEach((massege) => {
      massege.classList.add("removemassege");
    });
  });
});

//transtions focus inputs
User_Iinput.focus();
m(inputUsername, inputPassword);
m(inputMoneyTransferd, inputAmountTransferd);
m(ConfirmUser, ConfirmPIN);
m(User_Iinput, User_Password);

const createUserAccount = (e) => {
  e.preventDefault();
  if (CurrencyType.value === "USD") Knownlocal = "en-US";
  if (CurrencyType.value === "EUR") Knownlocal = "pt-PT";
  if (CurrencyType.value === "EGP") Knownlocal = "ar-EG";

  const UserAccount = {
    owner: document.getElementById("user_name").value,
    movements: [750, -250],
    interestRate: 1.2,
    pin: parseInt(document.getElementById("user_pin").value),
    currency: CurrencyType.value,
    locale: Knownlocal,
  };

  if (
    isNaN(User_Iinput.value.split(" ").join("")) &&
    accounts.every((ac) => ac.owner !== User_Iinput.value) &&
    accounts.every((ac) => ac.pin !== +User_Password.value) &&
    User_Iinput.value.length >= 8 &&
    User_Iinput.value.length <= 16 &&
    User_Password.value.length === 4
  ) {
    if (!errorMessage.classList.contains("addmassege")) {
      acceptMessage.classList.remove("hidden", "removemassege");
      acceptMessage.classList.add("addmassege");
      setTimeout(function () {
        acceptMessage.classList.add("removemassege");
      }, 3000);
    } else {
      setTimeout(function () {
        acceptMessage.classList.remove("hidden", "removemassege");
        acceptMessage.classList.add("addmassege");
      }, 1500);
      setTimeout(function () {
        acceptMessage.classList.add("removemassege");
      }, 4500);
    }
    accounts.push(UserAccount);

    accountUser.classList.remove("sclad");
    accountUser.classList.add("scladoff");
    overlay.classList.add("overlayoff");
    errorMessage.classList.add("removemassege");
  } else {
    errorMessage.classList.remove("hidden");
    errorMessage.classList.add("addmassege");
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
  date.textContent = new Intl.DateTimeFormat(Knownlocal, options).format(
    new Date()
  );
};

function daytzbeet(currentDate) {
  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const year = currentDate.getFullYear();
  return `${day}/${month}/${year}`;
}

const options = {
  day: "numeric",
  month: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
};
const checkTheTimezero = (es) => (es < 10 ? "0" + es : es);

const StratLogOutTimer = function () {
  let timerLogOut = 300;
  const trick = function () {
    const minutes = Math.floor(timerLogOut / 60);
    const secounds = timerLogOut % 60;
    timeText.textContent = `${checkTheTimezero(minutes)}: ${checkTheTimezero(
      secounds
    )}`;
    --timerLogOut;
    if (timerLogOut === 0) {
      clearInterval(tim);
      loginText.textContent = `Log in to get started`;
      Bank.classList.remove("opac__open");
      Bank.classList.add("opac__close");
      mort = true;
      scrollToTopOfHeader();
    }
  };
  trick();
  tim = setInterval(trick, 1000);
  return tim;
};

btnSubmit.addEventListener("click", createUserAccount);

function formatMovementDate(DateMove) {
  const daysPassed = Math.floor(
    Math.abs(+new Date() - +new Date(DateMove)) / 72000000
  );

  let DisplayMovemnts = daytzbeet(DateMove);
  if (daysPassed === 0) DisplayMovemnts = "Today";
  if (daysPassed === 1) DisplayMovemnts = "Yesterday";
  if (daysPassed <= 7 && daysPassed > 1)
    DisplayMovemnts = `${daysPassed} days ago`;

  return DisplayMovemnts;
}

function displayMovemnts(acc, s = false) {
  movmentcont.innerHTML = "";
  const movarange = s
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  if (!acc.movementsDates) {
    acc.movementsDates = Array.from(
      { length: acc.movements.length },
      () => "2020-07-26T12:01:20.894Z"
    );
  }

  movarange.forEach((m, i) => {
    const CuerrancyMovment = currencyChange(m);
    const DateMove = new Date(acc.movementsDates[i]);
    const DisplayMovemnts = formatMovementDate(DateMove);
    let type = m > 0 ? "DEPOSIT" : "WITHDRAWAL";
    const html = `<div class="all">
      <div class="movments">
        <div class="Current-movments">
          <p class= "movments-${type}">${i + 1} ${type}</p>
          <p class="dateof-movment">${DisplayMovemnts}</p>
        </div>
        <h3 class="text_money"><span>${CuerrancyMovment}</span></h3>
      </div>
    </div>`;

    movmentcont.insertAdjacentHTML("afterbegin", html);
  });
}

function currencyChange(type) {
  return new Intl.NumberFormat(CurrentAccount.locale, {
    style: "currency",
    currency: CurrentAccount.currency,
  }).format(type);
}

function calcdisplaybalance(ad) {
  totalMoneyAccount = ad.movements.reduce((acc, per) => acc + per, 0);
  MoenyBalanceText.textContent = `${currencyChange(
    totalMoneyAccount.toFixed(2)
  )} `;
}

function calcSummary(acs) {
  const incomes = acs.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  ValueIn.textContent = `${currencyChange(incomes.toFixed(2))}`;

  const out = acs.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  ValueOut.textContent = `${currencyChange(Math.abs(out).toFixed(2))}`;

  const interest = acs.movements
    .filter((mov) => mov > 0)
    .map((dep) => (dep * acs.interestRate) / 100)
    .filter((id, i, arr) => {
      return id >= 1;
    })
    .reduce((acc, k) => acc + k, 0);
  ValueInterest.textContent = `${currencyChange(interest.toFixed(2))}`;
}

function update(acc) {
  displayMovemnts(acc);
  calcdisplaybalance(acc);
  calcSummary(acc);
}

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  if (tim) clearInterval(tim);
  tim = StratLogOutTimer();
  mort = false;
  acceptMessage.classList.add("hidden");
  errorMessage.classList.add("hidden");
  CurrentAccount = accounts.find((le) => le.username === inputUsername.value);
  if (CurrentAccount?.pin === +inputPassword.value) {
    document.querySelector("body").style.overflowY = "auto";
    loginText.textContent = `Welcome back, ${
      CurrentAccount.owner.split(" ").length > 1
        ? CurrentAccount.owner.split(" ")[0]
        : CurrentAccount.owner
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
    CurrentAccount.movementsDates.push(new Date().toISOString());
    AccountTransferTo.movementsDates.push(new Date().toISOString());
    inputMoneyTransferd.value = "";
    inputAmountTransferd.value = "";
    inputAmountTransferd.blur();
    update(CurrentAccount);
    clearInterval(tim);
    tim = StratLogOutTimer();
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  AmountLoan = +Requestloan.value;
  CurrentAccount.movementsDates.push(new Date().toISOString());
  if (
    AmountLoan > 0 &&
    CurrentAccount.movements.some((mov) => mov >= +Requestloan.value * 0.1)
  ) {
    CurrentAccount.movements.push(AmountLoan);
    Requestloan.value = "";
    update(CurrentAccount);
    clearInterval(tim);
    tim = StratLogOutTimer();
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
    scrollToTopOfHeader();
    mort = true;
  }
});
