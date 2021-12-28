const flights = document.querySelector(".flights");

async function fetchData() {
  const config = {
    headers: {
      Authorization: "o6PwfW1VPO2fksdRbkvRAt1ADG0C",
    },
  };

  const response = await fetch(
    "https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=BOS",
    {
      headers: {
        Authorization: "Bearer o6PwfW1VPO2fksdRbkvRAt1ADG0C",
      },
    }
  );
  const { data } = await response.json();

  data.forEach((elem) => {
    const div = document.createElement("div");
    div.innerText = elem.origin + "-" + elem.destination;
    flights.appendChild(div);
  });
}
fetchData();
