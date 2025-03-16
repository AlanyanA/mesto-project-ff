import {makeCard} from './components/card.js';
import {openModal, closeModal, handleClosePopupByClickOnButton} from './components/modal.js';
import {clearValidation, setEventListeners, showInputError, hideInputError} from './components/validation.js';
import '../pages/index.css';
import { updateAvatar, isImageUrl, fetchUserData, fetchCards, addCard, updateProfileData, toggleLike, deleteCard} from './components/api.js'; 

const profileForm = document.forms['edit-profile'];
const profileDescription = document.querySelector('.profile__description');
const popupEdit = document.querySelector('.popup_type_edit');
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileImageContainer = document.querySelector('.profile__image-container');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popups = document.querySelectorAll('.popup');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupChangeAvatar = document.querySelector('.popup_type_profile-avatar');
const avatarForm = document.forms['new-avatar'];
const profileImage = document.querySelector('.profile__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');
const newCardForm = document.forms['new-place'];
const popupImage = popupTypeImage.querySelector('.popup__image');
const placesList = document.querySelector('.places__list');

let userId;

Promise.all([fetchUserData(), fetchCards()])
  .then(([userData, cardsData]) => {
    userId = userData._id; 
    updateUserProfile(userData);
    renderCards(cardsData, userId);
  })
  .catch(error => {
    console.error('Ошибка при загрузке данных:', error);
  });

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button-disabled',
  inputErrorClass: 'popup__input_type_error'
};


popups.forEach((popup) => {
  popup.querySelector('.popup__close').addEventListener('click', handleClosePopupByClickOnButton);
  const formList = Array.from(popup.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    setEventListeners(formElement, validationSettings);
  });
});

avatarForm.addEventListener('submit', changeAvatarFormSubmit);

function addNewCard(card, userId) {
  const newCardElement = makeCard(card, handleDeleteCard, handleToggleLike, handleImageClick, userId);
  placesList.prepend(newCardElement);
}

function addProfileCardFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = newCardForm.querySelector('.popup__button');
  const resetButton = changeButtonText(submitButton, 'Сохранение...'); 

  const name = newCardForm.elements['place-name'].value;
  const link = newCardForm.elements['link'].value;

  addCard(name, link)
    .then(card => {
      addNewCard(card, userId);
      closeModal(popupNewCard);
      newCardForm.reset();
    })
    .catch(error => {
      console.error('Ошибка при добавлении карточки:', error);
    })
    .finally(() => {
      resetButton(); 
    });
}
profileImageContainer.addEventListener('click', () => {
  avatarForm.reset();
  clearValidation(avatarForm, validationSettings);
  openModal(popupChangeAvatar);
});

function changeAvatarFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = avatarForm.querySelector(validationSettings.submitButtonSelector);
  const resetButton = changeButtonText(submitButton, 'Сохранение...');
  const avatarLink = avatarForm.elements['avatar_link'].value;

  isImageUrl(avatarLink)
    .then(isImage => {
      if (!isImage) {
        throw new Error('Ссылка не ведет на изображение');
      }
      return updateAvatar(avatarLink); 
    })
    .then((res) => {
      profileImage.style.backgroundImage = `url(${res.avatar})`; 
      closeModal(popupChangeAvatar); 
      avatarForm.reset(); 
    })
    .catch(error => {
      console.error('Ошибка при обновлении аватара:', error);
      alert(error.message); 
    })
    .finally(() => {
      resetButton(); 
    });
}
newCardForm.addEventListener('submit', addProfileCardFormSubmit);

function changeButtonText(button, newText, callback) {
  const initialText = button.textContent; 
  button.textContent = newText; 

  return () => {
    button.textContent = initialText;
    if (callback) callback();
  };
}

function renderCards(cards, userId) {
  const placesList = document.querySelector('.places__list');
  
  const newCards = cards.map(card => 
    makeCard(card, handleDeleteCard, handleToggleLike, handleImageClick, userId)
  );

  placesList.replaceChildren(...newCards);
}

function handleDeleteCard(cardId, cardElement) {
  deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch(error => {
      console.error('Ошибка при удалении карточки:', error);
    });
}
const profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener('click', openEditPopup);

function openEditPopup() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(profileForm, validationSettings);

  openModal(popupEdit);
}

const cardAddButton = document.querySelector('.profile__add-button');
cardAddButton.addEventListener('click', openAddCardPopup); 

function openAddCardPopup() {
  clearValidation(popupNewCard, validationSettings);
  newCardForm.reset();
  openModal(popupNewCard);
}

function handleImageClick(card) {
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupCaption.textContent = card.name;

  openModal(popupTypeImage);
}

function updateUserProfile(userData) {
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileImage.style.backgroundImage = `url(${userData.avatar})`;
}

function editProfileFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = profileForm.querySelector('.popup__button');
  const resetButton = changeButtonText(submitButton, 'Сохранение...');

  const name = nameInput.value;
  const about = jobInput.value;

  updateProfileData(name, about)
    .then(data => {
      if (data) {
        profileTitle.textContent = data.name;
        profileDescription.textContent = data.about;
        closeModal(popupEdit);
      }
    })
    .catch(error => {
      console.error('Ошибка при обновлении профиля:', error);
    })
    .finally(() => {
      resetButton();
    });
}
profileForm.addEventListener('submit', editProfileFormSubmit);

function handleToggleLike(cardId, likeButton, likesNumberElement) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  toggleLike(cardId, isLiked)
    .then(updatedCard => {
      likesNumberElement.textContent = updatedCard.likes.length;
      likeButton.classList.toggle('card__like-button_is-active');
    })
    .catch(error => {
      console.error('Ошибка при обновлении лайка:', error);
    });
}
