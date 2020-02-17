import { checkForName } from './js/nameChecker';
import { handleSubmit } from './js/formHandler';
import './styles/main.scss';

const urlInput = document.getElementById('url');
const submitButton = document.getElementById('submit');

// Event Listener
submitButton.addEventListener('click', submitUrl);

// Add Entry
async function submitUrl(e) {
  e.preventDefault();
  if (urlInput.value == '') {
    alert('Please fill in all the fields.');
  } else {
    const postResult = await postUrlRequest('/api', urlInput.value);

    const getResult = await getData('/get', getData);

    console.log(getResult);
  }
}

async function postUrlRequest(urlToRequestTo, urlForApi) {
  // Create a new date instance dynamically with JS
  let d = new Date();
  let newDate = d.getTime();

  const data = {
    url: urlForApi,
    date: newDate,
  };

  let result = await fetch(urlToRequestTo, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  let responseData = await result.json();

  return responseData;
}

async function getData(url) {
  let result = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  let responseData = await result.json();

  return responseData;
}

function displayResults(data) {
  const entries = data.entries;
  const { name, date, feeling, zip, temp } = entries[entries.length - 1];

  const wrapper = document.createElement('div');
  const flex = document.createElement('div');
  const textWrapper = document.createElement('div');
  const nameElement = document.createElement('em');
  const dateElement = document.createElement('span');
  const tempElement = document.createElement('div');
  const tempIndicator = document.createElement('span');
  const feelingsElement = document.createElement('p');

  wrapper.classList.add('entry-card');
  flex.classList.add('entry-flex');
  nameElement.classList.add('entry-name');
  dateElement.classList.add('entry-date');
  tempElement.classList.add('entry-temp');
  tempIndicator.classList.add('entry-temp-indicator');
  textWrapper.classList.add('entry-feelings');

  nameElement.innerText = `- ${name}`;
  dateElement.innerText = date;
  feelingsElement.innerText = feeling;
  tempIndicator.innerText = '(F)';
  tempElement.innerText = `${temp}°`;
  tempElement.appendChild(tempIndicator);

  flex.appendChild(tempElement);
  flex.appendChild(dateElement);
  textWrapper.appendChild(feelingsElement);
  textWrapper.appendChild(nameElement);
  wrapper.appendChild(flex);
  wrapper.appendChild(textWrapper);

  entriesElement.appendChild(wrapper);
  entrySection.style.display = 'block';
}
