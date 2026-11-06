displayMovies();

function displayMovies() {

    const watchlist =
        JSON.parse(
            localStorage.getItem("watchlist")
        ) || [];

    const container =
        document.getElementById("watchlist");

    if (watchlist.length === 0) {

        container.innerHTML =
            "<p>No movies in watchlist.</p>";

        return;
    }

    let html = '<div class="movie-grid">';

    watchlist.forEach((movie, index) => {

        html += `
        <div class="movie-card">

            <img src="${movie.poster}" alt="${movie.name}">

            <h3>${movie.name}</h3>

            <p class="date-added">
                Added: ${movie.dateAdded}
            </p>

            <p class="movie-status">
                Status: ${movie.status || "Not Watched"}
            </p>

            <button
                class="btn watched-btn"
                onclick="markWatched(${index})">

                ${movie.status === "Watched"
                    ? "Watched"
                    : "Mark Watched"}

            </button>

            <button
                class="btn delete-btn"
                onclick="deleteMovie(${index})">

                Remove

            </button>

        </div>
        `;
    });

    html += '</div>';

    container.innerHTML = html;
}

function markWatched(index) {

    let watchlist =
        JSON.parse(
            localStorage.getItem("watchlist")
        ) || [];

    watchlist[index].status = "Watched";

    localStorage.setItem(
        "watchlist",
        JSON.stringify(watchlist)
    );

    displayMovies();
}

function deleteMovie(index) {

    let watchlist =
        JSON.parse(
            localStorage.getItem("watchlist")
        ) || [];

    watchlist.splice(index, 1);

    localStorage.setItem(
        "watchlist",
        JSON.stringify(watchlist)
    );

    displayMovies();
}
