const container = document.querySelector(".container") as HTMLDivElement;
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count") as HTMLSpanElement;
const total = document.getElementById("total") as HTMLSpanElement;
const movieSelect = document.getElementById("movie") as HTMLSelectElement;

let ticektPrice = +movieSelect.value;

function setMovieData(movieIndex: number, moviePrice: string) {
	localStorage.setItem("selectedMovieIndex", movieIndex.toString());
	localStorage.setItem("selectedMoviePrice", moviePrice);
}

function updateSelectedCount() {
	const selectedSeats = document.querySelectorAll(".row .seat.selected");
	count.innerText = selectedSeats.length.toString();
	total.innerText = (selectedSeats.length * ticektPrice).toString();
	const seatsIndex = [...selectedSeats].map((seat: Element) => [...seats].indexOf(seat));
	localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
}

function populateUi() {
	let selectedSeats = localStorage.getItem("selectedSeats") as string;
	selectedSeats = JSON.parse(selectedSeats);
	if (selectedSeats !== null && selectedSeats.length > 0) {
		seats.forEach((seat: Element, index: any) => {
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
movieSelect.addEventListener("change", (e: any) => {
	ticektPrice = +e.target.value;
	updateSelectedCount();
	setMovieData(e.target.selectedIndex, e.target.value);
});

container.addEventListener("click", (e: any) => {
	if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
		e.target.classList.toggle("selected");
	}
	updateSelectedCount();
});
populateUi();
updateSelectedCount();
