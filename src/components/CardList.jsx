import "../styles/components/CardList.css"
import {starData} from "../data/starData"
import CardItem from "../components/CardItem"



function CardList({ constellations }) {
    return (
      <div className="CardList">
        {constellations.map((card) => (
          <CardItem key={card.id} {...card} />
        ))}
      </div>
    );
  }

export default CardList