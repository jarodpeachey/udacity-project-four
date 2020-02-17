export async function postData(urlToRequestTo, urlForApi) {
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

export async function getData(url) {
  let result = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  let responseData = await result.json();

  return responseData;
}
