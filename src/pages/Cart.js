import { useEffect, useState } from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";

const Cart = ({ googleLogout }) => {
  const userEmail = JSON.parse(
    sessionStorage.getItem(sessionStorage.key(0))
  ).email;

  const [cartItem, setCartItem] = useState([]);

  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem(userEmail));
    const copyCartList = [...getData];
    setCartItem(copyCartList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const decrease = (i) => {
    let copyCartList = [...cartItem];
    if (copyCartList[i].count > 1) {
      const price = copyCartList[i].price / copyCartList[i].count;
      copyCartList[i].price -= price;
      copyCartList[i].count -= 1;

      setCartItem(copyCartList);
      localStorage.setItem(userEmail, JSON.stringify(cartItem));
    }
  };

  const increase = (i) => {
    let copyCartList = [...cartItem];
    const price = copyCartList[i].price / copyCartList[i].count;
    copyCartList[i].price += price;
    copyCartList[i].count += 1;

    setCartItem(copyCartList);
    localStorage.setItem(userEmail, JSON.stringify(cartItem));
  };

  const deleteItem = (i) => {
    let copyCartList = [...cartItem];
    copyCartList.splice(i, 1);

    setCartItem(copyCartList);
    localStorage.setItem(userEmail, JSON.stringify(copyCartList));
  };

  const sumResult = () => {
    let sum = 0;
    cartItem.forEach((it) => (sum += it.price));
    return sum;
  };

  return (
    <div>
      <Header googleLogout={googleLogout} />
      <div className="cart_section">
        <div className="cart_container">
          <div className="cart">
            <h3>장바구니</h3>
            <ul className="cartList">
              {cartItem.map((it, i) => (
                <li key={i}>
                  <div className="cartList_imgBox">
                    <img alt="cart_item" src={it.image} />
                  </div>
                  <div className="cartList_infoBox">
                    <h3>{it.title}</h3>
                    <p>{it.price}원</p>
                    <div className="cart_mp_button_box">
                      <span className="cart_count">수량</span>
                      <div className="cart_countB_box">
                        <button
                          className="cart_button"
                          onClick={() => {
                            decrease(i);
                          }}
                        >
                          -
                        </button>

                        <span>{it.count}</span>
                        <button
                          className="cart_button"
                          onClick={() => {
                            increase(i);
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="deleteB_Box">
                    <button
                      className="button_black"
                      onClick={() => {
                        deleteItem(i);
                      }}
                    >
                      삭제하기
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="cart_result_box">
            <div className="cart_result">
              <ul className="cart_resultList">
                {cartItem.map((it, i) => (
                  <li key={i}>
                    <div>
                      <h5>{it.title}</h5>
                      <span>+ {it.price}원</span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="cart_result_totalB">
                <div className="cart_result_total">
                  <h4>합계</h4>
                  <p className="cart_result">{sumResult()}원</p>
                </div>
                <div className="cart_buy_button_box">
                  <button className="button">전체 구매하기</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
