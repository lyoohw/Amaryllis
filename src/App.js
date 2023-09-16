import "./App.css";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Shop from "./pages/Shop";
import { Routes, Route, useNavigate } from "react-router-dom";
import { authService } from "./firebase-config";
import {
  GoogleAuthProvider,
  browserSessionPersistence,
  setPersistence,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn, setUserData } from "./store";
import { useEffect } from "react";
import Cart from "./pages/Cart";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const provider = new GoogleAuthProvider();
  const auth = authService;

  //구글 로그인
  const googleLogin = () => {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return signInWithPopup(auth, provider)
          .then((data) => {
            dispatch(setUserData(JSON.stringify(data.user)));
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //구글 로그아웃
  const googleLogout = () => {
    navigate("/");
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  //로그인 상태 확인
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        //로그인 된 상태일 경우
        dispatch(setIsLoggedIn(true));
      } else {
        dispatch(setIsLoggedIn(false));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  //새로고침 해도 구글 닉네임이 사라지지 않도록 세션스토리지 value 가져와서 userData에 넣음
  useEffect(() => {
    const sessitonLogin = sessionStorage.getItem(sessionStorage.key(0));

    if (sessitonLogin !== null) {
      dispatch(setUserData(sessitonLogin));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const userEmail = JSON.parse(
        sessionStorage.getItem(sessionStorage.key(0))
      ).email;
      const getLocalData = localStorage.getItem(userEmail);

      if (getLocalData === null) {
        localStorage.setItem(userEmail, JSON.stringify([]));
      } else {
        const getCartData = JSON.parse(localStorage.getItem(userEmail));
        const copyCartList = [...getCartData];
        localStorage.setItem(userEmail, JSON.stringify(copyCartList));
      }
    }
  }, [isLoggedIn]);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Home googleLogin={googleLogin} googleLogout={googleLogout} />
          }
        />
        <Route
          path="/shop"
          element={
            <Shop googleLogin={googleLogin} googleLogout={googleLogout} />
          }
        />
        <Route
          path="/detail/:id"
          element={
            <Detail googleLogin={googleLogin} googleLogout={googleLogout} />
          }
        />
        <Route path="/cart" element={<Cart googleLogout={googleLogout} />} />
      </Routes>
    </div>
  );
}

export default App;
