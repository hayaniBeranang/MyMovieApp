const apiKey = "YOUR_API_KEY";

document
.getElementById("searchBtn")
.addEventListener("click", searchMovie);

document
.getElementById("recommendBtn")
.addEventListener("click", recommendMovie);

document
.getElementById("calculateBtn")
.addEventListener("click", calculateTime);

async function searchMovie() {

    const movie =
    document.getElementById("movieName").value;

    if(movie === "")
    {
        alert("Please enter movie name");
        return;
    }

    try {

        const response =
        await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${movie}`
        );

        const data =
        await response.json();

        let output = "";

        if(data.Response === "False")
        {
            output = "Movie not found";
        }
        else
        {
            data.Search.forEach(movie => {

                output +=
                `
                <div class="card">
                    <img src="${movie.Poster}">
                    <h3>${movie.Title}</h3>
                    <p>Year: ${movie.Year}</p>
                    <p>Type: ${movie.Type}</p>
                    <p>ID: ${movie.imdbID}</p>
                </div>
                `;
            });
        }

        document.getElementById("results")
        .innerHTML = output;

    }
    catch(error)
    {
        document.getElementById("results")
        .innerHTML =
        "API Error";
    }
}

function recommendMovie()
{
    const genre =
    document.getElementById("genre").value;

    let recommendation = "";

    if(genre === "Action")
    {
        recommendation =
        "John Wick";
    }
    else if(genre === "Comedy")
    {
        recommendation =
        "The Mask";
    }
    else if(genre === "Animation")
    {
        recommendation =
        "Toy Story";
    }
    else if(genre === "Horror")
    {
        recommendation =
        "The Conjuring";
    }
    else if(genre === "Sci-Fi")
    {
        recommendation =
        "Interstellar";
    }

    document
    .getElementById("recommendation")
    .innerHTML =
    `<h3>Recommended Movie: ${recommendation}</h3>`;
}

function calculateTime()
{
    const duration =
    Number(document.getElementById("duration").value);

    const count =
    Number(document.getElementById("count").value);

    const total =
    duration * count;

    document
    .getElementById("calcResult")
    .innerHTML =
    `
    <h3>Total Time: ${total} minutes</h3>
    <h3>${(total/60).toFixed(2)} hours</h3>
    `;
}