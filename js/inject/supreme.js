"use strict";

let profile;

window.onload = function () {
  chrome.storage.sync.get(
    { ["SupremeProfile"]: {}, supremeToggle: 0, supremeAcoEnabled: false },
    function (result) {
      let supremeToggle = result.supremeToggle;
      let supremeAcoEnabled = result.supremeAcoEnabled;

      console.log("Value currently is " + result["SupremeProfile"]);
      profile = JSON.stringify(result["SupremeProfile"]);

      let profileJSON = JSON.parse(profile);
      console.log(profileJSON);

      let found = profileJSON.find(field => field.site === "supreme");
      console.log(found);

      if (supremeToggle) {
        if (found) {
          try {
            fillInfoForm(found, supremeAcoEnabled);
          } catch (e) {}
        }
      }
    }
  );
};

const fillInfoForm = function (found, supremeAcoEnabled) {
  let fields = {
    "#order_billing_name": found.name,
    "#order_email": found.email,
    "#order_tel": found.phone,
    "#bo": found.address1,
    "#oba3": found.address2,
    "#order_billing_city": found.city,
    "#order_billing_zip": found.postcode,
    "#cnb": found.cardNumber,
    "#credit_card_month": found.cardExpMonth,
    "#credit_card_year": found.cardExpYear,
    "#vval": found.cardCVV,
  };

  Object.keys(fields).forEach(id => {
    fillField(id, fields[id]);
  });
  console.log(found.country);
  fillField("#order_billing_country", getCountryCode(found.country), true);
  document.getElementsByClassName("icheckbox_minimal")[1].click();
  document.querySelector(".terms .icheckbox_minimal").classList.add("checked");

  if (supremeAcoEnabled) {
    document.querySelector(".button, .checkout").click();
  }
};

function fillField(id, value) {
  let element = document.querySelector(id);
  if (element) {
    element.focus();
    element.value = value;
    element.dispatchEvent(new Event("change"));
  }
  element.blur();
}

function getCountryCode(country) {
  let countries = {
    "united kingdom": "GB",
    "northern ireland": "NB",
    "united states": "USA",
    canada: "CANADA",
    austria: "AT",
    belarus: "BY",
    belgium: "BE",
    bulgaria: "BG",
    croatia: "HR",
    "czech republic": "CZ",
    denmark: "DK",
    estonia: "EE",
    finland: "FI",
    france: "FR",
    germany: "DE",
    greece: "GR",
    hungary: "HU",
    iceland: "IS",
    ireland: "IE",
    italy: "IT",
    latvia: "LV",
    lithuania: "LT",
    luxembourg: "LU",
    monaco: "MC",
    netherlands: "NL",
    norway: "NO",
    poland: "PL",
    portugal: "PT",
    romania: "RO",
    russia: "RU",
    slovakia: "SK",
    slovenia: "SI",
    spain: "ES",
    sweden: "SE",
    switzerland: "CH",
    turkey: "TR",
  };

  return countries[country.toLowerCase()];
}
