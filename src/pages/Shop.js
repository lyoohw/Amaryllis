import { useSelector } from "react-redux";
import Header from "../component/Header";

const Shop = () => {
  const data = useSelector((state) => state.items);
  console.log(data);

  return (
    <div>
      <Header />

      <ul></ul>
    </div>
  );
};

export default Shop;
