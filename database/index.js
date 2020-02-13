const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'HRR43_FEC',
  port: 3306
});

connection.connect(err => {
  if (err) {
    console.log(err.stack);
    return;
  } else {
    console.log('connected to database');
  }
});

const getSingleSiteQueal = 'SELECT * FROM sites where id = ?';
const addAnewSiteQueal =
  'Insert into sites(site_name,logo,tweak,incentive) value(?,?,?,?)';
const updateASiteQueal =
  'UPDATE sites set site_name =? ,logo=?,tweak=?,incentive=? WHERE id =?';
// get a hotel's record
const deleteASiteQueal = 'DELETE FROM sites where id =? ';

const getTargetHotelInfo = (id, callback) => {
  connection.query(`SELECT * FROM hotels WHERE id=${id}`, (error, results) => {
    if (error) callback(error, null);
    callback(null, results);
  });
};

// get date_premiums for each day of the proposed stay
const getDatePremiumsForStay = (hotel, checkIn, checkOut, callback) => {
  connection.query(
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

// get all the site records
const getSites = (hotel, averageDatePremium, callback) => {
  connection.query(`SELECT * FROM sites`, (error, results) => {
    if (error) callback(error, null);
    callback(null, results);
  });
};

//get
const getSingleSite = (id, callback) => {
  connection.query(getSingleSiteQueal, [id], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

//add
const addAnewSite = (site_name, logo, tweak, incentive, callback) => {
  connection.query(
    addAnewSiteQueal,
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
  connection.query(deleteASiteQueal, [id], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

//update
const updateASite = (id, site_name, logo, tweak, incentive, callback) => {
  connection.query(
    updateASiteQueal,
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

module.exports = {
  connection,
  getTargetHotelInfo,
  getDatePremiumsForStay,
  getSites,
  getSingleSite,
  addAnewSite,
  updateASite,
  deleteASite
};
