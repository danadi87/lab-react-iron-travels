import React, { useState } from "react";
import travelPlansData from "../assets/travel-plans.json";
import TravelPlanCard from "./TravelPlanCard.jsx";

function TravelList() {
  const [travelList, setTravelList] = useState(travelPlansData);
  const [favorites, setFavorites] = useState([]);
  const colors = ["purple", "blue", "green", "yellow", "orange", "red"];
  const [buttonColors, setButtonColors] = useState({});

  const handleClick = (id) => {
    const updatedList = travelList.filter((travel) => travel.id !== id);
    setTravelList(updatedList);
  };
  const handleClickFavorite = (id) => {
    const updatedFavorites = favorites.includes(id)
      ? favorites.filter((favId) => favId !== id)
      : [...favorites, id];
    setFavorites(updatedFavorites);

    setButtonColors((prevColors) => ({
      ...prevColors,
      [id]: colors[Math.floor(Math.random() * colors.length)],
    }));
  };
  return (
    <>
      <ul>
        {travelList.map((plan) => (
          <TravelPlanCard
            key={plan.id}
            plan={plan}
            handleClick={handleClick}
            handleClickFavorite={handleClickFavorite}
            favoriteColor={buttonColors[plan.id]}
          />
        ))}
      </ul>
      <div className="favorites">
        <h2>Favorites</h2>
        <ul>
          {favorites.map((favId) => {
            const favoritePlan = travelList.find((plan) => plan.id === favId);
            return <li key={favoritePlan.id}>{favoritePlan.destination}</li>;
          })}
        </ul>
      </div>
    </>
  );
}
export default TravelList;
