let events;
let timeout;

getUMEventsWithImages((eventsWithImages) => {
  events = eventsWithImages;
  const thumbnailsEl = document.querySelector("#thumbnails");
  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    const imageEl = document.createElement("img");
    imageEl.id = `thumb-${event.id}`;
    imageEl.src = event.styled_images.event_thumb;
    imageEl.addEventListener("click", () => {
      setSelectedIndex(i);
    });
    thumbnailsEl.appendChild(imageEl);
  }
  setSelectedIndex(0);
});

function setSelectedIndex(index) {
  const previousSelectedEvent = document.querySelector(".selected");
  if (previousSelectedEvent) {
    previousSelectedEvent.classList.remove("selected");
  }
  const selectedEvent = events[index];
  const selectedImageEl = document.querySelector(`#thumb-${selectedEvent.id}`);
  selectedImageEl.classList.add("selected");
  const imageEl = document.querySelector("#selected-image");
  imageEl.src = selectedEvent.image_url;
  const titleEl = document.querySelector("#selected-title");
  titleEl.innerText = selectedEvent.event_title;
  titleEl.href = selectedEvent.permalink;
  const dateEl = document.querySelector("#selected-date");
  dateEl.innerText = getReadableTime(selectedEvent.datetime_start);
  const descriptionEl = document.querySelector("#selected-description");
  descriptionEl.innerText = selectedEvent.description;
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => {
    setSelectedIndex((index + 1) % events.length);
  }, 10000);
}
