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
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYTRByKUuHX4ZZ6ID0hfS9ujEsUfTY0pGHHQ&s"
            alt="Clothing"
            className="w-32 h-48 sm:w-48 sm:h-64 md:w-64 md:h-80 lg:w-96 lg:h-96 object-cover"
          />
        </div>

        <div className="col-start-1 row-start-2 flex justify-start">
          <img
            src="https://i0.wp.com/optic4.com/wp-content/uploads/2022/11/001.png?fit=588%2C459&ssl=1"
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
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQiboTF_OjzVxPCJnCZBUPG7ECqVN_YNJ9Mw&s"
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
