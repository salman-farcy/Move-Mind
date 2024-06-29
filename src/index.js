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
          return acc + item.reting
     }, 0);
     const avgRating = (totalRating / totalReview).toFixed(2);


     
}

init();