import { BsGithub } from "react-icons/bs";
import { SiTistory } from "react-icons/si";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="Footer_section">
      <div className="Footer">
        <div>Capyright by.Lyoo HyeWon | 2023</div>
        <ul>
          <li>
            <button
              className="toLink"
              onClick={() => window.open("https://github.com/lyoohw", "_blank")}
            >
              <BsGithub />
            </button>
          </li>
          <li>
            <button
              className="toLink"
              onClick={() =>
                window.open("https://dailyitstudy.tistory.com/", "_blank")
              }
            >
              <SiTistory />
            </button>
          </li>
        </ul>
        <div>
          <MdEmail />
          <p>lyoohye1@gmail.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
