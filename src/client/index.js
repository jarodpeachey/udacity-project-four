import { isValidUrl } from './js/validate';
import './styles/main.scss';
import { postData, getData } from './js/api';

const urlInput = document.getElementById('url');
const submitButton = document.getElementById('submit');
const entrySection = document.getElementById('entry-section');
const entriesElement = document.getElementById('entries');

// Event Listener
submitButton.addEventListener('click', submitUrl);

// Add Entry
async function submitUrl(e) {
  e.preventDefault();
  if (!isValidUrl(urlInput.value)) {
    alert('Please enter a valid URL.');
  } else {
    const postResult = await postData('http://localhost:3000/api', urlInput.value);

    const getResult = await getData('http://localhost:3000/get', getData);

    displayResults(getResult);
  }
}

function displayResults(data) {
  const entries = data.entries;
  console.log('Entries: ', entries);

  const entriesOnScreen = document.querySelectorAll('.entry-card');

  entriesOnScreen.forEach((entry) => {
    entry.remove();
  });

  entries.map((entry, index) => {
    const {
      polarity,
      subjectivity,
      text,
      polarity_confidence,
      subjectivity_confidence,
    } = entry;
    const wrapper = document.createElement('div');
    const flex = document.createElement('div');
    const polarityWrapper = document.createElement('div');
    const subjectivityWrapper = document.createElement('div');
    const polarityTitle = document.createElement('span');
    const subjectivityTitle = document.createElement('span');
    const polarityNumber = document.createElement('h2');
    const subjectivityNumber = document.createElement('h2');
    const polarityText = document.createElement('span');
    const subjectivityText = document.createElement('span');
    const textWrapper = document.createElement('div');

    wrapper.classList.add('entry-card');
    flex.classList.add('entry-flex');
    textWrapper.classList.add('entry-original-text');
    polarityWrapper.classList.add('entry-number-wrapper');
    subjectivityWrapper.classList.add('entry-number-wrapper');
    polarityTitle.classList.add('entry-name');
    subjectivityTitle.classList.add('entry-name');
    polarityNumber.classList.add('entry-number');
    subjectivityNumber.classList.add('entry-number');
    polarityText.classList.add('entry-text');
    subjectivityText.classList.add('entry-text');

    polarityTitle.innerText = 'Polarity';
    subjectivityTitle.innerText = 'Subjectivity';

    polarityText.innerText = polarity;
    subjectivityText.innerText = subjectivity;
    polarityNumber.innerText = polarity_confidence.toFixed(2);
    subjectivityNumber.innerText = subjectivity_confidence.toFixed(2);

    polarityWrapper.appendChild(polarityTitle);
    polarityWrapper.appendChild(polarityNumber);
    polarityWrapper.appendChild(polarityText);
    subjectivityWrapper.appendChild(subjectivityTitle);
    subjectivityWrapper.appendChild(subjectivityNumber);
    subjectivityWrapper.appendChild(subjectivityText);

    flex.appendChild(polarityWrapper);
    flex.appendChild(subjectivityWrapper);

    textWrapper.innerText = text;
    wrapper.appendChild(flex);
    wrapper.appendChild(textWrapper);

    entriesElement.appendChild(wrapper);
  });

  entrySection.style.display = 'block';
}
