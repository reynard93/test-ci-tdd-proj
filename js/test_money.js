const assert = require("assert");

class Money {
  constructor(amount, currency) {
    this.amount = amount;
    this.currency = currency;
  }

  times(multiplier) {
    return new Money(this.amount * multiplier, this.currency);
  }

  divide(divisor) {
    return new Money(this.amount / divisor, this.currency);
  }
}

let fiveDollars = new Money(5, "USD");
assert.deepStrictEqual(fiveDollars.times(2), new Money(10, "USD"));

let tenEuros = new Money(10, "EUR");
assert.strictEqual(tenEuros.times(2).amount, 20);
assert.deepStrictEqual(tenEuros.times(2).currency, "EUR");

let originalMoney = new Money(4002, "KRW");
let expectedMoneyAfterDivision = new Money(1000.5, "KRW");
  assert.deepStrictEqual(originalMoney.divide(4), expectedMoneyAfterDivision);

class Portfolio {
  #moneys = []

  add(...moneys) {
    this.#moneys = this.#moneys.concat(moneys)
  }
  evaluate(currency) {
    let total = this.#moneys.reduce((sum, {amount}) => sum + amount, 0);
    return new Money(total, currency);
  }
}
let fifteenDollars = new Money(15, "USD")
let portfolio = new Portfolio();
portfolio.add(fiveDollars, fiveDollars.times(2))
assert.deepStrictEqual(portfolio.evaluate("USD"), fifteenDollars);

