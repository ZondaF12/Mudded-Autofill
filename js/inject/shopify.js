"use strict";

let profile;
let shopifyFullACOEnabled;

window.onload = function () {
  chrome.storage.sync.get(
    {
      ["ShopifyProfile"]: {},
      shopifyToggle: 0,
      shopifyAcoEnabled: false,
      shopifyFullACOEnabled: false,
    },
    function (result) {
      let shopifyToggle = result.shopifyToggle;
      let shopifyAcoEnabled = result.shopifyAcoEnabled;
      shopifyFullACOEnabled = result.shopifyFullACOEnabled;

      console.log("Value currently is " + result["ShopifyProfile"]);
      profile = JSON.stringify(result["ShopifyProfile"]);

      let profileJSON = JSON.parse(profile);
      console.log(profileJSON);

      let found = profileJSON.find(field => field.site === "shopify");
      console.log(found);

      if (shopifyToggle) {
        if (found) {
          if (currentStep() == "contact_information") {
            try {
              fillInfoForm(found, shopifyAcoEnabled);
            } catch (e) {}
          }
        }
      }
    }
  );
};

const fillInfoForm = function (found, shopifyAcoEnabled) {
  //////////////////// INFORMATION PAGE ////////////////////
  let fields = {
    '[name="checkout[email_or_phone]"]': found.email,
    '[name="checkout[email]"]': found.email,
    "#checkout_email": found.email,
    "#checkout_email_or_phone": found.email,
    "#checkout_shipping_address_first_name": found.name.split(" ", 1),
    "#checkout_shipping_address_last_name": found.name.split(/[, ]+/).pop(),
    "#checkout_shipping_address_address1": found.address1,
    "#checkout_shipping_address_address2": found.address2,
    "#checkout_shipping_address_city": found.city,
    "#checkout_shipping_address_zip": found.postcode,
    "#checkout_shipping_address_phone": found.phone,
    "#checkout_billing_address_first_name": found.name.split(" ", 1),
    "#checkout_billing_address_last_name": found.name.split(/[, ]+/).pop(),
    "#checkout_billing_address_address1": [found.address1, found.address2].join(
      ", "
    ),
    "#checkout_billing_address_address2": found.address2,
    "#checkout_billing_address_city": found.city,
    "#checkout_billing_address_zip": found.postcode,
    "#checkout_billing_address_phone": found.phone,
  };

  Object.keys(fields).forEach(id => {
    fillField(id, fields[id]);
  });

  fillField("#checkout_shipping_address_country", found.country);
  fillField("#checkout_shipping_address_province", found.state);

  fillField("#checkout_billing_address_country", found.country);
  fillField("#checkout_billing_address_province", found.state);

  console.log(containsCaptcha());

  if (shopifyAcoEnabled) {
    if (!containsCaptcha()) {
      continueToNextStep();
    }
  }
};

function fillField(id, value) {
  let element = document.querySelector(id);
  if (element) {
    element.focus();
    element.value = value;
    element.dispatchEvent(new Event("change"));
    element.blur();
  }
}

const currentStep = () => {
  let element = document.querySelector("[data-step]");
  return element.dataset.step;
};

function containsCaptcha() {
  return document.getElementById("g-recaptcha");
}

function continueToNextStep() {
  document.querySelector(".step__footer__continue-btn").click();
}

chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "completeCheckout" && shopifyFullACOEnabled) {
    let completeCheckout = setTimeout(() => {
      continueToNextStep();
      clearTimeout(completeCheckout);
    }, 1000);
  }
});
