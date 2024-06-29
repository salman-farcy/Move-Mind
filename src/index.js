 import { getMovieReviewData } from "./data.js";


function init() {
     const movieReviewData = getMovieReviewData();
     console.log(movieReviewData);
     

     paintStatistics(movieReviewData);
}

function paintStatistics(movieReviewData){
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

init();