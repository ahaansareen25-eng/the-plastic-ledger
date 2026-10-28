/* =========================================================
   THE PLASTIC LEDGER — Home page
   Technical skill: a live counter driven by setInterval()
   ========================================================= */

/* India generates roughly 9.3 million tonnes of plastic waste a year
   (CPCB / Nature, 2024). Dividing that by the number of seconds in a
   year gives the rate the counter ticks at.                          */
const TONNES_PER_YEAR   = 9_300_000;
const SECONDS_PER_YEAR  = 365 * 24 * 60 * 60;
const TONNES_PER_SECOND = TONNES_PER_YEAR / SECONDS_PER_YEAR;

const figure     = document.getElementById("ytd-figure");
const sinceOpen  = document.getElementById("since-open");

/* The page records the moment it was opened so a second, faster-moving
   figure can show how much has been generated while the user has been
   reading. Testing showed the year-to-date figure alone appears frozen,
   because at two decimal places it only changes every few hours.      */
const openedAt = Date.now();

/* Work out how many seconds have passed since 1 January of this year,
   so the figure shown is the real year-to-date total rather than a
   number that restarts every time the page is opened.                */
function secondsSinceNewYear() {
  const now      = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  return (now - startOfYear) / 1000;
}

function updateCounter() {
  const tonnes = secondsSinceNewYear() * TONNES_PER_SECOND;
  const mt     = tonnes / 1_000_000;
  figure.textContent = mt.toFixed(2) + " Mt";

  /* Kilograms generated since this page was opened. At 295 kg a second
     this figure changes visibly on every tick, so the counter reads as
     live rather than static.                                          */
  const secondsOpen = (Date.now() - openedAt) / 1000;
  const kgSinceOpen = secondsOpen * TONNES_PER_SECOND * 1000;
  sinceOpen.textContent =
    "+" + Math.round(kgSinceOpen).toLocaleString("en-IN") + " kg since you opened this page";
}

updateCounter();
setInterval(updateCounter, 200);
