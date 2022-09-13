// call this to Disable
function disableScroll(window_: Window) {
  window_.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault();
    },
    { passive: false }
  ); // mobile
}

// call this to Enable
function enableScroll(window_: Window) {
  window_.removeEventListener("touchmove", (e) => {
    e.preventDefault();
  });
}

export { disableScroll, enableScroll };
