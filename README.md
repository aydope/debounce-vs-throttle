# Event Lab

A simple interactive project for understanding the difference between **Debounce** and **Throttle** in JavaScript.

The project uses real browser events and visual feedback instead of only showing theoretical examples.

## Features

### Debounce — Search Control Room

Simulates a search input where an API request should only run after the user stops typing.

* Counts input events
* Counts API executions
* Shows how many executions were prevented
* Displays an event timeline
* Uses a `500ms` debounce delay

### Throttle — Scroll Reactor

Demonstrates how throttle controls how often a function can execute while scrolling.

* Counts raw scroll events
* Counts throttled executions
* Calculates event reduction
* Provides a visual reactor for each throttled execution
* Uses a `100ms` throttle interval
* Listens to the browser's `window` scroll event

## Debounce vs Throttle

| Debounce                 | Throttle                     |
| ------------------------ | ---------------------------- |
| Runs after events stop   | Runs at controlled intervals |
| Useful for search inputs | Useful for scroll events     |
| Waits for inactivity     | Limits execution frequency   |
| Example: search API      | Example: scroll handler      |

### Debounce

```js
function debounce(callback, delay) {
  let timeout;

  return function (...args) {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}
```

### Throttle

```js
function throttle(callback, limit) {
  let waiting = false;

  return function (...args) {
    if (waiting) return;

    callback.apply(this, args);
    waiting = true;

    setTimeout(() => {
      waiting = false;
    }, limit);
  };
}
```

## Tech Stack

* HTML
* CSS
* JavaScript
* Tailwind CSS CDN

No backend or database is required.

## Project Structure

```text
event-lab/
├── index.html
└── README.md
```

## Running the Project

No installation is required.

Simply open `index.html` in your browser.

You can also use a local development server such as **Live Server** in VS Code.

## What You Can Learn

This project helps demonstrate:

* Browser event handling
* `input` events
* `scroll` events
* Debouncing frequent events
* Throttling frequent events
* Event execution frequency
* Performance considerations in frontend JavaScript
* `passive` event listeners
* Real-time DOM updates

## Author

**Aydope**

* GitHub: https://github.com/aydope
* Portfolio: https://aydope.github.io/
* LinkedIn: https://www.linkedin.com/in/mohammad-amin-sadeghi/

## License

This project is open for learning and educational use.
