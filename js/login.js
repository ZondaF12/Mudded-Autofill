"use strict";

// Elements
const loginBtn = document.querySelector("#activate");
const API_KEY = "pk_blCqQNGOEeLfp5MvPyAqY2BFxbP3jpWZ";
const getLicense = localStorage.getItem("keyFound");
console.log(getLicense);

document.addEventListener("DOMContentLoaded", function () {
  loginBtn.addEventListener("click", loginSequence);
});

const loginSequence = async function () {
  const licenseKey = document.querySelector("#key").value;
  if (licenseKey != undefined) retrieveLicense(licenseKey);
  else console.log("No Key found!");
};

if (getLicense != null) {
  location.replace("popup.html");
} else {
  loginSequence();
}

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
