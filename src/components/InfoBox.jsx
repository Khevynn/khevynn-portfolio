function InfoBox({ title, provider, location, description, image }) {
  return (
    <div className="flex flex-col items-center gap-10 mx-5 p-10 shadow-2xl/30 shadow-pro rounded-4xl bg-gray-700 lg:mx-0 lg:w-175 xl:w-200 lg:h-175">
      <div>
        {(() => {
          if (image != null) {
            return (
              <img
                className="rounded-2xl md:min-w-[350px] md:min-h-[250px] md:left-0 md:top-0"
                src={image}
                alt="Career Image"
              />
            );
          }
        })()}
      </div>

      <div>
        <h1 className="text-xl text-gray-100 font-bold text-balance">
          {title}
        </h1>
        <h2 className="text-lg text-gray-200 md:text-justify">{provider}</h2>
        <h3 className="text-base text-gray-400 md:text-justify">{location}</h3>
        <p className="text-lg text-gray-300 text-justify">{description}</p>
      </div>
    </div>
  );
}

export default InfoBox;
