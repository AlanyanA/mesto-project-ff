const card = document.querySelector("#card-template").content;

export function makeCard(newCardTitle, newCardImage, deleteCard, likeCardButton, openImageModal) {
    const cardElement = card.querySelector(".card").cloneNode(true);
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const likeButton = cardElement.querySelector(".card__like-button");
    const imageButton = cardElement.querySelector(".card__image");
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector(".card__title");

    cardImage.alt = newCardTitle;
    cardImage.src = newCardImage;
    cardTitle.textContent = newCardTitle;

    likeButton.addEventListener("click", likeCardButton);
    deleteButton.addEventListener("click", deleteCard);
    imageButton.addEventListener("click", () =>
    openImageModal(newCardImage, newCardTitle));
    return cardElement;
}

export function deleteCard(event) {
    const deleteItem = event.target.closest(".places__item");
    deleteItem.remove();
}

export function likeCardButton(event) {
    event.target.classList.add("card__like-button_is-active");
}