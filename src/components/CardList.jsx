import "../styles/components/CardList.css"
import {starData} from "../data/starData"
import CardItem from "../components/CardItem"



function CardList({ constellations }) {
    return (
      <div className="CardList" style={{marginTop: "40px"}}>
        {constellations.map((card) => (
          <CardItem key={card.id} {...card} />
        ))}
      </div>
    );
  }

export default CardList