import React from "react";
import Bv from "../assets/images/bv.png";
import Cctn from "../assets/images/cctn.png";
import Fb from "../assets/images/fb.png";
import Gp from "../assets/images/gp.png";
import Pttt from "../assets/images/pttt.png";
import Tl from "../assets/images/tl.png";
import Yt from "../assets/images/yt.png";
import "./footer.scss";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-wraper">
        <div className="gp">
          <img src={Gp} />
        </div>
        <div className="bv">
          <img src={Bv} />
        </div>
        <div className="cctn">
          <img src={Cctn} />
        </div>
        <div className="pttt">
          <div className="pttt-text">PHƯƠNG THỨC THANH TOÁN</div>
          <img src={Pttt} />
        </div>
        <div className="tdct">
          <div className="pttt-text">THEO DÕI CHÚNG TÔI</div>
          <div className="tdct-group">
            <img src={Fb} />
            <img src={Yt} />
            <img src={Tl} />
          </div>
        </div>
      </div>
      <div className="footer-wraper2">
        <div className="group-text">
          <ul>
            <li>
              <div>CQ9</div>
              <div>JDB</div>
              <div>SEXY</div>
              <div>AE</div>
              <div>CG</div>
            </li>
            <li>
              <div>PLAYSTAR</div>
              <div>MG LIVE</div>
              <div>PLAYTECH</div>
              <div>CMD 368</div>
              <div>JILI</div>
            </li>
            <li>
              <div>YGG</div>
              <div>CASINO</div>
              <div>SABA</div>
              <div>SBOBET</div>
              <div>TC GAMING</div>
            </li>
            <li>
              <div>ASIA GAMING</div>
              <div>PRAGMATIC PLAY</div>
              <div>VNTOP GAME</div>
              <div>DREAMGAMING</div>
              <div>GOLDENBAY</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
