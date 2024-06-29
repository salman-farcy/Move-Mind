import { getMovieReviewData } from "./data.js";


function init() {
     const movieReviewData = getMovieReviewData();
     console.log(movieReviewData);


     paintStatistics(movieReviewData);
     paintMovieData(movieReviewData);
}

function paintStatistics(movieReviewData) {
     const flatReviewData = movieReviewData.flat();
     const totalMovies = movieReviewData.length;
     const totalReview = flatReviewData.length;
     const totalRating = flatReviewData.reduce((acc, item) => {
          return acc + item.rating;
     }, 0);

     const avgRating = (totalRating / totalReview).toFixed(2);



     const totalMOviesEl = document.getElementById("tMoveId");
     addStat(totalMOviesEl, totalMovies);

     const toalAvMOviesEl = document.getElementById("tAvgRatingId");
     addStat(toalAvMOviesEl, avgRating);

     const toalReviewsEl = document.getElementById("tReviewsId");
     addStat(toalReviewsEl, totalReview);
}

function addStat(elem, value) {
     const spanEl = document.createElement("span");
     spanEl.innerText = value;
     elem.appendChild(spanEl);
}
function paintMovieData(movieReviewData) {
     const flatReviewData = movieReviewData.flat();
     const movieListEl = document.querySelector("#movieListId UL")


     flatReviewData.map((movie) => {
          console.log(movie);


          const liElem = document.createElement("li");
          liElem.classList.add("card", "p-2", "my-2");

          const titleElem = document.createElement("p");
          titleElem.classList.add("text-xl", "mb-2");
          titleElem.innerText = `${movie.title} - ${movie.rating}`;
          liElem.appendChild(titleElem);

          const reviewElem = document.createElement("p");
          reviewElem.classList.add("mx-2");
          reviewElem.innerText = movie.content;
          liElem.appendChild(reviewElem);

          const byElem = document.createElement("p");
          byElem.classList.add("text-xl", "mb-2");
          byElem.innerText = `By ${movie.by} on ${new Intl.DateTimeFormat('en-Bn').format(movie.on)}`;
          liElem.appendChild(byElem);


          movieListEl.appendChild(liElem);
     })

     
}

init();