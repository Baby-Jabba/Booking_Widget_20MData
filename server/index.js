const express = require('express');
const connection = require('../database');
const app = express();

app.use(express.json());
app.use('/bundle.js', express.static(__dirname + '/../public/bundle.js'));
app.use(express.urlencoded({ extended: false }));
app.use('/:id', express.static('./public'));

const PORT = process.env.BOOKING_PORT || 50003;

app.post('/api/booking/:id/', (req, res) => {
  console.log(req.body.checkIn);
  // get the record for the hotel corresponding to the id passed through the url
  connection.getTargetHotelInfo(req.params.id, (error, hotel) => {
    if (error) {
      console.error(error);
    } else {
      //check if proposed stay is longer than hotel's max_stay property - if so, update hotel with max_stay_exceeded property, set its value to true, and send as response.
      if (req.body.checkOut - req.body.checkIn > hotel[0].max_stay) {
        hotel[0].max_stay_exceeded = true;
        res.status(200).send(hotel);
      } else {
        // otherwise, pass hotel to getDatePremiumsForStay to maintain access for further processing
        connection.getDatePremiumsForStay(
          hotel,
          req.body.checkIn,
          req.body.checkOut,
          (error, datePremiums) => {
            if (error) {
              console.log(error);
            } else {
              // calculate average date premium for the stay
              let averageDatePremium =
                datePremiums.reduce((acc, datePremium) => {
                  return acc + datePremium.date_premium;
                }, 0) / datePremiums.length;

              // pass hotel and datePremium into getSites to maintain access for further processing
              connection.getSites(hotel, averageDatePremium, (error, sites) => {
                if (error) {
                  console.log(error);
                } else {
                  // store value of hotel's own deal property to pricingAndDealData AND initialize a prices array to be populated below
                  let pricingAndDealData = { deal: hotel[0].deal, prices: [] };

                  // calculate average price for the stay factoring in all variables EXCEPT each site's unique tweak factor
                  let adultExtraCost =
                    req.body.adults > 2
                      ? (req.body.adults - 2) *
                        hotel[0].adult_premium *
                        hotel[0].standard_rate
                      : 0;
                  let childrenExtraCost =
                    req.body.children > 1
                      ? (req.body.children - 1) *
                        hotel[0].child_premium *
                        hotel[0].standard_rate
                      : 0;

                  let averagePrice =
                    (hotel[0].standard_rate +
                      adultExtraCost +
                      childrenExtraCost) *
                    averageDatePremium;

                  // apply each site's tweak factor to the averagePrice, make a site Object with name and price properties, push to pricingAndDealData

                  sites.forEach(site => {
                    pricingAndDealData.prices.push({
                      name: site.site_name,
                      price: Math.ceil(averagePrice * site.tweak),
                      logo: site.logo,
                      incentive: site.incentive
                    });
                  });

                  //send the formatted data
                  res.status(200).send(pricingAndDealData);
                }
              });
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

app.get('/api/get', (req, res) => {
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
