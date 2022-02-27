(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
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
    let RoomPrice = document.getElementById("roomPi");
    let GuestPrice = document.getElementById("guestPi");
    let TotalPrice = document.getElementById("price");
    let priceRoom = 0;
    let priceGuest = 0;

    if (classRoom.value == "basic") {
        priceRoom = 350;
        priceGuest = 80;
    } else {
        priceRoom = 500;
        priceGuest = 50;
    }

    let totalGuest = (guestCat.value - 1) * priceGuest;
    let total = (priceRoom + totalGuest) * GetDays();
    RoomPrice.innerHTML = priceRoom * GetDays();
    GuestPrice.innerHTML = totalGuest;
    TotalPrice.innerHTML = total + " THB";
}