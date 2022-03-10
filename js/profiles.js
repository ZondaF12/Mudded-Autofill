"use strict";

// Elements
const save = document.querySelector("#save-profile");
const deleteBtn = document.querySelector("#delete-profile");
const siteSelect = document.getElementById("site-profile");

// Data
let profileShopify = [];
let profileStripe = [];
let profileSupreme = [];
let flattenedProfile = [];
// const profiles = [profileShopify, profileStripe, profileSupreme];

//////////////////// SAVE PROFILES TO CHROME.STORAGE ////////////////////
const getStorageData = key =>
  new Promise((resolve, reject) =>
    chrome.storage.sync.get(key, result =>
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve(result)
    )
  );

// const { data } = await getStorageData("data");

const setStorageData = data =>
  new Promise((resolve, reject) =>
    chrome.storage.sync.set(data, () =>
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve()
    )
  );

// await setStorageData({ data: [someData] });

//////////////////// CREATE PROFILES ////////////////////
const createProfile = async function (arr, name) {
  arr.splice(0, arr.length);

  const profile = {
    site: document.getElementById("site-profile").value,
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    address1: document.getElementById("address1").value,
    address2: document.getElementById("address2").value,
    city: document.getElementById("city").value,
    state: document.getElementById("state").value,
    postcode: document.getElementById("postcode").value,
    country: document.getElementById("country").value,
    card: document.getElementById("card").value,
    cardNumber: document.getElementById("card-number").value,
    cardExpMonth: document.getElementById("cardExpMonth").value,
    cardExpYear: document.getElementById("cardExpYear").value,
    cardCVV: document.getElementById("card-cvv").value,
  };

  arr.push(profile);
  console.log("added", { arr });

  if (document.getElementById("site-profile").value === "shopify") {
    await setStorageData({ ShopifyProfile: arr });
    const profileShopify = await getStorageData("ShopifyProfile");
    console.log(profileShopify);
  } else if (document.getElementById("site-profile").value === "stripe") {
    await setStorageData({ StripeProfile: arr });
    const profileStripe = await getStorageData("StripeProfile");
    console.log(profileStripe);
  } else if (document.getElementById("site-profile").value === "supreme") {
    await setStorageData({ SupremeProfile: arr });
    const profileSupreme = await getStorageData("SupremeProfile");
    console.log(profileSupreme);
  }

  chrome.storage.local.get(console.log);

  // Save to local storage
  // localStorage.setItem(name, JSON.stringify(arr));

  // chromeSave();
};

//////////////////// ADD PROFILES ////////////////////
const addProfile = e => {
  e.preventDefault(); // To stop the form submitting
  if (document.getElementById("site-profile").value === "-") {
    alert("----- is an invalid profile name, please choose a different one");
  } else if (document.getElementById("site-profile").value === "shopify") {
    createProfile(profileShopify, "ShopifyProfile");
  } else if (document.getElementById("site-profile").value === "stripe") {
    createProfile(profileStripe, "StripeProfile");
  } else if (document.getElementById("site-profile").value === "supreme") {
    createProfile(profileSupreme, "SupremeProfile");
  }
};

//////////////////// DELETE PROFILES ////////////////////
const deleteProfile = e => {
  // e.preventDefault(); // To stop the form submitting
  if (document.getElementById("site-profile").value === "shopify") {
    chrome.storage.sync.remove("ShopifyProfile", function () {
      console.log("Shopify Profile deleted!");
    });
  } else if (document.getElementById("site-profile").value === "stripe") {
    chrome.storage.sync.remove("StripeProfile", function () {
      console.log("Stripe Profile deleted!");
    });
  } else if (document.getElementById("site-profile").value === "supreme") {
    chrome.storage.sync.remove("SupremeProfile", function () {
      console.log("Supreme Profile deleted!");
    });
  }
};

//////////////////// STARTUP ////////////////////
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("save-profile").addEventListener("click", addProfile);
  document
    .getElementById("delete-profile")
    .addEventListener("click", deleteProfile);
});

//////////////////// PROFILE FILL ////////////////////

const profileFill = function (arr) {
  document.getElementById("name").value = arr.name;
  document.getElementById("phone").value = arr.phone;
  document.getElementById("email").value = arr.email;
  document.getElementById("address1").value = arr.address1;
  document.getElementById("address2").value = arr.address2;
  document.getElementById("city").value = arr.city;
  document.getElementById("state").value = arr.state;
  document.getElementById("postcode").value = arr.postcode;
  document.getElementById("country").value = arr.country;
  document.getElementById("card").value = arr.card;
  document.getElementById("card-number").value = arr.cardNumber;
  document.getElementById("cardExpMonth").value = arr.cardExpMonth;
  document.getElementById("cardExpYear").value = arr.cardExpYear;
  document.getElementById("card-cvv").value = arr.cardCVV;
};

const jsonStuff = async function (profile, siteName) {
  if (siteName === "shopify") {
    const { ShopifyProfile } = profile;
    console.log(ShopifyProfile);

    let found = ShopifyProfile.find(function (field, i) {
      if (field.site === siteName) {
        return true;
      }
    });
    console.log(found);
    profileFill(found);
  } else if (siteName === "stripe") {
    const { StripeProfile } = profile;
    console.log(StripeProfile);

    let found = StripeProfile.find(function (field, i) {
      if (field.site === siteName) {
        return true;
      }
    });
    console.log(found);
    profileFill(found);
  } else if (siteName === "supreme") {
    const { SupremeProfile } = profile;
    console.log(SupremeProfile);

    let found = SupremeProfile.find(function (field, i) {
      if (field.site === siteName) {
        return true;
      }
    });
    console.log(found);
    profileFill(found);
  }
};

const completeFill = async function (profile, siteName) {
  console.log(profile);
  const foundProfile = await getStorageData(profile);
  console.log(foundProfile);

  if (Object.keys(foundProfile).length != 0) {
    // Checks if profile is empty, if it is the "jsonStuff" function is called, else "blankFill" is called
    jsonStuff(foundProfile, siteName);
  } else {
    blankFill();
  }
};

siteSelect.addEventListener("change", e => {
  console.log(`selected option is ${e.target.value}`);
  if (e.target.value === "-") {
    blankFill();
  } else if (e.target.value === "shopify") {
    completeFill("ShopifyProfile", "shopify");
  } else if (e.target.value === "stripe") {
    completeFill("StripeProfile", "stripe");
  } else if (e.target.value === "supreme") {
    completeFill("SupremeProfile", "supreme");
  }
});

//////////////////// PROFILE FILL - BLANK FORM ////////////////////

const blankFill = function () {
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("email").value = "";
  document.getElementById("address1").value = "";
  document.getElementById("address2").value = "";
  document.getElementById("city").value = "";
  document.getElementById("state").value = "";
  document.getElementById("postcode").value = "";
  document.getElementById("country").value;
  document.getElementById("card").value;
  document.getElementById("card-number").value = "";
  document.getElementById("cardExpMonth").value;
  document.getElementById("cardExpYear").value;
  document.getElementById("card-cvv").value = "";
};
