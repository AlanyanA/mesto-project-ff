export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeOnEscape);
  document.addEventListener("click", closeOnOverlay);
}
  
export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeOnEscape);
  document.removeEventListener("click", closeOnOverlay);
}
  
function closeOnEscape(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}
  
function closeOnOverlay (event) {
  if (event.target.classList.contains("popup")) {
    closeModal(event.target);
  }
}