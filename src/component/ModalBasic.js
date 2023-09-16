import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setModalOpen } from "../store";

const ModalBasic = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="modal">
      <div className="modal_content">
        <p>장바구니에 상품이 추가되었습니다.</p>
      </div>
      <div className="modal_buttons">
        <button
          className="button_black"
          onClick={() => {
            navigate("/cart");
            dispatch(setModalOpen());
          }}
        >
          장바구니로 가기
        </button>
        <button
          className="button_black"
          onClick={() => {
            navigate("/shop");
            dispatch(setModalOpen());
          }}
        >
          쇼핑 계속하기
        </button>
      </div>
    </div>
  );
};

export default ModalBasic;
