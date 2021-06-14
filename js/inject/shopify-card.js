window.onload = function () {
  chrome.storage.sync.get(
    { ["ShopifyProfile"]: {}, shopifyToggle: 0, shopifyFullACOEnabled: false },
    function (result) {
      let shopifyToggle = result.shopifyToggle;
      let shopifyFullACOEnabled = result.shopifyFullACOEnabled;

      console.log(shopifyFullACOEnabled);

      console.log("Value currently is " + result["ShopifyProfile"]);
      console.log(JSON.stringify(result["ShopifyProfile"]));
      profile = JSON.stringify(result["ShopifyProfile"]);

      let profileJSON = JSON.parse(profile);
      console.log(profileJSON);

      let found = profileJSON.find(function (field, i) {
        if (field.site === "shopify") {
          return true;
        }
      });
      console.log(found);

      if (shopifyToggle) {
        if (found) {
          try {
            fillForm(found);
          } catch (e) {}
        }
      }
    }
  );
};

function fillForm(found) {
  let fields = {
    number: found.cardNumber,
    name: found.name,
    expiry: `${found.cardExpMonth}/${found.cardExpYear}`,
    verification_value: found.cardCVV,
  };

  Object.keys(fields).forEach(id => {
    fillField(id, fields[id]);
  });

  chrome.runtime.sendMessage({ action: "completeCheckout" });
}

function fillField(id, value) {
  let element = document.getElementById(id);
  if (element) {
    element.focus();
    element.value = value;
    element.dispatchEvent(new Event("change"));
    element.blur();
  }
}
