const express = require("express");
const Amadeus = require("amadeus");
const morgan = require("morgan");

require("dotenv").config();

const app = express();

// console.log(Amadeus);
const amadeus = new Amadeus({
  clientId: process.env.API_KEY,
  clientSecret: process.env.API_SECRET,
  grantType: "client_credentials",
});
console.log(amadeus.referenceData.locations);
app.use(express.static("public"));
app.use(morgan("dev"));
app.get("/api/autocomplete", async (request, response) => {
  try {
    const { query } = request;
    const { data } = await amadeus.referenceData.locations.get({
      keyword: query.keyword,
      subType: Amadeus.location.city,
    });
    response.json(data);
  } catch (error) {
    console.error(error);
    response.json([]);
  }
});

app.get("/api/search", async (req, res) => {
  const { query } = req;
  try {
    const { data } = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: query.origin,
      destinationLocationCode: query.destination,
      departureDate: query.departureDate,
      adults: query.adults,
      children: query.children,
      infants: query.infants,
      travelClass: query.travelClass,
      ...(query.returnDate ? { returnDate: query.returnDate } : {}),
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.send(error.message);
  }
});

const port = 5000;
app.listen(port, () => console.log("listening on port" + port));
