//-----------PostgresSQL------------------
const { Client } = require('pg');

const postgresSQLclient = new Client({
  user: 'postgres',
  database: 'sec_hrr43',
  password: '123456',
  port: 5432
});
postgresSQLclient.connect();

const getTargetHotelInfo = (id, callback) => {
  postgresSQLclient.query(
    `SELECT * FROM hotels WHERE id=$1`,
    [id],
    (error, results) => {
      if (error) callback(error, null);
      callback(null, results);
    }
  );
};

const getSites = (hotel, averageDatePremium, callback) => {
  postgresSQLclient.query(
    'SELECT * FROM sites where id > $1 and id < $2',
    [1, 20],
    (error, results) => {
      if (error) callback(error, null);
      callback(null, results);
    }
  );
};

//read;
const getSingleSite = (id, callback) => {
  postgresSQLclient.query(
    'select * from sites where id = $1',
    [id],
    (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    }
  );
};

//add
const addAnewSite = (site_name, logo, tweak, incentive, callback) => {
  postgresSQLclient.query(
    'insert into sites(site_name, logo, tweak, incentive) values ($1,$2,$3,$4)',
    [site_name, logo, tweak, incentive],
    (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    }
  );
};

//delete
const deleteASite = (id, callback) => {
  console.log(id);
  postgresSQLclient.query(
    'delete from sites where id = $1',
    [id],
    (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    }
  );
};

//get date_premiums for each day of the proposed stay
const getDatePremiumsForStay = (hotel, checkIn, checkOut, callback) => {
  postgresSQLclient.query(
    `SELECT * FROM dates WHERE id>=${checkIn} AND id<=${checkOut}`,
    (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    }
  );
};

const updateASite = (id, site_name, logo, tweak, incentive, callback) => {
  postgresSQLclient.query(
    'update sites set site_name = $1, logo= $2, tweak=$3,incentive =$4 where id =$5',
    [site_name, logo, tweak, incentive, id],
    (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    }
  );
};

//-----------PostgresSQL------------------
module.exports = {
  getTargetHotelInfo,
  getDatePremiumsForStay,
  getSites,
  getSingleSite,
  addAnewSite,
  updateASite,
  deleteASite
};
