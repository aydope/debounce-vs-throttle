// Create a debounce function
function debounce(callback, delay) {
  let timeout;

  return function (...args) {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}

// Create a throttle function
function throttle(callback, limit) {
  let waiting = false;

  return function (...args) {
    if (waiting) {
      return;
    }

    callback.apply(this, args);

    waiting = true;

    setTimeout(() => {
      waiting = false;
    }, limit);
  };
}

// Get debounce elements
const searchInput = document.getElementById("searchInput");

const keyCountElement = document.getElementById("keyCount");

const apiCountElement = document.getElementById("apiCount");

const savedCountElement = document.getElementById("savedCount");

const timeline = document.getElementById("timeline");

const searchStatus = document.getElementById("searchStatus");

const clearTimelineButton = document.getElementById("clearTimeline");

// Store debounce statistics
let keyCount = 0;
let apiCount = 0;

// Add an event to the timeline
function addTimelineEvent(message) {
  const item = document.createElement("div");

  item.className = "flex items-center gap-3 " + "text-xs text-slate-400";

  item.innerHTML = `
        <span class="event-dot"></span>
        <span>${message}</span>
      `;

  timeline.prepend(item);

  while (timeline.children.length > 30) {
    timeline.removeChild(timeline.lastChild);
  }
}

// Calculate saved API executions
function updateSavedPercentage() {
  if (keyCount === 0) {
    savedCountElement.textContent = "0%";
    return;
  }

  const saved = Math.max(0, Math.round((1 - apiCount / keyCount) * 100));

  savedCountElement.textContent = `${saved}%`;
}

// Simulate an API request
function fakeSearch(value) {
  apiCount++;

  apiCountElement.textContent = apiCount;

  searchStatus.textContent = "API executed";

  searchStatus.className =
    "absolute right-4 top-1/2 " + "-translate-y-1/2 " + "text-xs text-blue-400";

  addTimelineEvent(`API executed → "${value || "empty query"}"`);

  updateSavedPercentage();

  setTimeout(() => {
    searchStatus.textContent = "Waiting";

    searchStatus.className =
      "absolute right-4 top-1/2 " +
      "-translate-y-1/2 " +
      "text-xs text-slate-500";
  }, 700);
}

// Create the debounced search function
const debouncedSearch = debounce(fakeSearch, 500);

// Listen for input events
searchInput.addEventListener("input", function (event) {
  keyCount++;

  keyCountElement.textContent = keyCount;

  searchStatus.textContent = "Typing...";

  searchStatus.className =
    "absolute right-4 top-1/2 " +
    "-translate-y-1/2 " +
    "text-xs text-yellow-400";

  addTimelineEvent(`Input event → "${event.target.value}"`);

  debouncedSearch(event.target.value);

  updateSavedPercentage();
});

// Clear the debounce timeline
clearTimelineButton.addEventListener("click", () => {
  timeline.innerHTML = `
          <div class="text-xs text-slate-600">
            Timeline cleared...
          </div>
        `;
});

// Get throttle elements
const reactor = document.getElementById("reactor");

const reactorStatus = document.getElementById("reactorStatus");

const scrollRawElement = document.getElementById("scrollRaw");

const scrollThrottledElement = document.getElementById("scrollThrottled");

const scrollReductionElement = document.getElementById("scrollReduction");

// Store scroll statistics
let rawScrollCount = 0;
let throttledScrollCount = 0;

// Update throttle statistics
function updateScrollStats() {
  scrollRawElement.textContent = rawScrollCount;

  scrollThrottledElement.textContent = throttledScrollCount;

  if (rawScrollCount === 0) {
    scrollReductionElement.textContent = "0%";

    return;
  }

  const reduction = Math.round(
    (1 - throttledScrollCount / rawScrollCount) * 100,
  );

  scrollReductionElement.textContent = `${Math.max(0, reduction)}%`;
}

// Handle the throttled scroll operation
function handleScroll() {
  throttledScrollCount++;

  scrollThrottledElement.textContent = throttledScrollCount;

  // Restart the reactor animation
  reactor.classList.remove("pulse");

  void reactor.offsetWidth;

  reactor.classList.add("pulse");

  // Update reactor status
  reactorStatus.textContent = "Reactor Processing";

  reactorStatus.className = "text-lg font-semibold " + "text-emerald-400";

  // Rotate the reactor
  const rotation = throttledScrollCount * 12;

  reactor.style.transform = `rotate(${rotation}deg)`;

  updateScrollStats();

  // Return the reactor to stable state
  setTimeout(() => {
    reactorStatus.textContent = "Reactor Stable";

    reactorStatus.className = "text-lg font-semibold " + "text-white";
  }, 150);
}

// Create the throttled scroll handler
const throttledScroll = throttle(handleScroll, 100);

// Listen to the window scroll event
window.addEventListener(
  "scroll",
  () => {
    rawScrollCount++;

    scrollRawElement.textContent = rawScrollCount;

    throttledScroll();
  },
  {
    passive: true,
  },
);

// Initialize statistics
updateSavedPercentage();

updateScrollStats();
