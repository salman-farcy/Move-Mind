import { getMovieReviewData } from "./data.js";
let sortDesc = false;

function init() {
     const movieReviewData = getMovieReviewData();
     console.log(movieReviewData);

     registerHandler(movieReviewData);
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
     const sorted = flatReviewData.toSorted((a, b) => b.on - a.on)
     const movieListEl = document.querySelector("#movieListId UL")


     addMoveReviewData(movieListEl, sorted)
}

function registerHandler(movieReviewData) {
     const sortBtn = document.getElementById("srtById");
     const grupSortBtn = document.getElementById("srtByGroup");
     sortBtn.addEventListener("click", () => sortByReview(movieReviewData))
     grupSortBtn.addEventListener("click", () => grupSortByReviewTitle(movieReviewData))
}

function sortByReview(movieReviewData) {
     sortDesc = !sortDesc;
     const flatReviewData = movieReviewData.flat();

     let sortReviewData = sortDesc
          ? flatReviewData.toSorted((a, b) => b.rating - a.rating)
          : flatReviewData.toSorted((a, b) => a.rating - b.rating);

     const movieListEl = document.querySelector("#movieListId UL");

     removeAllChildNodes(movieListEl);
     addMoveReviewData(movieListEl, sortReviewData);
};

function grupSortByReviewTitle(movieReviewData){
     const flatReviewData = movieReviewData.flat();
     const groupedReviews = Object.groupBy(flatReviewData, ({title}) => title);
     const titleKeys = Reflect.ownKeys(groupedReviews);


     const movieListEl = document.querySelector("#movieListId UL");
     removeAllChildNodes(movieListEl);

     titleKeys.forEach((title) => {
          const liEl = document.createElement("li");
          liEl.classList.add("card", "my-2");

          const hEl = document.createElement("h2");
          hEl.classList.add("text-3xl");
          hEl.innerText = title;
          liEl.appendChild(hEl);

          const reviews = groupedReviews[title];
          

          reviews.forEach((review) => {
               const pEl = document.createElement("p");
               pEl.classList.add("mx-2", "my-2");


               const message = `#<strong>${review.by}<strong> has given <strong>${review.rating}<strong> rating with a comment,<i>${review.content}</i>`;
               pEl.innerHTML = message;
               liEl.appendChild(pEl);
          })
          

          
          movieListEl.appendChild(liEl);
     })
}

function addMoveReviewData(movieListEl, movieReview) {
     movieReview.map((movie) => {
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
     });
}

function removeAllChildNodes(parent) {
     while (parent.firstChild) {
          parent.removeChild(parent.firstChild)
     }
}

init();