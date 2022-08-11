import "./App.css";
import Todos from "./Todos/Todos";
import moon from './images/icon-moon.svg'
import sun from './images/icon-sun.svg'
import lightMobile from './images/bg-mobile-light.jpg'
import darkMobile from './images/bg-mobile-dark.jpg'
import lightDesktop from './images/bg-desktop-light.jpg'
import darkDesktop from './images/bg-desktop-dark.jpg'
import { projectFirestore } from "./firebase/config";
import { useState, useEffect } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [themeSrc, setThemeSrc] = useState(moon);
  const [theme, setTheme] = useState("light");

  const handleSubmit = (event) => {
    if (
      (event.key === "Enter" && event.target.value !== "") ||
      (event.type === "click" && inputValue !== "")
    ) {
      projectFirestore
        .collection("todos")
        .add({ todo: inputValue, done: false });
      setInputValue("");
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleChangeTheme = () => {
    if (theme === "light") {
      setThemeSrc(sun);
      setTheme("dark");
    } else {
      setThemeSrc(moon);
      setTheme("light");
    }
  };

  const [bg, setBg] = useState("");
  const [bgSize, setBgSize] = useState("100vw 230px");
  const [widthGenCont, setwidthGenCont] = useState("");
  const [themeMargin, setThemeMargin] = useState("");
  const desktopWidth = 650;
  const desktopWidthMd = 900;

  useEffect(() => {
    const setBgResponsive = () => {
      if (theme === "light" && window.innerWidth < 650) {
        setBg(`url(${lightMobile})`);
      } else if (theme === "dark" && window.innerWidth < 650) {
        setBg(`url(${darkMobile})`);
      } else if (
        theme === "light" &&
        window.innerWidth > desktopWidth &&
        window.innerWidth < desktopWidthMd
      ) {
        setBgSize("100vw 300px");
        setThemeMargin("20vw");
        setwidthGenCont("60vw");
        setBg(`url(${lightDesktop})`);
      } else if (
        theme === "dark" &&
        window.innerWidth > desktopWidth &&
        window.innerWidth < desktopWidthMd
      ) {
        setBgSize("100vw 300px");
        setThemeMargin("20vw");
        setwidthGenCont("60vw");
        setBg(`url(${darkDesktop})`);
      } else if (
        theme === "light" &&
        window.innerWidth > desktopWidthMd &&
        window.innerWidth < 1300
      ) {
        setBgSize("100vw 300px");
        setThemeMargin("20vw");
        setwidthGenCont("50vw");
        setBg(`url(${lightDesktop})`);
      } else if (
        theme === "dark" &&
        window.innerWidth > desktopWidthMd &&
        window.innerWidth < 1300
      ) {
        setBgSize("100vw 300px");
        setThemeMargin("20vw");
        setwidthGenCont("50vw");
        setBg(`url(${darkDesktop})`);
      } else if (theme === "light" && window.innerWidth > 1300) {
        setBgSize("100vw 300px");
        setThemeMargin("20vw");
        setwidthGenCont("35vw");
        setBg(`url(${lightDesktop})`);
      } else if (theme === "dark" && window.innerWidth > 1300) {
        setBgSize("100vw 300px");
        setThemeMargin("20vw");
        setwidthGenCont("35vw");
        setBg(`url(${darkDesktop})`);
      } else if (theme === "light") {
        setBgSize("100vw 300px");
        setBg(`url(${lightDesktop})`);
      } else {
        setBgSize("100vw 300px");
        setBg(`url(${darkDesktop})`);
      }
    };
    setBgResponsive();

    window.addEventListener("resize", () => {
      setBgResponsive();
      console.log(bg);
    });
    return () => {
      window.removeEventListener("resize", setBgResponsive);
    };
  }, [setBg, theme, bg]);

  return (
    <div
      className="App m-0"
      style={
        theme === "light" && window.innerWidth < 800
          ? { backgroundImage: bg, backgroundSize: bgSize }
          : theme === "dark" && window.innerWidth < 800
          ? {
              backgroundImage: bg,
              backgroundColor: "hsl(235, 21%, 11%)",
              backgroundSize: bgSize,
            }
          : theme === "light"
          ? { backgroundImage: bg, backgroundSize: bgSize }
          : {
              backgroundImage: bg,
              backgroundColor: "hsl(235, 21%, 11%)",
              backgroundSize: bgSize,
            }
      }
    >
      <div
        className="generalContainer"
        style={window.innerWidth > desktopWidth ? { width: widthGenCont } : {}}
      >
        <div className="title fw-bold text-white display-3">T‏ O‎ D‏ O</div>
        <img
          src={themeSrc}
          alt="theme"
          className="theme"
          onClick={handleChangeTheme}
          style={
            window.innerWidth > desktopWidth ? { marginLeft: themeMargin } : {}
          }
        />
      </div>
      <div className="Cont container">
        <div
          className="generalContainer input"
          style={
            theme === "dark" && window.innerWidth > desktopWidth
              ? {
                  border: "solid hsl(235, 24%, 19%)",
                  width: widthGenCont,
                }
              : theme === "light" && window.innerWidth > desktopWidth
              ? { width: widthGenCont }
              : theme === "dark"
              ? { border: "solid hsl(235, 24%, 19%)" }
              : {}
          }
        >
          <div
            className="add"
            style={
              theme === "dark"
                ? {
                    backgroundColor: "hsl(235, 24%, 19%)",
                    color: "hsl(234, 39%, 85%)",
                  }
                : {}
            }
          >
            <div
              className="circleActivate"
              onClick={handleSubmit}
              style={
                theme === "dark"
                  ? {
                      border: "1.5px solid hsl(233, 14%, 35%)",
                    }
                  : {}
              }
            ></div>
          </div>
          <input
            style={
              theme === "dark"
                ? {
                    backgroundColor: "hsl(235, 24%, 19%)",
                    color: "hsl(234, 39%, 85%) !important",
                  }
                : {}
            }
            type="text"
            value={inputValue}
            onChange={handleChange}
            className="addTodo"
            placeholder="Create a new todo..."
            onKeyDown={handleSubmit}
          />
        </div>
        <Todos
          theme={theme}
          desktopWidth={desktopWidth}
          widthGenCont={widthGenCont}
        />
      </div>
    </div>
  );
}

export default App;
