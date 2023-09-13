import { useDispatch, useSelector } from "react-redux";
import Header from "../component/Header";
import Pagination from "../component/Pagination";
import { paginate } from "../store";
import { useEffect } from "react";

const Shop = () => {
  const data = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage);
  const itemPerPage = useSelector((state) => state.itemPerPage);

  const indexOfLast = currentPage * itemPerPage;
  const indexOfFirst = indexOfLast - itemPerPage;
  const currentItems = (data) => {
    let currentItems = 0;
    currentItems = data.slice(indexOfFirst, indexOfLast);
    return currentItems;
  };

  const currentData = currentItems(data);

  useEffect(() => {
    dispatch(paginate(1));
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div>
      <Header />

      <div className="shop_section">
        <ul className="shop_itemList">
          {currentData.map((it) => (
            <li key={it.id}>
              <div className="shop_imgBox">
                <img alt="item" src={it.image} />
              </div>
              <h5>{it.title}</h5>
              <p>{it.price}원</p>
            </li>
          ))}
        </ul>
      </div>

      <Pagination
        itemPerPage={itemPerPage}
        totalItems={data.length}
      ></Pagination>
    </div>
  );
};

export default Shop;
