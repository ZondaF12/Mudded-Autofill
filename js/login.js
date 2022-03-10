"use strict";

// Elements
const loginBtn = document.querySelector("#activate");
// Variables
const API_KEY = "pk_blCqQNGOEeLfp5MvPyAqY2BFxbP3jpWZ";

let getLicense = localStorage.getItem("keyFound");

window.onload = function () {
  if (getLicense) {
    getLicense = JSON.parse(getLicense);
    console.log(getLicense.key);
    checkKey(getLicense.key);
  } else {
    loginBtn.addEventListener("click", loginSequence);
  }
};

const checkKey = async function (key) {
  try {
    const license = await fetch(`https://api.hyper.co/v4/licenses/${key}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    }).then(res => res.json());
    console.log(license.plan.active);

    if (getLicense.key != null && license.plan.active === true) {
      location.replace("popup.html");
    }
  } catch {
    loginBtn.addEventListener("click", loginSequence);
  }
};

const loginSequence = async function () {
  console.log(1);
  const licenseKey = document.querySelector("#key").value;
  if (licenseKey != undefined) retrieveLicense(licenseKey);
  else console.log("No Key found!");
};

function log(content) {
  const now = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
  console.log(now, content);
}

async function retrieveLicense(key) {
  try {
    const license = await fetch(`https://api.hyper.co/v4/licenses/${key}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    }).then(res => res.json());

    if (license && key) {
      console.log("license found");
      localStorage.setItem("keyFound", JSON.stringify(license));
      location.replace("popup.html");
    }
  } catch {
    alert("License not found!");
    throw new Error("License not found");
  }
}

async function updateLicense(key, hwid) {
  await fetch(`https://api.hyper.co/v4/licenses/${key}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      metadata: { hwid },
    }),
  });
}

async function checkLicense(license) {
  license = await retrieveLicense("XXXX-XXXX-XXXX-XXXX");
  if (license.metadata.hwid)
    console.log("License is already in use on another machine");
  else console.log("License is good to go!");
}
