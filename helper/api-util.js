export async function getAllEvents() {
  const response = await fetch(
    "https://forge-events-59905-default-rtdb.firebaseio.com/forge-events.json"
  );
  const data = await response.json();
  let events = [];

  for (const key in data) {
    const event = {
      id: key,
      date: data[key].date,
      description: data[key].description,
      image: data[key].image,
      title: data[key].title,
      location: data[key].location,
      isFeatured: data[key].isFeatured,
    };
    events.push(event);
  }
  return events;
}

export async function getFeaturedEvents() {
  const featuredEvents = await getAllEvents();
  const resultFeaturedEvents = featuredEvents.filter(
    (featuredEvent) => featuredEvent.isFeatured
  );

  return resultFeaturedEvents;
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();

  const eventById = allEvents.find((event) => event.id === id);

  return eventById;
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  const allEvents = await getAllEvents();
  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
