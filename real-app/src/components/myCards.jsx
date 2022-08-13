import PageHeader from "./common/pageHeader";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import cardsService from "../services/cardsService";
import { useState } from "react";
import Card from "./card";
const MyCards = () => {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    async function getCards() {
      const { data } = await cardsService.getAll();
      setCards(data);
    }
    getCards();
  }, []);
  return (
    <>
      <PageHeader title={"My Cards"} description={"The list of your cards"} />

      <div className="row">
        <Link to="create-card" className="btn btn-outline-secondary">
          Create a new card
        </Link>
      </div>

      <div className="row mt-4">
        {!cards.length ? (
          <p>There is No Cards</p>
        ) : (
          cards.map((card) => <Card key={card.id} card={card} />)
        )}
      </div>
    </>
  );
};

export default MyCards;
