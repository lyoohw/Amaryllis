import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paginate } from "../store";

const Pageination = ({ itemPerPage, totalItems }) => {
  const currentPage = useSelector((state) => state.currentPage);
  const dispatch = useDispatch();
  const [currentNumber, setCurrentNumber] = useState(1);
  const [numberPerPage] = useState(2);

  const numberOfLast = currentNumber * numberPerPage;
  const numberOfFirst = numberOfLast - numberPerPage;

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemPerPage); i++) {
    pageNumbers.push(i);
  }

  const currentnumbers = (pageNumbers) => {
    let currentnumbers = 0;
    currentnumbers = pageNumbers.slice(numberOfFirst, numberOfLast);
    return currentnumbers;
  };

  const numberList = currentnumbers(pageNumbers);

  return (
    <div className="pageNumber_section">
      <nav className="pageNumber">
        <ul>
          <li
            onClick={() => {
              setCurrentNumber(currentNumber - 1);
              dispatch(paginate((currentNumber - 1) * numberPerPage));
            }}
            className={numberList.length !== 2 ? "" : "styleNone"}
          >
            &lt;
          </li>
          {numberList.map((number) => (
            <li
              key={number}
              className={number === currentPage ? "selected" : ""}
              onClick={() => dispatch(paginate(number))}
            >
              <span>{number}</span>
            </li>
          ))}
          <li
            onClick={() => {
              setCurrentNumber(currentNumber + 1);
              dispatch(paginate(currentNumber + numberPerPage));
            }}
            className={numberList.length === 2 ? "" : "styleNone"}
          >
            &gt;
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pageination;
