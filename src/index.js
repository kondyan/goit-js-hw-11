import "./init";
import "/node_modules/modern-normalize/modern-normalize.css";
import SimpleLightbox from "simplelightbox";
import Notiflix from "notiflix";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchQuery } from "./api";
import { cardLayout } from "./template";

let currentPage = 1;
let perPage = 40;
let totalHits = "";
let searchQuery = "";
let gallery;

const options = {
  root: null,
  rootMargin: "300px",
  threshold: 1.0,
};

var observer = new IntersectionObserver(onLoad, options);

function onLoad(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.target === refs.target) {
      observer.unobserve(refs.target);
      gallery.refresh();
      currentPage += 1;
      renderData(searchQuery, currentPage);
    }
  });
}

export const refs = {
  submitForm: document.querySelector(".search-form"),
  gallery: document.querySelector(".gallery"),
  target: document.querySelector(".js-guard"),
};
// replace with notifix solution
export function rejectMessage() {
  Notiflix.Notify.failure(
    "Sorry, there are no images matching your search query. Please try again."
  );
}

const checkIfBtnVisible = (page, perPage, total) => page * perPage < total;

async function renderData(query, page) {
  const data = await fetchQuery(query, page);
  const items = data.hits;
  totalHits = data.totalHits;

  if (!items.length) {
    refs.loadMoreBtn.setAttribute("hidden", "true");
    rejectMessage();
    return;
  }
  if (currentPage === 1) {
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  }

  const itemsLayout = items.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) =>
      cardLayout(
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads
      )
  );
  refs.gallery.insertAdjacentHTML("beforeend", itemsLayout.join(""));
  if (checkIfBtnVisible(currentPage, perPage, totalHits)) {
    observer.observe(refs.target);
  } else {
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }

  gallery = new SimpleLightbox(".gallery a", {});
}

refs.submitForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    currentPage = 1;
    refs.gallery.innerHTML = "";
    searchQuery = Object.fromEntries(new FormData(e.target)).searchQuery;
    await renderData(searchQuery, currentPage);
  } catch (error) {
    console.log(error);
  }
});
