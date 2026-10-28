/* =========================================================
   THE PLASTIC LEDGER — The data page
   Technical skill: filtering chart data with a scope toggle
   ========================================================= */

/* ---------------------------------------------------------
   1. THE DATASET
   One object per scope. Each scope holds the same four keys,
   so the switching function can read any scope the same way.
   --------------------------------------------------------- */
const plasticData = {

  india: {
    heading: "Where India's plastic ends up",
    unit: "Mt per year",
    labels: ["Into the environment", "Landfilled", "Burned", "Recycled"],
    values: [3.5, 2.9, 1.9, 1.0],
    source: "Source: CPCB / Nature (2024)",
    timeline: [1.6, 2.1, 2.6, 3.1, 4.4],
    ctaTitle: "These are national numbers."
  },

  global: {
    heading: "Where the world's plastic ends up",
    unit: "Mt per year",
    labels: ["Into the environment", "Landfilled", "Burned", "Recycled"],
    values: [23, 174, 69, 33],
    source: "Source: UN Environment Programme / OECD",
    timeline: [12, 16, 19, 23, 32],
    ctaTitle: "These are global numbers."
  },

  perPerson: {
    heading: "Plastic waste per person, per year",
    unit: "kg per person",
    labels: ["Into the environment", "Landfilled", "Burned", "Recycled"],
    values: [2.4, 2.0, 1.3, 0.7],
    source: "Source: CPCB, divided by population (1.43 bn)",
    timeline: [1.1, 1.5, 1.8, 2.2, 3.1],
    ctaTitle: "This is one person's share."
  }

};

const YEARS = ["2016", "2020", "2024", "2026", "2040 (proj)"];

/* Brand colours from the B1 design specification */
const COLOURS = {
  orange:   "#E8734F",
  green:    "#15534A",
  midGreen: "#3E7F73",
  pale:     "#9CC2BA",
  track:    "#EFE9DD",
  ink:      "#221F1A"
};

/* ---------------------------------------------------------
   2. BUILD THE TWO CHARTS
   Both are created once, on page load, using the default
   scope. switchScope() then updates them in place.
   --------------------------------------------------------- */
const disposalChart = new Chart(document.getElementById("disposalChart"), {
  type: "bar",
  data: {
    labels: plasticData.india.labels,
    datasets: [{
      data: plasticData.india.values,
      backgroundColor: [COLOURS.orange, COLOURS.green, COLOURS.midGreen, COLOURS.pale],
      borderRadius: 6,
      barThickness: 34
    }]
  },
  options: {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: COLOURS.track }, ticks: { font: { family: "Public Sans" } } },
      y: { grid: { display: false }, ticks: { font: { family: "Public Sans", size: 13 } } }
    }
  }
});

const timelineChart = new Chart(document.getElementById("timelineChart"), {
  type: "bar",
  data: {
    labels: YEARS,
    datasets: [{
      data: plasticData.india.timeline,
      /* The 2040 bar is a projection, so it is coloured differently
         to show the reader it is a forecast, not recorded data.      */
      backgroundColor: YEARS.map(function (year) {
        if (year.includes("proj")) {
          return COLOURS.orange;
        } else {
          return COLOURS.green;
        }
      }),
      borderRadius: 6
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { font: { family: "Public Sans", size: 13 } } },
      y: { grid: { color: COLOURS.track }, beginAtZero: true }
    }
  }
});

/* ---------------------------------------------------------
   3. THE SWITCHING FUNCTION
   Takes a scope name, looks up that scope in the dataset,
   and rewrites both charts plus the surrounding text.
   --------------------------------------------------------- */
function switchScope(scope) {

  /* Guard: if the scope does not exist in the dataset, stop
     and warn instead of breaking the charts.                  */
  if (!plasticData[scope]) {
    console.warn("Unknown scope requested:", scope);
    return;
  }

  const current = plasticData[scope];

  /* Update the disposal chart */
  disposalChart.data.labels = current.labels;
  disposalChart.data.datasets[0].data = current.values;
  disposalChart.update();

  /* Update the timeline chart */
  timelineChart.data.datasets[0].data = current.timeline;
  timelineChart.update();

  /* Update the headings, units and citation so the text
     always matches the numbers being displayed.              */
  document.getElementById("disposal-title").textContent  = current.heading;
  document.getElementById("disposal-unit").textContent   = current.unit;
  document.getElementById("disposal-source").textContent = current.source;
  document.getElementById("cta-title").textContent       = current.ctaTitle;
}

/* ---------------------------------------------------------
   4. THE EVENT HANDLERS
   A loop attaches a click handler to every toggle button,
   so adding a fourth scope later needs no new JavaScript.
   --------------------------------------------------------- */
const scopeButtons = document.querySelectorAll(".scope-btn");

scopeButtons.forEach(function (button) {

  button.addEventListener("click", function () {

    /* Clear the active state from all three buttons, then
       mark only the one that was clicked.                    */
    scopeButtons.forEach(function (other) {
      other.classList.remove("is-active");
    });
    button.classList.add("is-active");

    /* data-scope on the button tells the function which
       dataset to load — "india", "global" or "perPerson".    */
    switchScope(button.dataset.scope);

  });

});
