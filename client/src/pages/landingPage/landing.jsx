import "./landing.css";
import "atropos/css";
import "aos/dist/aos.css";
import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useContext,
} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ScrollSmoother } from "gsap-trial/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button, Modal } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import axios from "axios";
import { gsap } from "gsap";
import AOS from "aos";
import Atropos from "atropos/react";
import doctorSVG from "../../assets/images/doctorSvg.svg";
import aaa from "../../assets/images/dashboard.svg";
import bbb from "../../assets/images/woman.svg";
import features from "../../assets/images/Progress.svg";
import dashboad from "../../assets/images/Dashboardaaaaaa.png";
import Logo from "../../assets/images/logo.svg";
import wave from "../../assets/images/wave.svg";
import { AuthContext } from "../../context/AuthContext";
import { useUserData } from "../../context/UserDataContext";

gsap.registerPlugin(ScrollTrigger);

const Landing = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const [wordIndex, setWordIndex] = useState(0);
  const words = ["Operations", "Efficiency", "Workflow"];
  const wordRef = useRef(null);
  const main = useRef();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userData, updateUserData } = useUserData();

  // modal begin

  const isEmailValid = (email) => {
    // Regular expression to check for a valid email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSignIn = async () => {
    try {
      if (!isEmailValid(email)) {
        setError(true);
        console.log("aaa");
        return;
      }

      setConfirmLoading(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const check = await axios.get(
        `http://127.0.0.1:1128/api/user/checkMail/${user.email}`
      );
      const userData = check.data
      if (check.data.email === user.email && check.data.type == "pharmacy" && check.data.Pharmacy.isverified) {
        dispatch({ type: "LOGIN", payload: user });
        setOpen(false);
        setConfirmLoading(false);
        updateUserData(check.data)
        console.log(userData);
        navigate(`/dashboard`, {state:{userData: userData}});
      } else {
        setError(true);
        setConfirmLoading(false);
      }
    } catch (error) {
      setError(true);
      setConfirmLoading(false);
      console.error(error);
    }
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  // modal end

  // text 3D box hover effect
  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const boxes = self.selector(".box");
      boxes.forEach((box) => {
        gsap.to(box, {
          scale: 1.3,
          duration: 0.5,
          scrollTrigger: {
            trigger: box,
            start: "30",
            end: "bottom",
            scrub: 2,
          },
        });
      });
    }, main);
    return () => ctx.revert();
  }, []);

  // smooth scroller
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const smoother = ScrollSmoother.create({
        smooth: 0.8,
        effects: true,
        smoothTouch: 0.1,
      });
    });
    return () => ctx.revert();
  }, [location]);

  // text animation
  useEffect(() => {
    const tl = gsap.timeline();

    const changeWord = () => {
      tl.to(wordRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.5,
        ease: "power1.out",
        onComplete: () => {
          setWordIndex((wordIndex) => (wordIndex + 1) % words.length);
          tl.to(wordRef.current, {
            opacity: 1,
            y: 0,
            duration: 2,
            ease: "power1.out",
          });
        },
      });
    };

    const interval = setInterval(changeWord, 3000);
    clearInterval(interval);
  }, []);

  // element fade animation
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    });
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <div className="landing_container">
          <section className="section-1">
            <div className="top-nav">
              <nav>
                <ul>
                  <li>Dashboard</li>
                  <li>Inventory</li>
                  <li>Contact</li>
                  <li onClick={showModal}>Get Started</li>
                </ul>
              </nav>
              <Modal
                open={open}
                onOk={handleSignIn}
                onCancel={handleCancel}
                confirmLoading={confirmLoading}
                cancelButtonProps={{ style: { display: "none" } }}
                okText="Sign In"
                width={400}
                bodyStyle={{ height: "400px" }}
              >
                <>
                  <form class="form_container">
                    <div class="logo_container">
                      <img src={Logo} alt="" />
                    </div>
                    <div class="title_container">
                      <p class="title">Login to your Account</p>
                    </div>
                    <div class="input_container">
                      <label class="input_label" for="email_field">
                        Email
                      </label>
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        height="24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon"
                      >
                        <path
                          stroke-linejoin="round"
                          stroke-linecap="round"
                          stroke-width="1.5"
                          stroke="#141B34"
                          d="M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5"
                        ></path>
                        <path
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          stroke="#141B34"
                          d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"
                        ></path>
                      </svg>
                      <input
                        placeholder="name@mail.com"
                        name="input-name"
                        type="text"
                        class="input_field"
                        id="email_field"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>
                    <div class="input_container">
                      <label class="input_label" for="password_field">
                        Password
                      </label>
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        height="24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-width="1.5"
                          stroke="#141B34"
                          d="M18 11.0041C17.4166 9.91704 16.273 9.15775 14.9519 9.0993C13.477 9.03404 11.9788 9 10.329 9C8.67911 9 7.18091 9.03404 5.70604 9.0993C3.95328 9.17685 2.51295 10.4881 2.27882 12.1618C2.12602 13.2541 2 14.3734 2 15.5134C2 16.6534 2.12602 17.7727 2.27882 18.865C2.51295 20.5387 3.95328 21.8499 5.70604 21.9275C6.42013 21.9591 7.26041 21.9834 8 22"
                        ></path>
                        <path
                          stroke-linejoin="round"
                          stroke-linecap="round"
                          stroke-width="1.5"
                          stroke="#141B34"
                          d="M6 9V6.5C6 4.01472 8.01472 2 10.5 2C12.9853 2 15 4.01472 15 6.5V9"
                        ></path>
                        <path
                          fill="#141B34"
                          d="M21.2046 15.1045L20.6242 15.6956V15.6956L21.2046 15.1045ZM21.4196 16.4767C21.7461 16.7972 22.2706 16.7924 22.5911 16.466C22.9116 16.1395 22.9068 15.615 22.5804 15.2945L21.4196 16.4767ZM18.0228 15.1045L17.4424 14.5134V14.5134L18.0228 15.1045ZM18.2379 18.0387C18.5643 18.3593 19.0888 18.3545 19.4094 18.028C19.7299 17.7016 19.7251 17.1771 19.3987 16.8565L18.2379 18.0387ZM14.2603 20.7619C13.7039 21.3082 12.7957 21.3082 12.2394 20.7619L11.0786 21.9441C12.2794 23.1232 14.2202 23.1232 15.4211 21.9441L14.2603 20.7619ZM12.2394 20.7619C11.6914 20.2239 11.6914 19.358 12.2394 18.82L11.0786 17.6378C9.86927 18.8252 9.86927 20.7567 11.0786 21.9441L12.2394 20.7619ZM12.2394 18.82C12.7957 18.2737 13.7039 18.2737 14.2603 18.82L15.4211 17.6378C14.2202 16.4587 12.2794 16.4587 11.0786 17.6378L12.2394 18.82ZM14.2603 18.82C14.8082 19.358 14.8082 20.2239 14.2603 20.7619L15.4211 21.9441C16.6304 20.7567 16.6304 18.8252 15.4211 17.6378L14.2603 18.82ZM20.6242 15.6956L21.4196 16.4767L22.5804 15.2945L21.785 14.5134L20.6242 15.6956ZM15.4211 18.82L17.8078 16.4767L16.647 15.2944L14.2603 17.6377L15.4211 18.82ZM17.8078 16.4767L18.6032 15.6956L17.4424 14.5134L16.647 15.2945L17.8078 16.4767ZM16.647 16.4767L18.2379 18.0387L19.3987 16.8565L17.8078 15.2945L16.647 16.4767ZM21.785 14.5134C21.4266 14.1616 21.0998 13.8383 20.7993 13.6131C20.4791 13.3732 20.096 13.1716 19.6137 13.1716V14.8284C19.6145 14.8284 19.619 14.8273 19.6395 14.8357C19.6663 14.8466 19.7183 14.8735 19.806 14.9391C19.9969 15.0822 20.2326 15.3112 20.6242 15.6956L21.785 14.5134ZM18.6032 15.6956C18.9948 15.3112 19.2305 15.0822 19.4215 14.9391C19.5091 14.8735 19.5611 14.8466 19.5879 14.8357C19.6084 14.8273 19.6129 14.8284 19.6137 14.8284V13.1716C19.1314 13.1716 18.7483 13.3732 18.4281 13.6131C18.1276 13.8383 17.8008 14.1616 17.4424 14.5134L18.6032 15.6956Z"
                        ></path>
                      </svg>
                      <input
                        placeholder="Password"
                        title="Inpit title"
                        name="input-name"
                        type="password"
                        class="input_field"
                        id="password_field"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    {error && (
                      <span style={{ color: "red", transition: "0.2s" }}>
                        Wrong email or password!
                      </span>
                    )}

                    <p class="note">Terms of use &amp; Conditions</p>
                  </form>
                </>
              </Modal>
              <div>
                <h1 id="logo">MediCo</h1>
              </div>
            </div>
            <div className="text_container">
              <div className="landing_text_anim">
                <img src={bbb} alt="" />

                <h1>Experience Pharmacy Innovation</h1>

                <h1>
                  Enhancing{" "}
                  <span
                    ref={wordRef}
                    className={`spannn animate__animated animate__fadeInDown`}
                  >
                    {words[wordIndex]}
                  </span>
                </h1>
                <h1>Your Pharmacy Dashboard Solution</h1>

                <img id="aaa" src={aaa} alt="" />
                <button className="get-started">Get Started</button>
              </div>
            </div>
          </section>
          <section className="section-2" ref={main}>
            <Atropos
              className="my-atropos box"
              rotateXMax={4}
              rotateYMax={4}
              shadow={false}
              activeOffset={0}
              shadowScale={0}
              highlight={false}
              alwaysActive={true}
              onEnter={() => console.log("Enter")}
              onLeave={() => console.log("Leave")}
            >
              {" "}
              <div
                style={{
                  backgroundColor: "#706bf997",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "3rem",
                  transition: "0.3s",
                }}
                className="dashbaord-bg"
              >
                <div className="dashboard_anim" data-atropos-offset="1">
                  <img src={dashboad} alt="" />
                </div>
              </div>
            </Atropos>
          </section>
          <section className="section3">
            <div
              data-aos-delay="300"
              className="desc_landing"
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
            >
              <h1>How We Serve Pharmacies</h1>
              <p>
                We want to transform the way you do business. Digital
                Pharmacist’s comprehensive digital engagement platform combines
                cloud-based communication and adherence solutions with expert
                digital marketing and reputation management, built to help you
                succeed in a digital world.
              </p>
            </div>
            <div className="intru">
              <div className="instru_desc" data-aos="fade-right">
                <h1>The Pharmacy Experience Dashboard</h1>
                <p>
                  We’ve created a portal that connects our entire suite of
                  digital solutions so you can manage your pharmacy all in one
                  place. Digital Pharmacist’s dashboard lets you customize
                  website settings like delivery options and store hours. You
                  can view the website, mobile app, and digital marketing
                  reports, track patient call volume, and take care of incoming
                  patient SMS and voice messages.
                </p>
              </div>
              <img
                src="https://www.digitalpharmacist.com//wp-content/uploads/2020/05/pharmacy-experience-ashboard.svg"
                alt="aa"
                data-aos="fade-left"
                data-aos-delay="200"
              />
            </div>
          </section>
          <section className="section4">
            <img
              data-aos="fade-right"
              data-aos-delay="100"
              src={features}
              alt=""
            />
            <div>
              <h1 data-aos="zoom-in" data-aos-delay="200">
                Why should choose MediCo
              </h1>
              <ul>
                <li data-aos="zoom-in" data-aos-delay="300">
                  Comprehensive suite of digital solutions
                </li>
                <li data-aos="zoom-in" data-aos-delay="400">
                  Customizable dashboards for easy accessibility
                </li>
                <li data-aos="zoom-in" data-aos-delay="500">
                  Strategic planning and implementation support
                </li>
                <li data-aos="zoom-in" data-aos-delay="600">
                  Personalized customer service
                </li>
              </ul>
            </div>
          </section>
          <section className="last_section">
            <img src={wave} alt="" />
            <div></div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Landing;
