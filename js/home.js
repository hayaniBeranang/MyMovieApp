const API_KEY = "175387e2";

const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", searchMovie);

async function searchMovie() {

    const movie =
    document.getElementById("movieInput").value;

    if (movie === "") {
        alert("Enter movie title");
        return;
    }

    try {

        const response = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${movie}`
        );

        const data = await response.json();

        if (data.Response === "False") {

            document.getElementById("result").innerHTML =
            "<p>Movie not found</p>";

            return;
        }

        let html = '<div class="movie-grid">';

        for (const movie of data.Search) {

            const details = await fetch(
                `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`
            );

            const fullMovie = await details.json();

            html += `
            <div class="movie-card">

                <img src="${fullMovie.Poster}" alt="${fullMovie.Title}">

                <h3>${fullMovie.Title}</h3>

                <p><strong>Year:</strong> ${fullMovie.Year}</p>

                <p><strong>Genre:</strong> ${fullMovie.Genre}</p>

                <p><strong>Runtime:</strong> ${fullMovie.Runtime}</p>

                <p><strong>IMDb:</strong> ${fullMovie.imdbRating}</p>

                <p>${fullMovie.Plot}</p>

                <button
                    class="btn"
                    onclick="saveMovie('${fullMovie.Title}','${fullMovie.Poster}')">
                    Add To Watchlist
                </button>

            </div>
            `;
        }

        html += '</div>';

        document.getElementById("result").innerHTML = html;

    }

    catch (error) {

        document.getElementById("result").innerHTML =
        "<p>API Error</p>";

        console.log(error);
    }
}

async function recommendMovie(){

    const genre =
    document.getElementById("genre").value;

    let movie = "";

    if(genre === "Action"){
        movie = "John Wick";
    }
    else if(genre === "Comedy"){
        movie = "Free Guy";
    }
    else if(genre === "Horror"){
        movie = "The Conjuring";
    }
    else if(genre === "Animation"){
        movie = "Inside Out";
    }

    const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&t=${movie}`
    );

    const data = await response.json();

    document.getElementById("recommendation").innerHTML = `

        <div class="movie-card">

            <img src="${data.Poster}">

            <h3>${data.Title}</h3>

            <p><strong>Genre:</strong> ${data.Genre}</p>

            <p><strong>Runtime:</strong> ${data.Runtime}</p>

            <p><strong>IMDb:</strong> ${data.imdbRating}</p>

            <p>${data.Plot}</p>

        </div>

    `;
}

function calculateTime() {

    const runtime = parseInt(
        document.getElementById("runtime").value
    );

    const quantity = parseInt(
        document.getElementById("quantity").value
    );

    if (isNaN(runtime) || isNaN(quantity)) {

        alert("Enter valid numbers");
        return;
    }

    const totalMinutes = runtime * quantity;

    const hours =
    (totalMinutes / 60).toFixed(2);

    document.getElementById("totalTime").innerText =
    `${totalMinutes} Minutes (${hours} Hours)`;
}

function saveMovie(title, poster) {

    let watchlist =
    JSON.parse(
        localStorage.getItem("watchlist")
    ) || [];

    const movieExists =
    watchlist.some(
        movie => movie.name === title
    );

    if(movieExists){
        alert("Movie already in watchlist!");
        return;
    }

    watchlist.push({
        name: title,
        poster: poster,
        status: "Not Watched",
        dateAdded: new Date().toLocaleDateString()
    });

    localStorage.setItem(
        "watchlist",
        JSON.stringify(watchlist)
    );

    alert("Added to Watchlist");
}
