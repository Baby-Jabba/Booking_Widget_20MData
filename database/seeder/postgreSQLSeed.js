var faker = require('faker');
const { Pool, Client } = require('pg');

const client = new Client({
  user: 'postgres',
  database: 'sec_hrr43',
  password: '123456',
  port: 5432
});
client.connect();

const sites1 = () => {
  for (let index = 0; index < 3333333; index++) {
    let siteName = `${faker.company.catchPhraseAdjective()}.com`;
    let logo = faker.image.cats();
    let tweak = faker.finance.amount(0.8, 1, 2);
    let incentive = faker.random.number({ min: 0, max: 2 });
    let params = [siteName, logo, tweak, incentive];
    client
      .query(
        'INSERT INTO sites(site_name, logo, tweak, incentive) VALUES($1,$2,$3,$4)',
        params
      )
      .then(res => {
        console.log(`${index}sites added;`);
      })
      .catch(e => console.error(e.stack));
  }
};
const sites2 = () => {
  for (let index = 0; index < 3333333; index++) {
    let siteName = `${faker.company.catchPhraseAdjective()}.com`;
    let logo = faker.image.cats();
    let tweak = faker.finance.amount(0.8, 1, 2);
    let incentive = faker.random.number({ min: 0, max: 2 });
    let params = [siteName, logo, tweak, incentive];
    client
      .query(
        'INSERT INTO sites(site_name, logo, tweak, incentive) VALUES($1,$2,$3,$4)',
        params
      )
      .then(res => {
        console.log(`${index}sites added;`);
      })
      .catch(e => console.error(e.stack));
  }
};

const sites3 = () => {
  for (let index = 0; index < 3333334; index++) {
    let siteName = `${faker.company.catchPhraseAdjective()}.com`;
    let logo = faker.image.cats();
    let tweak = faker.finance.amount(0.8, 1, 2);
    let incentive = faker.random.number({ min: 0, max: 2 });
    let params = [siteName, logo, tweak, incentive];
    client
      .query(
        'INSERT INTO sites(site_name, logo, tweak, incentive) VALUES($1,$2,$3,$4)',
        params
      )
      .then(res => {
        console.log(`${index}sites added;`);
      })
      .catch(e => console.error(e.stack));
  }
};

const hotels1 = () => {
  for (let index = 0; index < 3333333; index++) {
    const standardRate = faker.random.number({ min: 200, max: 1200 });
    const adultPremium = faker.finance.amount(0.1, 0.2, 2);
    const childPremium = faker.finance.amount(0.05, 0.1, 2);
    const maxStay = faker.random.number({ min: 14, max: 28 });
    const deal =
      faker.random.number({ min: 1, max: 10 }) > 4
        ? faker.lorem.sentence((word_count = 2))
        : '';

    const params = [standardRate, adultPremium, childPremium, maxStay, deal];
    client
      .query(
        'INSERT INTO hotels(standard_rate, adult_premium, child_premium, max_stay, deal) VALUES($1,$2,$3,$4,$5)',
        params
      )
      .then(res => console.log(`${index} hotels added;`))
      .catch(e => console.error(e.stack));
  }
};
const hotels2 = () => {
  for (let index = 0; index < 3333333; index++) {
    const standardRate = faker.random.number({ min: 200, max: 1200 });
    const adultPremium = faker.finance.amount(0.1, 0.2, 2);
    const childPremium = faker.finance.amount(0.05, 0.1, 2);
    const maxStay = faker.random.number({ min: 14, max: 28 });
    const deal =
      faker.random.number({ min: 1, max: 10 }) > 4
        ? faker.lorem.sentence((word_count = 2))
        : '';

    const params = [standardRate, adultPremium, childPremium, maxStay, deal];
    client
      .query(
        'INSERT INTO hotels(standard_rate, adult_premium, child_premium, max_stay, deal) VALUES($1,$2,$3,$4,$5)',
        params
      )
      .then(res => console.log(`${index} hotels added;`))
      .catch(e => console.error(e.stack));
  }
};

const hotels3 = () => {
  for (let index = 0; index < 3333334; index++) {
    const standardRate = faker.random.number({ min: 200, max: 1200 });
    const adultPremium = faker.finance.amount(0.1, 0.2, 2);
    const childPremium = faker.finance.amount(0.05, 0.1, 2);
    const maxStay = faker.random.number({ min: 14, max: 28 });
    const deal =
      faker.random.number({ min: 1, max: 10 }) > 4
        ? faker.lorem.sentence((word_count = 2))
        : '';

    const params = [standardRate, adultPremium, childPremium, maxStay, deal];
    client
      .query(
        'INSERT INTO hotels(standard_rate, adult_premium, child_premium, max_stay, deal) VALUES($1,$2,$3,$4,$5)',
        params
      )
      .then(res => console.log(`${index} hotels added;`))
      .catch(e => console.error(e.stack));
  }
};

let daysAdded = 0;

seedDates = () => {
  let datePremium = faker.finance.amount(0.6, 1.5, 2);

  let params = [datePremium];

  client.query(
    'INSERT INTO dates (date_premium) VALUES ($1)',
    params,
    (err, results) => {
      if (err) {
        console.log(
          `ERROR! There was an error adding a day with an id of ${daysAdded +
            1} to the dates table`
        );
      } else {
        daysAdded++;
        console.log(
          `SUCCESS! Added a day with an id of ${daysAdded} to the dates table`
        );
        if (daysAdded < 366) {
          seedDates();
        }
      }
    }
  );
};

sites1();
sites2();
sites3();
hotels1();
hotels2();
hotels3();
seedDates();

//    CREATE TABLE sites (
//     id serial PRIMARY KEY NOT NULL,
//     site_name CHAR (50),
//     logo char (25),
//     tweak decimal,
//     incentive decimal
//     );

// CREATE TABLE hotel (
//   id serial PRIMARY KEY NOT NULL,
//   standard_rate decimal,
//   adult_premium decimal,
//   child_premium decimal,
//   max_stay decimal,
//   deal char(25)
// );

// CREATE TABLE dates (
//    id serial PRIMARY KEY NOT NULL,
//    date_premium decimal
// );
