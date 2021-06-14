"use strict";

const shopifyACO = document.querySelector("#shopify-aco");
const shopifyFullACO = document.querySelector("#shopify-full-aco");
const supremeACO = document.querySelector("#supreme-aco");

document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.sync.get("shopifyAcoEnabled", function (result) {
    if (result.shopifyAcoEnabled != null) {
      shopifyACO.checked = result.shopifyAcoEnabled;
    }
  });

  chrome.storage.sync.get("shopifyFullACOEnabled", function (result) {
    if (result.shopifyFullACOEnabled != null) {
      shopifyFullACO.checked = result.shopifyFullACOEnabled;
    }
  });

  chrome.storage.sync.get("supremeAcoEnabled", function (result) {
    if (result.supremeAcoEnabled != null) {
      supremeACO.checked = result.supremeAcoEnabled;
    }
  });

  shopifyACO.addEventListener("click", shopifyButtonPress);
  shopifyFullACO.addEventListener("click", shopifyACOButtonPress);
  supremeACO.addEventListener("click", supremeButtonPress);
});

const shopifyButtonPress = e => {
  console.log(shopifyACO.checked);
  chrome.storage.sync.set(
    { shopifyAcoEnabled: shopifyACO.checked },
    function () {
      console.log("confirmed");
    }
  );
};

const shopifyACOButtonPress = e => {
  console.log(shopifyFullACO.checked);
  chrome.storage.sync.set(
    { shopifyFullACOEnabled: shopifyFullACO.checked },
    function () {
      console.log("confirmed");
    }
  );
};

const supremeButtonPress = e => {
  console.log(supremeACO.checked);
  chrome.storage.sync.set(
    { supremeAcoEnabled: supremeACO.checked },
    function () {
      console.log("confirmed");
    }
  );
};
