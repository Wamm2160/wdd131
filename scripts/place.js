const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const windChillElement = document.querySelector("#windChill");

const temperature = 8;
const windSpeed = 12;

function calculateWindChill(temp, speed) {
  return 13.12 + 0.6215 * temp - 11.37 * speed ** 0.16 + 0.3965 * temp * speed ** 0.16;
}

let windChill = "N/A";

if (temperature <= 10 && windSpeed > 4.8) {
  windChill = `${calculateWindChill(temperature, windSpeed).toFixed(1)} °C`;
}

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;
windChillElement.textContent = windChill;
