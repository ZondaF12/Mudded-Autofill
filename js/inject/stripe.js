window.onload = function () {
  chrome.storage.sync.get(["StripeProfile"], function (result) {
    console.log("Value currently is " + result["StripeProfile"]);
    console.log(JSON.stringify(result["StripeProfile"]));
    profile = JSON.stringify(result["StripeProfile"]);

    let profileJSON = JSON.parse(profile);
    console.log(profileJSON);

    let found = profileJSON.find(function (field, i) {
      if (field.site === "stripe") {
        return true;
      }
    });
    console.log(found);
    fillInfoForm(found);
  });
};

const fillInfoForm = found => {
  let fields = {
    email: found.email,
    billingName: found.name,
    cardNumber: found.cardNumber,
    cardExpiry: `${found.cardExpMonth}/${found.cardExpYear.slice(-2)}`,
    cardCvc: found.cardCVV,
    billingPostalCode: found.postcode,
  };

  Object.keys(fields).forEach(id => {
    fillField(id, fields[id]);
  });
};

function fillField(id, value) {
  let element = document.getElementById(id);
  if (element) {
    element.focus();
    element.value = value;
    element.dispatchEvent(new Event("change"));
  }
  // element.blur();
}
