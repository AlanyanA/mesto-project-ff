export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupOnEsc);
  document.addEventListener("click", closeOnOverlayClick);
}
  
export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupOnEsc);
  document.removeEventListener("click", closeOnOverlayClick);
}

export function handleClosePopupByClickOnButton(event) {
  if (event.target.classList.contains('popup__close')) {
    const popup = event.target.closest('.popup');
    
    closeModal(popup);
  }
}
  
function closePopupOnEsc(event) {
  if (event.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}
  
function closeOnOverlayClick (event) {
  if (event.target.classList.contains("popup")) {
    closeModal(event.target);
  }
};
