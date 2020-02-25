export default class Card {
  constructor() {}

// новая карточка
  cardElement (name, link, id, likeCount) {
    const placeCard = document.createElement("div");
    placeCard.classList.add("place-card");
    placeCard.innerHTML = `
       <div class="place-card__image">
       <button class="place-card__delete-icon"></button>
       </div>
       <div class="place-card__description">
       <h3 class="place-card__name"></h3>
       <div class="place-card__like-block">
       <button class="place-card__like-icon"></button>
       <p class="place-card__like-count"></p>
       </div>`;
    placeCard.querySelector('.place-card__image').setAttribute('id', `${id}`);
    placeCard.querySelector(".place-card__name").textContent = name;
    placeCard.querySelector(".place-card__image").style.backgroundImage = `url(${link})`;
    placeCard.querySelector('.place-card__like-count').textContent = likeCount;
    placeCard.addEventListener('click', this.like.bind(this));
    return placeCard;
  }

// like button
  like(event) {
    if (event.target.classList.contains('place-card__like-icon')) {
      event.target.classList.toggle('place-card__like-icon_liked');
      return;
    };
  }
}

