// Init storage
const storage = new Storage();
// Get stored location data
const weather_location = storage.getLocationData();
// Init Weather object
const weather = new Weather(weather_location.city, weather_location.country);
// Init UI object
const ui = new UI();

// Get weather on DOM load.
document.addEventListener('DOMContentLoaded', getWeather);

// Change location event
document.querySelector('#btn-save-modal').addEventListener('click', (e) => {
  const city = document.querySelector('#city').value;
  const country = document.querySelector('#country').value;
  // Check if both fields are empty
  if (city === '' && country === '') {
    const modal_alert = document.querySelector('#modal-alert');
    modal_alert.classList = 'notification is-danger';
    modal_alert.textContent = 'You must fill at least one of the fields!'
  } else {
    // Change Location
    weather.changeLocation(city,country);
    
    // Call getWeather again to repaint the UI
    getWeather();

    // Closing modal
    closeModal();
  }
    
})

function getWeather() {
  const city = document.querySelector('#city').value;
  const country = document.querySelector('#country').value;
  weather.getWeather(city, country)
    .then((results) => {
      if (results.cod == 401) {
        alert(`ERROR 401 (Unauthorized): ${results.message}`);
      } else if (results.cod == 404) {
        const alert = document.querySelector('#alert');
        alert.classList.add("notification", "is-danger");
        alert.textContent = 'City or Country not found, try again!'
        setTimeout(()=>{
          alert.textContent = ''
          alert.classList.remove("notification", "is-danger");
        },3000)
      } else {
        ui.paint(results);
        storage.setLocationData(city, country);
      }
    })
    .catch((err) => {
      console.log(`ERROR : ${err}`);
    });
}

// Showing the modal
document.querySelector('#btn-show-modal').addEventListener('click', () => {
  const modal = document.querySelector('#location-modal');
  document.querySelector('#city').value = '';
  document.querySelector('#country').value = '';
  modal.classList = 'modal is-active'

  const modal_alert = document.querySelector('#modal-alert');
  modal_alert.classList = '';
  modal_alert.textContent = '';
})

// Hide the modal.
function closeModal() {
  const modal = document.querySelector('#location-modal');
  modal.classList = 'modal'
}

// Canceling modal
document.querySelector('#btn-cancel-modal').addEventListener('click', closeModal);
