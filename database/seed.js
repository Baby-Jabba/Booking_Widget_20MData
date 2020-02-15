var faker = require('faker');
const db = require('./index.js');

////////////////////

//   THIS IS THE SEEDER FOR          ---->MYSQL<------

////////////

// POPULATE hotels TABLE WITH 5000000 HOTELS

// CREATE TABLE hotels (
//   id int NOT NULL AUTO_INCREMENT,
//   standard_rate decimal,
//   adult_premium decimal,
//   child_premium decimal,
//   max_stay decimal,
//   deal varchar(25),
//   PRIMARY KEY(id)
// );

let hotelsAdded = 0;

let seedHotels = () => {
  let standardRate = faker.random.number({ min: 200, max: 1200 });
  let adultPremium = faker.finance.amount(0.1, 0.2, 2);
  let childPremium = faker.finance.amount(0.05, 0.1, 2);
  let maxStay = faker.random.number({ min: 14, max: 28 });
  let deal =
    faker.random.number({ min: 1, max: 10 }) > 4
      ? faker.lorem.sentence((word_count = 2))
      : '';

  let params = [standardRate, adultPremium, childPremium, maxStay, deal];

  db.connection.query(
    'INSERT INTO hotels (standard_rate, adult_premium, child_premium, max_stay, deal) VALUES (?, ?, ?, ?, ?)',
    params,
    (err, result) => {
      if (err) {
        console.log(
          `ERROR! There was an error adding a hotel with an id of ${hotelsAdded +
            1} to the hotels table`
        );
      } else {
        hotelsAdded++;
        console.log(
          `SUCCESS! Added a hotel with an id of ${hotelsAdded} to the hotels table`
        );
        if (hotelsAdded < 5000000) {
          seedHotels();
        }
      }
    }
  );
};

// POPULATE sites TABLE WITH 5000000 SITES

// CREATE TABLE sites (
//   id int NOT NULL AUTO_INCREMENT,
//   site_name varchar(25),
//   logo varchar(200),
//   tweak decimal,
//   incentive decimal,
//   PRIMARY KEY(id)
// );

let sitesAdded = 0;

seedSites = () => {
  let siteName = `${faker.company.catchPhraseAdjective()}.com`;
  let logo = null;
  let tweak = faker.finance.amount(0.8, 1, 2);
  let incentive = faker.random.number({ min: 0, max: 2 });

  let params = [siteName, logo, tweak, incentive];

  db.connection.query(
    'INSERT INTO sites (site_name, logo, tweak, incentive) VALUES (?, ?, ?, ?)',
    params,
    (err, results) => {
      if (err) {
        console.log(
          `ERROR! There was an error adding a site with an id of ${sitesAdded +
            1} to the sites table`
        );
      } else {
        sitesAdded++;
        console.log(
          `SUCCESS! Added a site with an id of ${sitesAdded} to the sites table`
        );
        if (sitesAdded < 5000000) {
          seedSites();
        }
      }
    }
  );
};

// POPULATE dates TABLE WITH 366 DATES (2020 is a leap year and I will be using the entire 2020 for my sample data);

// CREATE TABLE dates (
//   id int NOT NULL AUTO_INCREMENT,
//   date_premium decimal,
//   PRIMARY KEY(id)
// );

let daysAdded = 0;

seedDates = () => {
  let datePremium = faker.finance.amount(0.6, 1.5, 2);

  let params = [datePremium];

  db.connection.query(
    'INSERT INTO dates (date_premium) VALUES (?)',
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

//CALL SEED FUNCS
seedHotels();
seedSites();
seedDates();

module.exports = {
  seedHotels,
  seedSites,
  seedDates
};
