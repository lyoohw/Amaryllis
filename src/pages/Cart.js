import { useEffect, useState } from "react";
import Header from "../component/Header";

const Cart = () => {
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
    localStorage.setItem(userEmail, JSON.stringify(cartItem));
  };

  const sumResult = () => {
    let sum = 0;
    cartItem.forEach((it) => (sum += it.price));
    return sum;
  };

  return (
    <div>
      <Header />
      <div className="cart_section">
        <div className="cart">
          <h3>Cart</h3>
          <ul>
            {cartItem.map((it, i) => (
              <li key={i}>
                <div></div>
                <div>
                  <h3>{it.title}</h3>
                  <p>{it.price}원</p>
                  <div>
                    <button
                      onClick={() => {
                        decrease(i);
                      }}
                    >
                      -
                    </button>
                    <span>{it.count}</span>
                    <button
                      onClick={() => {
                        increase(i);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => {
                      deleteItem();
                    }}
                  >
                    삭제하기
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ul>
            {cartItem.map((it, i) => (
              <li key={i}>
                <div>
                  <h5>{it.title}</h5>
                  <span>{it.price}</span>
                </div>
              </li>
            ))}
          </ul>
          <div>{sumResult()}</div>
        </div>
        <div>
          <button>전체 구매하기</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
