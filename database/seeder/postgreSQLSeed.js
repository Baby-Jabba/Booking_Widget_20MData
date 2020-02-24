var faker = require('faker');
const { Pool, Client } = require('pg');

const client = new Client({
  user: 'postgres',
  database: 'sec_hrr43',
  password: '123456',
  port: 5432
});

const sdcClient = new Client({
  user: 'postgres',
  database: 'sec_hrr43',
  password: '123456',
  port: 5432
});

client
  .connect()
  .then(() => {
    console.log('connected to postgresSQL Client!!!');
    return client.query('DROP DATABASE IF EXISTS sec_hrr43');
  })
  .then(() => {
    return client.query('CREATE DATABASE sec_hrr43');
  })
  .then(() => {
    console.log('new database sec_hrr43 created');
    return client.end();
  })
  .then(() => {
    return sdcClient.connect();
  })
  .then(() => {
    console.log('connected to database sdcClient');
    return sdcClient.query(
      `CREATE TABLE sites (
        id serial PRIMARY KEY NOT NULL, ,
        site_name CHAR (500),
        logo char (250),
        tweak decimal,
        incentive decimal
    )`
    );
  })
  .then(() => {
    console.log('Table sites created!');
    return sdcClient.query(
      `CREATE TABLE hotels (
        id serial PRIMARY KEY NOT NULL,
        standard_rate decimal,
        adult_premium decimal,
        child_premium decimal,
        max_stay decimal,
        deal char(250)
    )`
    );
  })
  .then(() => {
    console.log('Table hotels created!');
    return sdcClient.query(
      `CREATE TABLE dates (
       id serial PRIMARY KEY NOT NULL,
       date_premium decimal
    )`
    );
  })
  .then(() => {
    console.log('Table dates created!');
    return makeDataBase(1000, 1000);
    // this will seed 1000 sites and 1000 hotels and 356 days in three different tables
  })
  .catch(err => {
    console.log(err);
  });

const makeDataBase = (sitesNumber, hotelsNumber) => {
  let daysAdded = 0;

  const sites = sitesNumbers => {
    for (let index = 0; index < sitesNumbers; index++) {
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

  const hotels = hotelsNumbers => {
    for (let index = 0; index < hotelsNumbers; index++) {
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

  sites(sitesNumber);
  hotels(hotelsNumber);
  seedDates();
};

//    CREATE TABLE sites (
//     id serial PRIMARY KEY NOT NULL,
//     site_name CHAR (500),
//     logo char (250),
//     tweak decimal,
//     incentive decimal
//     );

// CREATE TABLE hotels (
//   id serial PRIMARY KEY NOT NULL,
//   standard_rate decimal,
//   adult_premium decimal,
//   child_premium decimal,
//   max_stay decimal,
//   deal char(250)
// );

// CREATE TABLE dates (
//    id serial PRIMARY KEY NOT NULL,
//    date_premium decimal
// );
