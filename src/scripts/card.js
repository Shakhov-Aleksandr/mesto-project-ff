
import {cardTemplate} from  '../scripts/index.js';
import { openPopup } from './modal.js';



let myLike = [];


const send_or_deleteLikeInServer = (isLiked, cardID, viewCount, count) => {
    if(isLiked.classList.contains('card__like-button_is-active')) {
        fetch(`https://nomoreparties.co/v1/wff-cohort-41/cards/likes/${cardID}`, { 
            method: 'PUT',
                headers: {
                    authorization: '305b30cb-0349-4bc6-ad31-8b3f0302eab7'
                }   
            }
        ) 
        
        viewCount.textContent = count + 1;
    }
    else {
        fetch(`https://nomoreparties.co/v1/wff-cohort-41/cards/likes/${cardID}`, { 
            method: 'DELETE',
                headers: {
                    authorization: '305b30cb-0349-4bc6-ad31-8b3f0302eab7'
                }
            }
        ) 

        count == 0 ? viewCount.textContent = 0 : viewCount.textContent = count - 1;

    } 
}






// Функция создания карточки
export function createCard(card, id, deleteCardHandler, addCardLikeHandler, fullViewCardHandler) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardDeleteBtn = cardElement.querySelector('.card__delete-button');
    const cardLikeBtn = cardElement.querySelector('.card__like-button');
    const cardLikesCount = cardElement.querySelector('.likes-count');
    cardImage.alt = card.name;
    cardImage.src = card.link;
    cardLikesCount.textContent = card.likes.length;

    cardElement.querySelector('.card__title').textContent = card.name;
    // cardDeleteBtn.addEventListener('click', deleteCardHandler);

    
   

    cardLikeBtn.addEventListener('click', (evt) => addCardLikeHandler(evt, card._id));



    card.likes.forEach(like => {
    if (like._id == "f0173b2fceb8a6f592738266") {
        myLike += card._id
    }
    
    });

    if (myLike.includes(card._id)) {
        cardLikeBtn.classList.toggle('card__like-button_is-active');
    }


    cardLikeBtn.addEventListener('click', () => send_or_deleteLikeInServer(cardLikeBtn, card._id, cardLikesCount, card.likes.length));

    cardImage.addEventListener('click', () => fullViewCardHandler(card.name, card.link));
    

    renderDeleteCardBtn(cardDeleteBtn, card._id, card.owner._id, id);
    





    return cardElement;
}

//       /// проверка на авторство карточки
//   if (card.owner._id !== profileId) {
//     deleteButton.classList.add("element__delete-unactive");
//   } else {
//     /// Удаление карточки
//     deleteButton.addEventListener("click", function () {
//       currentCardId = cardId;
//       currentDeleteButton = deleteButton;
//       openDeletePopup();
//     });
//   }

const deleteCardFromServer = (cardID) => {
fetch(`https://nomoreparties.co/v1/wff-cohort-41/cards/${cardID}`, {
   method: 'DELETE',
    headers: {
    authorization: '305b30cb-0349-4bc6-ad31-8b3f0302eab7'
  }
})

}


const popupDeleteCard = document.querySelector('.popup_delete_card');
const formDeleteCard = document.forms.delete_card;


const renderDeleteCardBtn = (btn, cardID, cardOwnerID, myID) => {
    if (cardOwnerID != myID) {
        // card__delete-button-disabled
        btn.classList.add('card__delete-button-disabled');
    } 
    else {
        btn.addEventListener('click', () => {
            
            openPopup(popupDeleteCard)
      
        })
    }
}

formDeleteCard.addEventListener('submit', evt => handlerDeleteCard(evt));
const handlerDeleteCard = () => {

}

// avatarForm.addEventListener('submit', evt => heandlerAddNewAvatarImage(evt));
// const heandlerAddNewAvatarImage = evt => {
//   evt.preventDefault();
//   const avatarLink = avatarForm.elements.link;
//   sendAvatarImageLinkToServer(avatarLink.value)
//   getAvatarImageLinkFromServer();

//   avatarForm.reset();
//   closePopup(popupAvatarImage);
// }


// Функция удаления карточки
export function deleteCard(evt) {
    evt.target.closest('.card').remove();
};

// Функция добавления лайка
export function addCardLike(evt, cardID) {
    evt.target.classList.toggle('card__like-button_is-active');
    myLike += cardID;
};




