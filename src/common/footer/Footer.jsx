import React, { useContext } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { Fade } from "react-awesome-reveal";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

function Footer() {
  //=======
  //CONTEXT
  //=======
  const { state } = useContext(Context);
  const { settings } = state;
  const { storeAddress, playstore, appstore, email, whatsapp } =
    (settings &&
      settings
        .map((s) => ({
          playstore: s.playstore,
          appstore: s.appstore,
          storeAddress: s.storeAddress,
          whatsapp: s.whatsapp,
          email: s.email,
        }))
        .find(() => true)) ||
    {};
  return (
    <>
      <footer>
        <div className="container grid2 footer-wrap">
          <div className="box">
            <h1>shopFinity</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
              ab voluptatibus laudantium adipisci sequi ducimus doloremque vel
              quis libero voluptates nemo distinctio id, iure ullam corporis,
            </p>
            <div className="">
              <span className="icon d_flex">
                <Fade cascade direction="down" triggerOnce damping={0.4}>
                  <a
                    href={`${playstore}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="img a_flex"
                  >
                    <i className="fa-brands fa-google-play"></i>
                    <span>Google Play</span>
                  </a>
                  <a
                    href={`${appstore}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="img a_flex app-store"
                  >
                    <i className="fa-brands fa-app-store-ios"></i>
                    <span>App Store</span>
                  </a>
                </Fade>
              </span>
            </div>
          </div>

          <div className="box">
            <h2>Top Categories</h2>
            <ul>
              <Fade cascade direction="down" triggerOnce damping={0.4}>
                <li>
                  <Link to="/"> Mobile Phone</Link>
                </li>
                <li>
                  <Link to="/">Modern Sofa</Link>
                </li>
                <li>
                  <Link to="/">Arm Chair</Link>
                </li>
                <li>
                  <Link to="/">Smart Watches</Link>
                </li>
              </Fade>
            </ul>
          </div>
          <div className="box">
            <h2>Useful Links</h2>
            <ul>
              <Fade cascade direction="down" triggerOnce damping={0.4}>
                <li>
                  <a href="#shop">Shop</a>
                </li>
                <li>
                  <Link to="/">Cart </Link>
                </li>
                <li>
                  <Link to="/">Login</Link>
                </li>
                <li>
                  <Link to="/">Privacy Policy</Link>
                </li>
              </Fade>
            </ul>
          </div>
          <div className="box">
            <h2>Contact </h2>
            <ul>
              <Fade direction="down" triggerOnce damping={0.4}>
                <li className="a_flex">
                  <LocationOnOutlinedIcon className="mui_icon" />
                  <span>{storeAddress}</span>
                </li>
              </Fade>
              <div>
                <Fade cascade direction="down" triggerOnce damping={0.4}>
                  <li className="a_flex">
                    <MailOutlineOutlinedIcon className="mui_icon" />
                    Email:&#160;<a href={`mailto:${email}`}>{email}</a>
                  </li>
                  <li className="a_flex">
                    <PhoneInTalkOutlinedIcon className="mui_icon" />
                    Phone:&#160;<a href={`tel:${whatsapp}`}>{whatsapp}</a>
                  </li>{" "}
                </Fade>
              </div>{" "}
              <small className="developer">
                Developer By{" "}
                <a
                  href="https://my-portfolio-nine-nu-28.vercel.app/"
                  target="_blank"
                  rel="noonpener noreferrer"
                >
                  Olatunji Akande
                </a>
              </small>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
