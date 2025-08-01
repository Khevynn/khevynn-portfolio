import myPhoto from "../assets/3x4.png";
import SocialIcons from "../components/layouts/SocialIcons";

function MainPanel() {
  return (
    <div
      id="mainPanel"
      className="flex flex-col min-h-154 px-10 justify-around bg-gray-950 pt-20 md:gap-15 md:min-h-screen xl:px-50 xl:gap-40 md:flex-row"
    >
      <div className="flex items-center justify-center md:order-last">
        <div className="relative h-[300px] w-[280px] max-md:top-10 md:h-[360px] md:w-[320px]">
          <img
            className="absolute z-10 h-[400px] min-w-[300px] border-8 border-emerald-500 max-lg:left-5 lg:left-0 lg:top-0 lg:h-[400px] lg:w-[300px]"
            src={myPhoto}
            alt="My Photo"
          />
          <div class="absolute h-[400px] w-[300px] border-8 border-transparent bg-g ray-800 max-lg:top-10 lg:top-5 lg:bottom-0 lg:right-0 lg:h-[400px] lg:w-[300px]"></div>
        </div>
      </div>

      <div className="flex flex-col m-auto">
        <div id="texts" className="flex flex-col gap-4 mt-55 mb-20 md:mt-20">
          <h1 className="text-4xl text-center text-gray-200 font-bold text-pretty md:text-start md:text-5xl">
            Hi, I'm Khevynn &#128075;
          </h1>
          <p className="text-lg text-center text-gray-300 md:text-justify">
            I'm a game developer (Unity & Unreal Engine) with a focus on
            crafting immersive, responsive, and visually engaging interactive
            experiences. Whether it's fast-paced gameplay, atmospheric
            environments, or tight gameplay mechanics, I aim to build games that
            not only perform well but also leave an impact.
          </p>
        </div>
        <div
          id="icons"
          className="flex text-gray-300 pb-20 max-md:justify-center "
        >
          <SocialIcons />
        </div>
      </div>
    </div>
  );
}

export default MainPanel;
