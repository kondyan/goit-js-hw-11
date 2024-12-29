export const cardLayout = (wURL, lURL, t, l, v, c, d) =>
  `<div class="photo-card">
  <a href="${lURL}" title=""><img src="${wURL}" alt="${t}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
    <b>Likes</b>
      <span>${l}</span>
    </p>
    <p class="info-item">
    <b>Views</b>
      <span>${v}</span>
    </p>
    <p class="info-item">
    <b>Comments</b>
      <span>${c}</span>
    </p>
    <p class="info-item">
    <b>Downloads</b>
      <span>${d}</span>
    </p>
  </div>
</div>`;
