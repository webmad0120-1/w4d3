const faker = require("faker");

Array(100)
  .fill()
  .forEach(() => {
    console.log(
      `${faker.commerce.product()} ${faker.commerce.product()} ${faker.commerce.product()}`
    );
  });
