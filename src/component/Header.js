import { FaShoppingBag } from "react-icons/fa";
import { GoPersonFill } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { setHisTrue } from "../store";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const isTrue = useSelector((state) => state.HisTrue);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div>
      <ul className={isTrue ? "menuBox_open" : "menuBox_close"}>
        <li
          onClick={() => {
            navigate("/");
            setTimeout(() => dispatch(setHisTrue()), 100);
          }}
        >
          Home
        </li>
        <li
          onClick={() => {
            navigate("/shop");
            setTimeout(() => dispatch(setHisTrue()), 100);
          }}
        >
          Shop
        </li>
      </ul>
      <header className="header">
        <div className="nav">
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
            <li
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </li>
            <li
              onClick={() => {
                navigate("/shop");
              }}
            >
              Shop
            </li>
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
        </div>
      </header>
    </div>
  );
};

export default Header;
