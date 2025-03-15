export function makeCard(card, handleDeleteCard, handleToggleLike, handleImageClick, userId) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const likeButton = cardElement.querySelector(".card__like-button");
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const cardLikesNumber = cardElement.querySelector(".card__likes-counter");

    cardImage.alt = card.name;
    cardImage.src = card.link;
    cardTitle.textContent = card.name;
    cardLikesNumber.textContent = card.likes.length;

    if (card.owner._id !== userId) {
      deleteButton.style.display = 'none';
    } else {
      deleteButton.addEventListener('click', () => handleDeleteCard(card._id, cardElement));
    }
  
    if (card.likes.some(like => like._id === userId)) {
      likeButton.classList.add('card__like-button_is-active');
    }
  
    likeButton.addEventListener('click', () => handleToggleLike(card._id, likeButton, cardLikesNumber));
    cardImage.addEventListener('click', () => handleImageClick(card));

    return cardElement;
}