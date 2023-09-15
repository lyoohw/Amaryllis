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

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const provider = new GoogleAuthProvider();
  const auth = authService;

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

  const googleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  useEffect(() => {
    const sessitonLogin = sessionStorage.getItem(sessionStorage.key(0));

    if (sessitonLogin !== null) {
      dispatch(setUserData(sessitonLogin));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Home googleLogin={googleLogin} googleLogout={googleLogout} />
          }
        />
        <Route path="/shop" element={<Shop />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
