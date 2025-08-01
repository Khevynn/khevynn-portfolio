import myPhoto from "../assets/3x4.png";
import SocialIcons from "../components/layouts/SocialIcons";

function MainPanel() {
  return (
    <div
      id="mainPanel"
      className="flex flex-col min-h-154  px-2 sm:px-6 justify-around bg-gray-950 pt-20 md:gap-15 md:min-h-screen xl:px-50 xl:gap-40 md:flex-row"
    >
      <div className="flex items-center justify-center md:order-last">
        <div className="relative h-[300px] w-full max-w-[280px] max-md:top-10 md:h-[360px] md:w-[320px] md:max-w-[320px]">
          {/* Div cinza de fundo, sempre atrás da imagem */}
          <div
            className="absolute z-0 border-8 border-transparent bg-gray-800 top-5 left-0 h-[250px] w-[90%] md:h-[400px] md:w-[300px] max-lg:hidden rounded-lg mx-auto"
            style={{ maxWidth: "100%" }}
          ></div>
          <img
            className="relative z-10 h-[300px] w-full min-w-[150px] max-w-full border-8 border-emerald-500 object-cover lg:h-[400px] lg:w-[300px] rounded-lg"
            src={myPhoto}
            alt="My Photo"
          />
        </div>
      </div>

      <div className="flex flex-col m-auto">
        <div id="texts" className="flex flex-col gap-4 my-20">
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
