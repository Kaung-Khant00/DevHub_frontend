const NavBar = ({ setShowSideBar, showSideBar }) => {
  return (
    <div className=" flex justify-between bg-info-content">
      <label className={` z-1 flex p-1 ps-3 w-60 justify-start swap swap-rotate text-white bg-info-content`}>
        {/* this hidden checkbox controls the state */}
        <input type="checkbox" onChange={() => setShowSideBar((pre) => !pre)} checked={!showSideBar} />

        <svg
          className="swap-off fill-current absolute inset-y-0 my-auto"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512">
          <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
        </svg>

        {/* close icon */}
        <svg
          className="swap-on fill-current absolute  inset-y-0 my-auto"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512">
          <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
        </svg>
        <div className="h-[50px] flex items-center justify-center w-full">
          <h1 className="text-2xl font-bold ">Admin</h1>
        </div>
      </label>
      <div className="flex items-center gap-3 text-white">
        <div className="flex flex-col">
          <h2 className="font-bold ">Kaung Khant</h2>
          <div className="text-gray-400 text-sm">test@gmail.com</div>
        </div>
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
