let movies =
JSON.parse(
localStorage.getItem("watchlist")
) || [];

displayMovies();

document
.getElementById("addBtn")
.addEventListener("click", addMovie);

function addMovie()
{
    const movie =
    {
        title:
        document.getElementById("title").value,

        genre:
        document.getElementById("genreInput").value,

        rating:
        document.getElementById("rating").value,

        note:
        document.getElementById("note").value
    };

    movies.push(movie);

    saveMovies();

    displayMovies();
}

function saveMovies()
{
    localStorage.setItem(
    "watchlist",
    JSON.stringify(movies)
    );
}

function deleteMovie(index)
{
    movies.splice(index,1);

    saveMovies();

    displayMovies();
}

function displayMovies()
{
    let output = "";

    movies.forEach((movie,index)=>{

        output +=
        `
        <div class="card">

            <h3>${movie.title}</h3>

            <p>${movie.genre}</p>

            <p>${movie.rating}</p>

            <p>${movie.note}</p>

            <button
            onclick="deleteMovie(${index})">
            Delete
            </button>

        </div>
        `;
    });

    document
    .getElementById("movieList")
    .innerHTML =
    output;
}