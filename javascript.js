(function () {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation');
    /*export form*/

    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                form.classList.add('was-validated')
            }, false)
        })
})()

/* input_tel */
var telNum = document.getElementById("telephone");
let check_num = ['test1']

telNum.onkeyup = function () {
    if (telNum.value.length > 0) {
        if (telNum.value.length == 1) {
            check_num.pop();
        }
        else if (telNum.value == 6) {
            check_num.pop();
        }
        else if (telNum.value.length == 2) {
            check_num.push(telNum.value);
        }
        else if (telNum.value.length == 6) {
            check_num.push(telNum.value);
        }
        else if (telNum.value.length == 4) {
            telNum.value = check_num[0];
        }
        else if (telNum.value.length == 8) {
            telNum.value = check_num[1];
        }
        else if (telNum.value.length == 3 || telNum.value.length == 7) {
            telNum.value += "-";
        }
        console.log(check_num)
    }
}

/* DATE */
var currentDateTime = new Date();
var year = currentDateTime.getFullYear();
var month = (currentDateTime.getMonth() + 1);
var date = (currentDateTime.getDate() + 1);


if (date < 10) {
    date = '0' + date;
}
if (month < 10) {
    month = '0' + month;
}

var dateTomorrow = year + "-" + month + "-" + date;
var checkinElem = document.querySelector("#checkin-date");
var checkoutElem = document.querySelector("#checkout-date");

checkinElem.setAttribute("min", dateTomorrow);

checkinElem.onchange = function () {
    checkoutElem.setAttribute("min", this.value);
}

/* count day */
function GetDays() {
    var dropdt = new Date(document.getElementById("checkout-date").value);
    var pickdt = new Date(document.getElementById("checkin-date").value);
    var parseInt = (((dropdt - pickdt) / (24 * 3600 * 1000)) + 1);

    if (parseInt < 0) {
        return 0;
    }
    else {
        return parseInt;
    }
}

function cal() {
    if (!isNaN(GetDays())) {
        document.getElementById("d-day").innerHTML = GetDays() + " days";
        calprice()
    }
}

/* Total price */
function calprice() {
    let RoomPrice = document.getElementById("roomsPi");
    let GuestPrice = document.getElementById("guestPi");
    let TotalPrice = document.getElementById("pricePi");
    priceRoom = roomPrice()
    priceGuest = guestPrice()
    let totalGuest = (guestCat.value - 1) * priceGuest;
    var total = (priceRoom + totalGuest) * GetDays();
    RoomPrice.innerHTML = priceRoom;
    GuestPrice.innerHTML = totalGuest;
    TotalPrice.innerHTML = total + " THB";
    return total;
}

function roomPrice() {
    let priceRoom = 0;
    if (classRoom.value == "Standard") {
        priceRoom = 350;
    } else {
        priceRoom = 500;
    }
    return priceRoom;
}

function guestPrice() {
    let priceGuest = 0;
    if (classRoom.value == "Standard") {
        priceGuest = 80;
    } else {
        priceGuest = 50;
    }
    return priceGuest;
}



function getData() {
    //gettting the values
    var today = new Date();
    var current_date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

    var fullName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var name = fullName + " " + lastName;

    var email = document.getElementById("email").value;
    var tel = document.getElementById("telephone").value;

    var checkinDate = document.getElementById("checkin-date").value;
    var checkoutDate = document.getElementById("checkout-date").value;
    var numCat = document.getElementById("guestCat").value;

    var payMeth = document.querySelector('input[name="paymentMethod"]:checked').value;
    var room = document.getElementById("classRoom").value;

    //saving the values in local storage
    localStorage.setItem("txtName", name);
    localStorage.setItem("txtEmail", email);
    localStorage.setItem("txtTel", tel);

    localStorage.setItem("txtCheckin", checkinDate);
    localStorage.setItem("txtCheckout", checkoutDate);
    localStorage.setItem("txtCat", numCat);

    localStorage.setItem("txtBookingdate", current_date);
    localStorage.setItem("txtPayment", payMeth)

    localStorage.setItem("txtRoom", room);
    localStorage.setItem("roomPrice", roomPrice());
    localStorage.setItem("guestPrice", guestPrice());

    localStorage.setItem("txtdDate", GetDays());
    localStorage.setItem("txtTotal", calprice());
}


