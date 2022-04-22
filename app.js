const endpoint = "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];

// fetch will return a promise
// const prom = fetch(endpoint);
// console.log(prom);
fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data));

function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    // qui devo capire se la citta o stato corrispondono alla ricerca
    const regex = new RegExp(wordToMatch, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Display in the browser
function displaymatches() {
  // console.log(this.value);
  const matchArray = findMatches(this.value, cities);
  // console.log(matchArray);
  const html = matchArray
    .map(place => {
      const regex = new RegExp(this.value, "gi");
      const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
      const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
      return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
         <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
    })
    .join("");
  suggestions.innerHTML = html;
}

// Selectiong the imput in html form
const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

// Listenig for searchInput
searchInput.addEventListener("change", displaymatches);
searchInput.addEventListener("keyup", displaymatches);
