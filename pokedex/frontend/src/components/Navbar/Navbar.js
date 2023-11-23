import "./Navbar.css";

const Navbar = () => {
  const iconPath = "./icons/";
  const iconList = [
    {name: "home",    backgroundCSS: "#AAAAAA"},
    {name: "pokedex", backgroundCSS: "#FF0033"},
    {name: "game",    backgroundCSS: "#FF6666"},
    {name: "trading", backgroundCSS: "#FFCC00"},
    {name: "tV",      backgroundCSS: "#00BB00"},
    {name: "trophy",  backgroundCSS: "#0099FF"},
    {name: "news",    backgroundCSS: "#0000FF"}
  ];
  const extension = ".png";
  const imageBeforeTag = " span img:nth-child(1)"; //イメージ変更前DOM指定用
  const imageAfterTag = " span img:nth-child(2)"; //イメージ変更後DOM指定用

  const iconOverHandler = (icon) => {
    const el_li = document.querySelector("#" + icon.name);
    const el_imageB = document.querySelector("#" + icon.name + imageBeforeTag);
    const el_imageA = document.querySelector("#" + icon.name + imageAfterTag);
    el_li.style.color = "white";
    el_li.style.background = icon.backgroundCSS;
    el_imageB.style.opacity = "0%";
    el_imageA.style.opacity = "100%";
  };
  const iconLeaveHandler = (icon) => {
    const el_li = document.querySelector("#" + icon.name);
    const el_imageB = document.querySelector("#" + icon.name + imageBeforeTag);
    const el_imageA = document.querySelector("#" + icon.name + imageAfterTag);
    el_li.style.color = "#464646";
    el_li.style.background = "#fff";
    el_imageB.style.opacity = "100%";
    el_imageA.style.opacity = "0%";
  };

  return (
    <>
      <nav className="main">
        <li className="nav-item none"></li>
        {iconList.map((icon) => (
          <li
            id={icon.name}
            key={icon.name}
            className={"nav-item " + icon.name}
            onMouseEnter={() => iconOverHandler(icon)}
            onMouseLeave={() => iconLeaveHandler(icon)}
          >
            <span className="icon">
              <img
                src={iconPath + icon.name + extension}
                height="30px"
                vspace="2px"
              />
              <img
                src={iconPath + icon.name + "-after" + extension}
                height="30px"
                vspace="2px"
              />
            </span>
            <span className="title">
              {icon.name.charAt(0).toUpperCase() + icon.name.slice(1)}
            </span>
          </li>
        ))}
        <li className="nav-item none"></li>
      </nav>
    </>
  );
};

export default Navbar;
