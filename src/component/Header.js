import { FaShoppingBag } from "react-icons/fa";
import { GoPersonFill } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { setHisTrue } from "../store";
import { Link } from "react-router-dom";

const Header = () => {
  const isTrue = useSelector((state) => state.HisTrue);
  const dispatch = useDispatch();

  return (
    <div>
      <ul className={isTrue ? "menuBox_open" : "menuBox_close"}>
        <li>About</li>
        <li>Shop</li>
      </ul>
      <header className="header">
        <div
          onClick={() => {
            dispatch(setHisTrue());
          }}
          className={isTrue ? "menuBox menuBox_X" : "menuBox"}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className="shopMenu">
          <li>About</li>
          <li>Shop</li>
        </ul>
        <div className="logoBox">
          <Link to="/">
            <img alt="logo" src="/assets/logo.png" />
          </Link>
        </div>
        <ul className="sideMenu">
          <li>
            <GoPersonFill />
          </li>
          <li>
            <FaShoppingBag />
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Header;
