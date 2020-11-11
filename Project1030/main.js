let myDate = document.querySelector("#weather_Date");
let today = new Date();
let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "X"];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "X"];
let eventToday = document.querySelectorAll(".event_Num_Today");
let eventTodayDay = document.querySelectorAll(".event_Day_Today");

function closeAnnouncement() {
    let myAnnouncement = document.querySelector("#announcement_Bar");
    myAnnouncement.style.display = "none";
}

myDate.innerHTML = `${weekday[today.getDay()]}, ${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;

for (let v = 0; v < eventToday.length; v++) {
    eventToday[v].innerHTML = today.getDate();
}
for (let n = 0; n < eventToday.length; n++) {
    eventTodayDay[n].innerHTML = weekday[today.getDay()];
}

$(document).ready(function() {
    let mySearch = document.querySelector("#search");
    $('#search').keydown(function(event) {
        if (event.which == 13) {
            alert("Function not available -Stephen Asuncion");
         }
    });
    $('#search').click(function(event) {
        mySearch.value = "";
    });
});