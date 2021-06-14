"use strict";

// Selecting Elements
const shopifyBtn = document.querySelector("#shopify-btn");
const stripeBtn = document.querySelector("#stripe-btn");
const supremeBtn = document.querySelector("#supreme-btn");
const powerSwitch = document.querySelector("#checkbox");

document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.sync.get({ shopifyToggle: 0 }, function (result) {
    let shopifyToggle = result.shopifyToggle;
    if (shopifyToggle == 1) {
      shopifyBtn.style.backgroundColor = "#a6d9ca";
    } else {
      shopifyBtn.style.backgroundColor = "#387773";
    }
  });
  chrome.storage.sync.get({ stripeToggle: 0 }, function (result) {
    let stripeToggle = result.stripeToggle;
    if (stripeToggle == 1) {
      stripeBtn.style.backgroundColor = "#a6d9ca";
    } else {
      stripeBtn.style.backgroundColor = "#387773";
    }
  });
  chrome.storage.sync.get({ supremeToggle: 0 }, function (result) {
    let supremeToggle = result.supremeToggle;
    if (supremeToggle == 1) {
      supremeBtn.style.backgroundColor = "#a6d9ca";
    } else {
      supremeBtn.style.backgroundColor = "#387773";
    }
  });

  shopifyBtn.addEventListener("click", shopifyButtonPress);
  stripeBtn.addEventListener("click", stripeButtonPress);
  supremeBtn.addEventListener("click", supremeButtonPress);
});

const shopifyButtonPress = e => {
  e.preventDefault();
  // Button activation when clicked
  chrome.storage.sync.get({ shopifyToggle: 0 }, function (result) {
    let shopifyToggle = result.shopifyToggle;
    if (shopifyToggle == 0) {
      shopifyBtn.style.backgroundColor = "#a6d9ca";
      shopifyToggle = 1;
      console.log(shopifyToggle);
    } else {
      shopifyBtn.style.backgroundColor = "#387773";
      shopifyToggle = 0;
      console.log(shopifyToggle);
    }
    chrome.storage.sync.set({ shopifyToggle: shopifyToggle });
  });
};

const stripeButtonPress = e => {
  e.preventDefault();
  // Button activation when clicked
  chrome.storage.sync.get({ stripeToggle: 0 }, function (result) {
    let stripeToggle = result.stripeToggle;
    if (stripeToggle == 0) {
      stripeBtn.style.backgroundColor = "#a6d9ca";
      stripeToggle = 1;
      console.log(stripeToggle);
    } else {
      stripeBtn.style.backgroundColor = "#387773";
      stripeToggle = 0;
      console.log(stripeToggle);
    }
    chrome.storage.sync.set({ stripeToggle: stripeToggle });
  });
};

const supremeButtonPress = e => {
  e.preventDefault();
  // Button activation when clicked
  chrome.storage.sync.get({ supremeToggle: 0 }, function (result) {
    let supremeToggle = result.supremeToggle;
    if (supremeToggle == 0) {
      supremeBtn.style.backgroundColor = "#a6d9ca";
      supremeToggle = 1;
      console.log(supremeToggle);
    } else {
      supremeBtn.style.backgroundColor = "#387773";
      supremeToggle = 0;
      console.log(supremeToggle);
    }
    chrome.storage.sync.set({ supremeToggle: supremeToggle });
  });
};
