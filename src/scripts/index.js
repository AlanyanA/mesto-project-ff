import "../pages/index.css";

import { initialCards } from "./cards.js";

import { makeCard, deleteCard, likeCardButton } from "./components/card.js";

import { openModal, closeModal } from "./components/modal.js";

const placesList = document.querySelector(".places__list");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupImage = document.querySelector(".popup_type_image");
const allPopups = document.querySelectorAll(".popup");
const editProfileButton = document.querySelector('.profile__edit-button');
const addNewCardButton = document.querySelector('.profile__add-button');

initialCards.forEach(function (element) {
  const newCardImage = element.link;
  const newCardTitle = element.name;

  placesList.append(makeCard(newCardTitle, newCardImage, deleteCard, likeCardButton, imageModal));
});

function imageModal(link, name) {
  openModal(popupImage);
  const openCardPopupImage = popupImage.querySelector('.popup__image');
  const openCardPopupCaption = popupImage.querySelector('.popup__caption');
  openCardPopupImage.alt = name;
  openCardPopupImage.src = link;
  openCardPopupCaption.textContent = name;
}

editProfileButton.addEventListener('click', () => {
  openModal(popupEditProfile);
})

addNewCardButton.addEventListener('click', () => {
  openModal(popupNewCard);
})

allPopups.forEach(function(element) {
  const popupCloseButton = element.querySelector(".popup__close");
  popupCloseButton.addEventListener("click", () => closeModal(element));
})

// Находим форму в DOM
const formElement = popupEditProfile.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = document.querySelector('.profile__title');// Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector('.profile__description')// Воспользуйтесь инструментом .querySelector()

function handleFormSubmit(evt) {
  evt.preventDefault();
  const newNameInput = formElement.name.value;
  const newJobInput = formElement.description.value
  nameInput.textContent = newNameInput;
  jobInput.textContent = newJobInput;
  closeModal(popupEditProfile);
}
formElement.addEventListener('submit', handleFormSubmit);

const newCardForm = popupNewCard.querySelector(".popup__form");

function addNewCardForm(evt) {
  evt.preventDefault();

  const nameInputNewPlace = newCardForm.querySelector(".popup__input_type_card-name");
  const linkInputNewPlace = newCardForm.querySelector(".popup__input_type_url");
  placesList.prepend(makeCard(nameInputNewPlace.value, linkInputNewPlace.value, deleteCard, likeCardButton, imageModal)
  );

  closeModal(popupNewCard);

  nameInputNewPlace.value = "";
  linkInputNewPlace.value = "";
}
newCardForm.addEventListener("submit", addNewCardForm);