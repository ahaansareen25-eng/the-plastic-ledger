# The Plastic Ledger

A five-page website raising awareness of plastic pollution in India, built for
MYP-5 Digital Design (Criteria C and D).

Ahaan Sareen — Oberoi International School, Mumbai

---

## Running it

Double-click `index.html`. Everything works offline: Chart.js is bundled in the
folder rather than loaded from a CDN, so the charts render with no internet
connection. The two web fonts are the only external request, and the site falls
back to system fonts cleanly without them.

## Putting it online (GitHub Pages)

1. Create a new repository on GitHub.
2. Upload every file in this folder to the root of that repository.
3. Settings → Pages → Source → `main` branch, `/root` folder → Save.
4. The site appears at `https://<username>.github.io/<repository>/` within a
   minute or two.

Nothing needs building or installing. There is no framework and no package step.

## The files

| File | What it is |
|---|---|
| `index.html` | 00 Home — premise, live counter, three sourced story cards |
| `data.html` | 01 The data — two Chart.js charts with India / global / per-person toggles |
| `calculator.html` | 02 Your footprint — six questions returning a banded weekly figure |
| `action.html` | 03 Take action — five changes ranked by plastic saved |
| `feedback.html` | 04 Feedback — short form, no email or account required |
| `style.css` | All styling. Colour variables, flex layout, media query at 768px |
| `home.js` | The live counter on the home page |
| `script.js` | Chart building and the scope toggles |
| `calculator.js` | Question flow, banding conditional, input validation |
| `feedback.js` | Form validation |
| `chart.min.js` | Chart.js 4.4.1, bundled locally |

## Tested

The automated suite in the journal reports, on the current build:

- 9 / 9 functional tests pass
- 0 WCAG 2.1 AA violations across all five pages
- 223–296 ms load, 18–223 KB per page
- 20 / 20 page-and-viewport combinations with no horizontal overflow
- 38 links, 0 broken

## Known issues, not yet fixed

These are documented as improvements in Criterion D3 of the journal, and are
deliberately left in place so the journal and the product agree:

1. **Calculator question 6 asks about a month** while questions 1–5 ask about a
   week, and the result is reported per week. Found by user testing.
2. **The comparison sentence on the result card sits below the fold** for some
   users. Two of eight testers never saw it.
3. **The navigation label "02 Your footprint"** does not read as "calculator".
   Two of eight testers opened "01 The data" looking for it.
4. **The per-item weightings have no published source.**
5. **Nothing is saved between visits,** so a returning user cannot see whether
   their figure moved.

## Sources

UN Environment Programme; Central Pollution Control Board (India); Our World in
Data; Leslie et al. (2022). Each figure carries its source on the page it
appears.
