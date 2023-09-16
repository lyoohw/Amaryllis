import { useParams } from "react-router-dom";
import Header from "../component/Header";
import { useDispatch, useSelector } from "react-redux";
import { increaseCount, decreaseCount, setModalOpen } from "../store";
import ModalBasic from "../component/ModalBasic";

const Detail = ({ googleLogin }) => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const modalOpen = useSelector((state) => state.modalOpen);
  const data = useSelector((state) => state.items);
  const count = useSelector((state) => state.count);
  const getParamId = useParams();
  const dispatch = useDispatch();
  const paramId = Number(getParamId.id);

  const idItem = data.find((it) => it.id === paramId);

  const decrease = () => {
    if (count > 1) {
      return dispatch(decreaseCount());
    }
  };

  const addCartList = () => {
    const userEmail = JSON.parse(
      sessionStorage.getItem(sessionStorage.key(0))
    ).email;
    const getData = JSON.parse(localStorage.getItem(userEmail));
    const newCartData = {
      id: idItem.id,
      title: idItem.title,
      price: idItem.price * count,
      image: idItem.image,
      count: count,
    };

    const DuplicateCheck = getData.findIndex((it) => {
      return it.id === newCartData.id;
    });

    if (DuplicateCheck === -1) {
      getData.push(newCartData);
      localStorage.setItem(userEmail, JSON.stringify(getData));
    }

    dispatch(setModalOpen());
  };

  return (
    <div>
      <Header />
      <div className="detail_section">
        <div className="detail">
          <div className="d_imgBox">
            <img alt="item" src={idItem.image} />
          </div>
          <div className="d_info_box">
            <div>
              <h3>{idItem.title}</h3>
              <p>{idItem.price}원</p>
              <div className="d_count_box">
                <p>수량</p>
                <button
                  className="minus"
                  onClick={() => {
                    decrease();
                  }}
                >
                  -
                </button>
                <span>{count}</span>
                <button
                  className="plus"
                  onClick={() => {
                    dispatch(increaseCount());
                  }}
                >
                  +
                </button>
              </div>
              <div className="d_totalPrice">
                <p>
                  총 상품금액<span className="total_count">&#40;수량&#41;</span>
                </p>
                <strong>{count * idItem.price}원</strong>
                <span>&#40;{count}개&#41;</span>
              </div>
            </div>
            <div className="d_button_box">
              <button
                className="button d_button"
                onClick={() => {
                  isLoggedIn ? addCartList() : googleLogin();
                }}
              >
                장바구니
              </button>
              <button className="button d_button" onClick={() => {}}>
                구매하기
              </button>
            </div>
            {modalOpen && <ModalBasic />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
