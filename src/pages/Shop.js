import { useDispatch, useSelector } from "react-redux";
import Header from "../component/Header";
import Pagination from "../component/Pagination";
import { paginate } from "../store";
import { setItems } from "../store";
import { useEffect, useState } from "react";

const Shop = () => {
  const data = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage);
  const itemPerPage = useSelector((state) => state.itemPerPage);
  const [BisTrue, setBisTrue] = useState(false);

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
    dispatch(setItems(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const undoSort = () => {
    let copyData = [...data];
    const setData = copyData.sort((a, b) => {
      if (a.id > b.id) return 1;
      if (a.id < b.id) return -1;
      return 0;
    });

    return setData;
  };

  const lowPriceSort = () => {
    let copyData = [...data];
    const setData = copyData.sort((a, b) => {
      if (a.price > b.price) return 1;
      if (a.price < b.price) return -1;
      return 0;
    });

    return setData;
  };

  const buttonHandler = () => {
    if (BisTrue === false) {
      setBisTrue(!BisTrue);
      return dispatch(setItems(lowPriceSort()));
    }
    if (BisTrue === true) {
      setBisTrue(!BisTrue);
      return dispatch(setItems(undoSort()));
    }
  };

  return (
    <div>
      <Header />

      <div className="shop_section">
        <div className="shop_buttonBox">
          <button
            className="button_black"
            onClick={() => {
              buttonHandler();
            }}
          >
            {BisTrue ? "원래대로" : "저렴한 가격 순"}
          </button>
        </div>
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
