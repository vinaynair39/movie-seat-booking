"use strict";
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticektPrice = +movieSelect.value;
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem("selectedMovieIndex", movieIndex.toString());
    localStorage.setItem("selectedMoviePrice", moviePrice);
}
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    count.innerText = selectedSeats.length.toString();
    total.innerText = (selectedSeats.length * ticektPrice).toString();
    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
}
function populateUi() {
    let selectedSeats = localStorage.getItem("selectedSeats");
    selectedSeats = JSON.parse(selectedSeats);
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected");
            }
        });
    }
    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = +selectedMovieIndex;
    }
}
//Movie Select Event
movieSelect.addEventListener("change", (e) => {
    ticektPrice = +e.target.value;
    updateSelectedCount();
    setMovieData(e.target.selectedIndex, e.target.value);
});
container.addEventListener("click", (e) => {
    if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
        e.target.classList.toggle("selected");
    }
    updateSelectedCount();
});
populateUi();
updateSelectedCount();
