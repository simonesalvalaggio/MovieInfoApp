let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

// function to fetch data
let getMovie = () => {
  let movieName = movieNameRef.value;
  let url = `http://www.omdbapi.com/?t=${movieName}&apikey=c4a66ef1`;

  // if input is empty
  if (movieName.lenght <= 0) {
    result.innerHTML = `<h3 class='msg'>Please enter a movie name </h3>`;
  }

  //if input has a value
  else {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        //if movie exist in database
        if (data.Response == "True") {
          result.innerHTML = `
                <div class='info'>
                    <img src=${data.Poster} class='poster'>
                        <div>
                            <h2>${data.Title}</h2>
                            <div class='rating'>
                                <img src='assets/img/star.svg'>
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class='details'>
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class='genre'>
                                <div>${data.Genre}</div>
                            </div>
                            <div class='language'>
                                <h4 class='lang'>Language:</h4>
                                <h4>${data.Language}</h4>
                            </div>
                        </div>
                </div>
                <h3>Plot:</h3>
                <p>${data.Plot}</p>
                <h3>Cast:</h3>
                <p>${data.Actors}</p>`;
        }

        //if movie does not exist
        else {
          result.innerHTML = `<h3 class='msg'>${data.Error}</h3>`;
        }
      })

      //if error occurs
      .catch(() => {
        result.innerHTML = `<h3 class='msg'>Error`;
      });
  }
};

searchBtn.addEventListener("click", getMovie);
searchBtn.addEventListener("load", getMovie);
