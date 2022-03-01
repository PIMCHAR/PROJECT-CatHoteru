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
    let priceRoom = 0;
    let priceGuest = 0;

    if (classRoom.value == "standard") {
        priceRoom = 350;
        priceGuest = 80;
    } else {
        priceRoom = 500;
        priceGuest = 50;
    }

    let totalGuest = (guestCat.value - 1) * priceGuest;
    var total = (priceRoom + totalGuest) * GetDays();
    RoomPrice.innerHTML = priceRoom;
    GuestPrice.innerHTML = totalGuest;
    TotalPrice.innerHTML = total + " THB";

    return total;
}

function getData() {
    //gettting the values
    var fullName = document.getElementById("firstName").value;
    var email = document.getElementById("email").value;
    var checkinDate = document.getElementById("checkin-date").value;
    var checkoutDate = document.getElementById("checkout-date").value;

    var numCat = document.getElementById("guestCat").value;
    var room = document.getElementById("classRoom").value;

    //saving the values in local storage
    localStorage.setItem("txtName", fullName);
    localStorage.setItem("txtEmail", email);
    localStorage.setItem("txtCheckin", checkinDate);
    localStorage.setItem("txtCheckout", checkoutDate);
    localStorage.setItem("txtCat", numCat);
    localStorage.setItem("txtRoom", room);
    localStorage.setItem("txtdDate", GetDays());
    localStorage.setItem("txtTotal", calprice());
}

