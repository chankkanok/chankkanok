var sTokenData = "";
function RequestPayment()
{
    let JsonReqMessage = "";
   
    JsonReqMessage = PreparePostRequestMsg();
    //console.log(" JSON Message = " + JsonReqMessage);

    ExchangeMessage(JsonReqMessage);
    
}     

function onchangedata()
{
    var sAmount = document.getElementById("Amount").value;
    gAmount = sAmount.replace(".", '');
    document.getElementById("Amount").value = gAmount;

}

function PreparePostRequestMsg()
{
   
  let jsonMessage = '';
  let strReq1 = '{ "source": {"type": "token","token":"' + gRespToken + '"}';
  let strAmount = ',"amount":' + gAmount;
  let strCurrency = ',"currency": "' + gCurrency + '"';
  let strMore = ',"reference": "ORD-5023-4E89","metadata":{"udf1": "TEST123","coupon_code": "NY2018","partner_id": 123989}'
  let strReqEnd = '}';

  jsonMessage = strReq1 + strAmount + strCurrency + strMore + strReqEnd;

  return jsonMessage;
}

function ExchangeMessage(Msg)
{
  //var status = true;
  let sErr = "";
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "sk_test_0b9b5db6-f223-49d0-b68f-f6643dd4f808");
  myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(Msg);

  console.log( "testsend DATA : " + Msg);


  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  fetch("https://api.sandbox.checkout.com/payments", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

    //var el = document.querySelector(".success-payment-message");
    //    el.innerHTML = "PAYMENT RESULT: " +sErr;
    //    console.log('error', sErr)
}
