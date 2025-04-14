const HeroSection = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#fdf7ee]">
      <div className="grid grid-cols-3 grid-rows-3 gap-2 w-full max-w-6xl p-4">
        <div className="col-start-3 row-start-1 flex justify-end">
          <div className="text-center flex flex-col items-center justify-center">
            <h2 className="text-xl font-semibold">Clothing Collections 2023</h2>
            <a href="#" className="text-sm text-blue-500 underline mt-1">
              SHOP NOW
            </a>
          </div>
          <img
            src="https://mfashionio.vercel.app/assets/img/hero2/banner-1.jpg"
            alt="Clothing"
            className="w-32 h-48 sm:w-48 sm:h-64 md:w-64 md:h-80 lg:w-96 lg:h-96 object-cover"
          />
        </div>

        <div className="col-start-1 row-start-2 flex justify-start">
          <img
            src="https://mfashionio.vercel.app/assets/img/hero2/banner-2.jpg"
            alt="Sunglasses"
            className="w-32 h-40 sm:w-48 sm:h-64 md:w-64 md:h-80 lg:w-96 lg:h-96 object-cover"
          />
        </div>

        <div className="col-start-2 row-start-2 text-center flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold">Clothing Collections 2023</h2>
          <a href="#" className="text-sm text-blue-500 underline mt-1">
            SHOP NOW
          </a>
        </div>

        <div className="col-start-3 row-start-3 flex justify-end">
          <img
            src="https://mfashionio.vercel.app/assets/img/hero2/banner-3.jpg"
            alt="Shoes"
            className="w-32 h-40 sm:w-48 sm:h-64 md:w-64 md:h-80 lg:w-96 lg:h-96 object-cover"
          />
        </div>

        <div className="col-start-2 row-start-3 text-center flex flex-col items-center justify-center">
          <h2 className="text-lg font-medium">Shoes Spring 2023</h2>
          <a href="#" className="text-sm text-blue-500 underline mt-1">
            SHOP NOW
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
