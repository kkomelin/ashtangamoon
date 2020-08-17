import format from 'date-fns/format';
import calculateMoonPhases from './calculateMoonPhases';
import './styles.css';
import visualizeMoonPhase from './visualizeMoonPhase';

const body = document.querySelector('body');

// When body is ready, we caclulate and visualize moon phases.
body.onload = function() {
  // Print current date.
  const moon = body.querySelector('header');
  const currentEl = document.createElement('div');
  currentEl.classList.add('current-date');
  currentEl.innerText = `${format(new Date(), 'd MMM yyyy')}`;
  moon.append(currentEl);

  // Calculate moon phases.
  const {currentPhase, newMoon, fullMoon} = calculateMoonPhases();

  // The phases have been calculated. Time to remove the loader.
  body.querySelector('.loader').remove();

  // Visualize the moon.
  visualizeMoonPhase(currentPhase);

  // Visualize the next dates.
  const next = body.querySelector('.next-dates');

  const newMoonEl = document.createElement('div');
  newMoonEl.classList.add('new-moon');
  newMoonEl.innerHTML = `<div class="title">New Moon</div>
    <div class="date">${format(newMoon, 'MMM, d - HH:mm')}</div>`;

  const fullMoonEl = document.createElement('div');
  fullMoonEl.classList.add('full-moon');
  fullMoonEl.innerHTML = `<div class="title">Full Moon</div>
    <div class="date">${format(fullMoon, 'MMM, d - HH:mm')}</div>`;

  if (newMoon < fullMoon) {
    next.append(newMoonEl);
    next.append(fullMoonEl);
  }
  else {
    next.append(fullMoonEl);
    next.append(newMoonEl);
  }
}

// Service Worker for offline caching of production build.
if (process.env.NODE_ENV === 'production') {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js');
    });
  }
}
