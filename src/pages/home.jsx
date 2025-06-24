import React, { useState } from "react";
import { PatternFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";
import videoIcon from "../assets/icons/Group 2.svg";
import checkedIcon from "../assets/icons/checked-icon.svg";
import ticket from "../assets/icons/ticket.svg";
import gift from "../assets/icons/gift.svg";
import modalStep from "../assets/img/modal-step.png";
import styles from "./home.module.css";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const url =
      "https://script.google.com/macros/s/AKfycbzmesk4Jfiu1K_ZOCJkvzFuJp5ICBSA0OrSKhlU6UyvWxUG7AM9zNH1aYHSPAMGqWE6/exec";
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `Name=${name}&Email=${number}`,
    })
      .then((res) => res.text())
      .then((data) => {
        setIsLoading(false);
        navigate("/last");
        setNumber("");
        setName("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <div className={styles.navbar}>
            <div className={styles.online}>
              <img src={videoIcon} alt="icon" />
              <p className={styles.navbarText}>Online</p>
            </div>
            <p className={styles.navbarText}>30-Iyun</p>
            <p className={styles.navbarText}>20:30</p>
          </div>
          <div className={styles.price}>2000$</div>

          <p className={styles.bodyText}>
            DAN boshlanuvchi to’lov qilib, qolganini 24 oyga bo’lib to’lash
            imkoniyati
          </p>

          <p className={styles.bodyText2}>
            30-iyunda bo’ladigan Bepul Online Taqdimotda qatnashib maxsus
            chegirmaga ega bo’ling!
          </p>

          <button
            onClick={() => {
              setIsModalOpen(true);
              if (typeof fbq !== "undefined") {
                fbq("trackCustom", "OpenModalButtonClicked", {
                  buttonText: "Bepul qatnashish",
                  page: window.location.pathname,
                });
              }
            }}
            className={styles.freeJoinBtn}
          >
            <span> Bepul qatnashish</span>
          </button>

          <div className={styles.businessDirektor}>
            <div className={styles.avatar}>
              <div>
                <img src={checkedIcon} alt="checkedIcon" />
              </div>
            </div>
            <div className={styles.avatarName}>
              <p>Islomjon</p>
              <p>Mansurov</p>
              <p>Biznes rahbari</p>
            </div>
          </div>

          <div className={styles.bonus}>
            <div>
              <img src={ticket} alt="ticket" />
              <p>3 kishiga Umra ziyorati</p>
            </div>

            <div>
              <img src={gift} alt="gift" />
              <p>
                Televizor - Muzlatgich Kir mashina - Gaz plita Konditsioner - 3
                kishiga
              </p>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.marquee}>
            {[...Array(10)].map((_, i) => (
              <p key={i}>
                Oxygen House qurilish kompaniyasining Promzona xududida
                joylashgan “Savdogarlar”
              </p>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={modalStep} alt="modalStep" className={styles.modalStep} />
            <p className={styles.information}>ma'lumotlaringizni qoldiring!</p>
            <div className={styles.form}>
              <div className={styles.inputs}>
                <input
                  type="text"
                  placeholder="Ismingiz"
                  name="name"
                  value={name || ""}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <PatternFormat
                  format="+998 ## ### ## ##"
                  allowEmptyFormatting
                  name="number"
                  mask=" "
                  value={number || ""}
                  onChange={(e) => setNumber(e.target.value)}
                  required
                  className={styles.contactInputPhone}
                  autoComplete="off"
                  placeholder="Telefon raqamingiz"
                />
              </div>
              <div className={styles.submit}>
                <button
                  className={number && name ? styles.activeButton : ""}
                  disabled={!number || !name}
                  onClick={handleSubmit}
                >
                  Davom etish
                </button>
                {isLoading && <div className={styles.loader}></div>}
              </div>

              <div className={`${styles.bonus} ${styles.bonus2}`}>
                <div>
                  <img src={ticket} alt="ticket" />
                  <p>3 kishiga Umra ziyorati</p>
                </div>

                <div>
                  <img src={gift} alt="gift" />
                  <p>
                    Televizor - Muzlatgich Kir mashina - Gaz plita Konditsioner
                    - 3 kishiga
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
