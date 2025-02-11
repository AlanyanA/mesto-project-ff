const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
const currentCards = document.querySelector('.places__list');
const placesList = document.querySelector('.places__list');
function makeCard(card) {
    const cloneCard = cardTemplate.cloneNode(true);
    cloneCard.querySelector('.card__image').alt = card.name;
    cloneCard.querySelector('.card__image').src = card.link;
    cloneCard.querySelector('.card__title').textContent = card.name;
    const deleteButton = cloneCard.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => deleteCard(cloneCard));
    return cloneCard;
}

function deleteCard(item) {
    item.remove();
}

for(let i = 0; i < initialCards.length; i++){
    placesList.append(makeCard(initialCards[i]));
}
