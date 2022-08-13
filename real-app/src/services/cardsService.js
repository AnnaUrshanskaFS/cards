import httpService from "./httpService";

export function getCard(cardId) {
  return httpService.get(`/cards/my-cards/${cardId}`);
}

export function editCard(id, card) {
  return httpService.put(`/cards/${id}`, card);
}
export function createCard(card) {
  return httpService.post("/cards", card);
}

export function getAll() {
  return httpService.get("/cards/my-cards");
}
export function deleteCard(id) {
  return httpService.delete(`/cards/${id}`);
}
const cardsService = {
  createCard,
  deleteCard,
  getAll,
  getCard,
  editCard,
};
export default cardsService;
