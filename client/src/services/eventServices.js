export async function fetchDataByUrl(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

export async function getAllEvents() {
  try {
    const fetchUrl = "/api/events";
    return fetchDataByUrl(fetchUrl);
  } catch (err) {
    console.log(err);    
  }
}

export async function getSingleEvent(id) {
  try {
    const fetchUrl = `/api/events/${id}`;
    return fetchDataByUrl(fetchUrl);
  } catch (err) {
    console.log(err);
  }
}

export async function updateEvent(id, eventTitle) {
  console.log(id, eventTitle);
  try {
    const response =await fetch(`/api/events/${id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({eventTitle})
    });
  
    console.log(response);
    const eventData = await response.json();
    console.log(eventData);
    
    return eventData;
  } catch (err) {
    console.log(err);
  }

}

export async function deleteEvent(id) {
  try {
    const response = await fetch(`/api/events/${id}`, {
      method: "DELETE"
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function createEvent (event) {
  try {
    const response = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
    const eventData = await response.json();
    return eventData;
  } catch (err) {
    console.log(err);
  }
}