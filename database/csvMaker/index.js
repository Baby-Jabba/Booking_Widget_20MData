const { Client } = require('pg');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const postgresSQLclient = new Client({
  user: 'postgres',
  database: 'sec_hrr43',
  password: '123456',
  port: 5432
});

postgresSQLclient.connect();

const makeHotelCSV = callback => {
  postgresSQLclient.query('select * from hotels', (err, result) => {
    if (err) {
      callback(error, null);
    } else {
      let csv = result.rows;
      const csvWriter = createCsvWriter({
        path: '/Users/yuhangchen/Documents/data/hotels.csv',
        header: [
          { id: 'id', title: 'ID' },
          { id: 'standard_rate', title: 'STANDARD_RATE' },
          { id: 'adult_premium', title: 'ADULT_PREMIUM' },
          { id: 'child_premium', title: 'CHILD_PREMIUM' },
          { id: 'max_stay', title: 'MAX_STAY' },
          { id: 'deal', title: 'DEAL' }
        ]
      });

      csvWriter
        .writeRecords(csv) // returns a promise
        .then(() => {
          console.log('...Done');
        });
      callback('hotels.csv is made successfully!');
    }
  });
};

makeDates = () => {
  postgresSQLclient.query('select * from dates', (err, result) => {
    if (err) {
      callback(error, null);
    } else {
      let csv = result.rows;
      const csvWriter = createCsvWriter({
        path: '/Users/yuhangchen/Documents/data/dates.csv',
        header: [
          { id: 'id', title: 'ID' },
          { id: 'date_premium', title: 'DATE_PREMIUM' }
        ]
      });

      csvWriter
        .writeRecords(csv) // returns a promise
        .then(() => {
          console.log('...Done');
        });
    }
  });
};

const makeSitesCSV = () => {
  postgresSQLclient.query(
    'select * from sites where id > 2500000',
    (err, result) => {
      if (err) {
        callback(error, null);
      } else {
        const csvWriter = createCsvWriter({
          path: '/Users/yuhangchen/Documents/data/sites1.csv',
          header: [
            { id: 'id', title: 'ID' },
            { id: 'site_name', title: 'SITE_NAME' },
            { id: 'logo', title: 'LOGO' },
            { id: 'tweak', title: 'TWEAK' },
            { id: 'incentive', title: 'INCENTIVE' }
          ]
        });

        csvWriter
          .writeRecords(result.rows) // returns a promise
          .then(() => {
            console.log('...sites.csv Done');
          });
      }
    }
  );
};

// makeHotelCSV((err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// });

//makeSitesCSV();
makeDates();
