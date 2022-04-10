/* global Frames */
var payButton = document.getElementById("pay-button");
var form = document.getElementById("payment-form");
var errorStack = [];
var pKeyOld = "pk_test_8ac41c0d-fbcc-4ae3-a771-31ea533a2beb"
var pKey = "pk_test_4296fd52-efba-4a38-b6ce-cf0d93639d8a"
var sKey = "sk_test_0b9b5db6-f223-49d0-b68f-f6643dd4f808"
var gamount = 0;
let gRespToken = "";
var gCurrency = "GBP";
var gUrl = "https://api.sandbox.checkout.com/payments";
// Old key. Frames.init("pk_test_8ac41c0d-fbcc-4ae3-a771-31ea533a2beb");
Frames.init(pKey);

Frames.addEventHandler(
  Frames.Events.CARD_VALIDATION_CHANGED,
  onCardValidationChanged
);
function onCardValidationChanged(event) {
  console.log("CARD_VALIDATION_CHANGED: %o", event);
  payButton.disabled = !Frames.isCardValid();
}

Frames.addEventHandler(
  Frames.Events.FRAME_VALIDATION_CHANGED,
  onValidationChanged
);
function onValidationChanged(event) {
  console.log("FRAME_VALIDATION_CHANGED: %o", event);

  var errorMessageElement = document.querySelector(".error-message");
  var hasError = !event.isValid && !event.isEmpty;

  if (hasError) {
    errorStack.push(event.element);
  } else {
    errorStack = errorStack.filter(function (element) {
      return element !== event.element;
    });
  }

  var errorMessage = errorStack.length
    ? getErrorMessage(errorStack[errorStack.length - 1])
    : "";
  errorMessageElement.textContent = errorMessage;
}

function getErrorMessage(element) {
  var errors = {
    "card-number": "Please enter a valid card number",
    "expiry-date": "Please enter a valid expiry date",
    cvv: "Please enter a valid cvv code",
  };

  return errors[element];
}

Frames.addEventHandler(
  Frames.Events.CARD_TOKENIZATION_FAILED,
  onCardTokenizationFailed
);
function onCardTokenizationFailed(error) {
  console.log("CARD_TOKENIZATION_FAILED: %o", error);
  Frames.enableSubmitForm();
}

Frames.addEventHandler(Frames.Events.CARD_TOKENIZED, onCardTokenized);
function onCardTokenized(event) 
{
     
    gRespToken = event.token;
 /*   var el2 = document.querySelector(".Request-Data");
    el2.getElementById("TokenData").value = sRespToken; 
*/
    //let sxRespToken = event.token;
    //var el2 = document.querySelector(".Res-Data");
    //el2.getElementsByTagName("TokenData").value = new text (sRespToken);
    //el2.getElementById("TokenData").value = new (sRespToken); 

    //document.getElementById("TokenData").value = new(sRespToken);
    var el = document.querySelector(".success-payment-message");
    //el.getElementById("RespToken").label = sRespToken;
    el.innerHTML = event.token;
 /*   "Card tokenization completed<br>" +
    'Your card token is: <span class="token">' +
    sRespToken +
    "</span>";
 */
    //el.nodeValue = event.token;

    //var vel = document.querySelector(".Res-Data");
    //vel.getElementsByTagName("TokenData").item.




}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  Frames.submitCard();
}



/*function onPaymentRequest()
{
    /*var jsonMessage = "{
        "source": {
          "type": "token",
          "token": "tok_4gzeau5o2uqubbk6fufs3m7p54"
        },
        "amount": 6500,
        "currency": "USD",
        "reference": "ORD-5023-4E89",
        "metadata": {
          "udf1": "TEST123",
          "coupon_code": "NY2018",
          "partner_id": 123989
        }
      }
    ";
    
    const obj = JSON.parse(PostRequestMsg());
    var baseurl = "https://api.sandbox.checkout.com/payments"
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST",baseurl,true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    //xmlhttp.send(JSON.stringify({ "email": "hello@user.com", "response": { "name": "Tester" } }));
    xmlhttp.send(JSON.stringify(obj));

    xmlhttp.onreadystatechange = function()
    {
        if(xmlhttp.readyState ===4 && xmlhttp.status ===200)
        {
            var persons = JSON.parse(xmlhttp.responseText);
            var tbltop = `<table>
            <tr><th>Id</th><th>First Name</th><th>Last Name</th><th>Age</th></tr>`;
            //main table content we fill from data from the rest call
            var main ="";
            for (i = 0; i < persons.length; i++)
            {
                main += "<tr><td>"+persons[i].id+"</td><td>"+persons[i].firstName+"</td><td>"+persons[i].lastName+"</td><td>"+persons[i].age+"</td></tr>";
            }
            var tblbottom = "</table>";
            var tbl = tbltop + main + tblbottom;
            document.getElementById("personinfo").innerHTML = tbl;
        }
    };
    xmlhttp.send();
}
*/
);
