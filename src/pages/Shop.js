import { useDispatch, useSelector } from "react-redux";
import Header from "../component/Header";
import Footer from "../component/Footer";
import Pagination from "../component/Pagination";
import { paginate } from "../store";
import { setItems } from "../store";
import { resetCount } from "../store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Shop = ({ googleLogin, googleLogout }) => {
  const navigate = useNavigate();
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

  //shop페이지에 들어올 때 첫페이지가 나오게 하고, 상품 데이터 세팅
  useEffect(() => {
    dispatch(paginate(1));
    dispatch(setItems(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //페이지가 바뀌면 화면 상단으로
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  //상세페이지에서 샵으로 나오면 수량Count를 다시 1로 초기화
  useEffect(() => {
    dispatch(resetCount());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //정렬 원래대로
  const undoSort = () => {
    let copyData = [...data];
    const setData = copyData.sort((a, b) => {
      if (a.id > b.id) return 1;
      if (a.id < b.id) return -1;
      return 0;
    });

    return setData;
  };

  //저렴한 가격 순으로
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
      <Header googleLogin={googleLogin} googleLogout={googleLogout} />

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
            <li
              key={it.id}
              onClick={() => {
                navigate(`/detail/${it.id}`);
              }}
            >
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
      <Footer />
    </div>
  );
};

export default Shop;
