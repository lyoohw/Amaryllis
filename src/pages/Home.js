import { useSelector } from "react-redux";
import CarouselImage from "../component/CarouselImage";
import Header from "../component/Header";

const Home = () => {
  const data = useSelector((state) => state.items);

  return (
    <div>
      <Header />
      <CarouselImage />
      <div className="goShop_section">
        <div className="goShop">
          <div className="gsItem1">
            <div className="gs_textBox">
              <h5>Skin Care</h5>
              <p>당신의 피부 고민을 해결해보세요!</p>
              <button className="button">SHOP NOW</button>
            </div>
            <div className="gs_imgBox">
              <img alt="skin care" src="/assets/item2_png.png" />
            </div>
          </div>
          <div className="gsItem2">
            <div className="gs_textBox">
              <h5>Perfume</h5>
              <p>나만의 향기를 찾고 있다면</p>
              <button className="button">VIEW MORE</button>
            </div>
            <div className="gs_imgBox">
              <img alt="perfume" src="/assets/item25_png.png" />
            </div>
          </div>
        </div>
      </div>

      <div className="newItem_section">
        <div className="newItem">
          <h4>New Item</h4>
          <ul className="newItemList">
            {data.slice(0, 3).map((it, i) => (
              <li key={i}>
                <div className="ni_imgBox">
                  <img alt="new items" src={it.image} />
                </div>
                <h5>{it.title}</h5>
                <p>{it.price} 원</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
