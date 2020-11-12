/*
1. Fetch data from a url,
2. filter data by city and county and
3. filter after typing 3rd character sub array

Use fetch api (axios was older library) this is built in to JS now.
This returns a promise.
*/

const endpoint = 'https://raw.githubusercontent.com/millbj92/US-Zip-Codes-JSON/master/USCities.json';

const cities = [];

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data))

function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    // here we need to figure out if the city or state matches what was searched.
    const regex = new RegExp(wordToMatch, 'gi'); // g = global i = insensitive (match lower and uppercase)
    return place.city.match(regex) || place.county.match(regex);
  })
}

function displayMatches() {
  if (this.value.length >= 3) {
    const matchArray = findMatches(this.value, cities);
    const html = matchArray.map(place => {
      const regex = new RegExp(this.value, 'gi');
      const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
      const countyName = place.county.replace(regex, `<span class="hl">${this.value}</span>`);
      return `<li>
          <span class="name">${cityName}, ${countyName}</span>
          <span class="state">${place.state}</span>
          </li>`
    }).join('');
    suggestions.innerHTML = html;
  }
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
