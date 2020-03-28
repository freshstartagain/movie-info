$(document).ready(()=>{
    $('#searchForm').on('submit',(e)=>{
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();

    });
});


function getMovies(searchText){
    axios.get(`https://www.omdbapi.com/?s=${searchText}&apikey=4c362dad`)
    .then((response)=>{
        console.log(response);
        let movies = response.data.Search;
        let output = '';


        $.each(movies, (index, movie)=>{
            if(movie.Poster != "N/A"){
                output += `
                <div class="card" style="width: 18rem; margin: 20px; 5px;">
                     <img class="card-img-top" src="${movie.Poster}" alt="${movie.Title}">
                    <div class="card-body">
                        <h5 class="card-title">${movie.Title}</h5>
                        <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                    </div>
                </div>`;
            }
        });

        $('#movies').html(output);
    })
    .catch((err)=>{
        console.log(err);
    });
}

function movieSelected(id){
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie(){
    let movieId = sessionStorage.getItem('movieId');
    console.log(movieId);

    axios.get(`https://www.omdbapi.com/?i=${movieId}&apikey=4c362dad`)
    .then((response) =>{
        console.log(response);

        let movie = response.data;

        let output = `
            <div class="row">
                <div class="col-md-4">
                    <img src="${movie.Poster}" class="thumbnail">
                </div>
                <div class="col-md-8">
                    <h2>${movie.Title}</h2>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                        <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                        <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                        <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                        <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                        <li class="list-group-item"><strong>Writer:</string> ${movie.Writer}</li>
                        <li class="list-group-item"><strong>Actors:</string> ${movie.Actors}</li>
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="mt-5">
                    <h3>Plot</h3>
                    ${movie.Plot}
                    <hr>
                    <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                    <a href="index.html" class="btn btn-secondary">Go Back To Search</a>
                </div>
            </div>
        `;

        $('#movie').html(output);
    })
    .catch((err) =>{
        console.log(err);
    });
}