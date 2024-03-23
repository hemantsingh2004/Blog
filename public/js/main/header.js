userElem = document.getElementById("user");
userOptions = document.getElementById("user-options");

userElem.addEventListener("mouseover", () => {
  userOptions.classList.remove("hidden");
});
userElem.addEventListener("mouseout", (event) => {
  if (
    !event.relatedTarget ||
    (event.relatedTarget !== userOptions &&
      !userOptions.contains(event.relatedTarget))
  ) {
    userOptions.classList.add("hidden"); // Hide the element if the mouse is not over it
  }
});
