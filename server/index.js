require('newrelic');
const express = require('express');
const connection = require('../database/index');
const app = express();

app.use(express.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use('/bundle.js', express.static(__dirname + '/../public/bundle.js'));
app.use(
  '/loaderio-c4f7aaa46044d73a9734101b127559e4.js',
  express.static(
    __dirname + '/../public/loaderio-c4f7aaa46044d73a9734101b127559e4.js'
  )
);
app.use(express.urlencoded({ extended: false }));
app.use('/:id', express.static('./public'));

const PORT = process.env.BOOKING_PORT || 50003;

app.post('/api/booking/:id/', (req, res) => {
  // get the record for the hotel corresponding to the id passed through the url
  console.log('123');
  connection.getTargetHotelInfo(req.params.id, (error, hotel) => {
    if (error) {
      console.error(error);
    } else {
      //check if proposed stay is longer than hotel's max_stay property - if so, update hotel with max_stay_exceeded property, set its value to true, and send as response.
      if (
        req.body.checkOut - req.body.checkIn >
        Number(hotel.rows[0].max_stay)
      ) {
        hotel.rows[0].max_stay_exceeded = true;
        res.status(200).send(hotel.rows[0]);
      } else {
        // otherwise, pass hotel to getDatePremiumsForStay to maintain access for further processing
        connection.getDatePremiumsForStay(
          hotel.rows[0],
          req.body.checkIn,
          req.body.checkOut,
          (error, datePremiums) => {
            if (error) {
              console.log(error);
            } else {
              let result = [];
              let x = datePremiums.rows;
              //console.log(datePremiums);
              for (let i = 0; i < x.length; i++) {
                result.push(Number(x[i].date_premium));
              }
              // calculate average date premium for the stay
              let averageDatePremium =
                result.reduce(
                  (accumulator, currentValue) => accumulator + currentValue
                ) / result.length;
              // pass hotel and datePremium into getSites to maintain access for further processing
              connection.getSites(
                hotel.rows[0],
                averageDatePremium,
                (error, sites) => {
                  //console.log(sites);
                  if (error) {
                    console.log(error);
                  } else {
                    // store value of hotel's own deal property to pricingAndDealData AND initialize a prices array to be populated below
                    let pricingAndDealData = {
                      deal: Number(hotel.rows[0].deal),
                      prices: []
                    };

                    // calculate average price for the stay factoring in all variables EXCEPT each site's unique tweak factor
                    let adultExtraCost =
                      req.body.adults > 2
                        ? (req.body.adults - 2) *
                          Number(hotel.rows[0].adult_premium) *
                          Number(hotel.rows[0].standard_rate)
                        : 0;
                    let childrenExtraCost =
                      req.body.children > 1
                        ? (req.body.children - 1) *
                          Number(hotel.rows[0].child_premium) *
                          Number(hotel.rows[0].standard_rate)
                        : 0;

                    let averagePrice =
                      (Number(hotel.rows[0].standard_rate) +
                        adultExtraCost +
                        childrenExtraCost) *
                      averageDatePremium;

                    // apply each site's tweak factor to the averagePrice, make a site Object with name and price properties, push to pricingAndDealData
                    //console.log(sites);

                    sites.rows.forEach(site => {
                      pricingAndDealData.prices.push({
                        name: site.site_name,
                        price: Math.ceil(averagePrice * Number(site.tweak)),
                        logo: site.logo,
                        incentive: Number(site.incentive)
                      });
                    });
                    //send the formatted date
                    //console.log(pricingAndDealData);
                    res.status(200).send(pricingAndDealData);
                  }
                }
              );
            }
          }
        );
      }
    }
  });
});

//add
app.post('/api/addSite', (req, res) => {
  let site_name = req.body.site_name;
  let logo = req.body.logo;
  let tweak = req.body.tweak;
  let incentive = req.body.incentive;

  connection.addAnewSite(site_name, logo, tweak, incentive, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

//delete
app.delete('/api/delete', (req, res) => {
  const id = req.query.id;
  connection.deleteASite(id, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

//update
app.put('/api/updateSite', (req, res) => {
  let id = req.body.id;
  let site_name = req.body.site_name;
  let logo = req.body.logo;
  let tweak = req.body.tweak;
  let incentive = req.body.incentive;
  connection.updateASite(
    id,
    site_name,
    logo,
    tweak,
    incentive,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get('/api/get/:id', (req, res) => {
  const id = req.query.id;
  console.log(id);
  connection.getSingleSite(id, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
