import { useState } from "react";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { SlLocationPin } from "react-icons/sl";

export default function Sidebar({ remarkHistory, onSelectRemark }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen">
      <span
        className="absolute text-white text-4xl top-5 left-4 cursor-pointer"
        onClick={toggleSidebar}
      >
        <RxHamburgerMenu className="text-gray-900 px-2 rounded-sm " />
      </span>
      <div
        className={`sidebar fixed top-0 bottom-0 p-2 w-[250px] overflow-y-auto text-center bg-blue-100 lg:left-0 ${
          isSidebarOpen ? "block" : "hidden lg:block"
        }`}
      >
        <div className="text-black text-xl">
          <div className="p-2.5 mt-1 flex items-center">
            <h1 className="font-bold text-black text-[15px] ml-12">
              Intandem Maps
            </h1>
            <RxCross2 className="text-white cursor-pointer ml-28 lg:hidden" onClick={toggleSidebar} />
          </div>
          <div className="my-2 bg-gray-600 h-[1px]"></div>
        </div>

        <div className="p-2.5 mt-3 text-black">
        
          <h2 className="font-bold">Remarks History</h2>
          {remarkHistory.map((remark, index) => (
            <div
              key={index}
              className="p-2.5 my-2 flex items-center rounded-md duration-300 cursor-pointer hover:bg-blue-600 text-black"
              onClick={() => onSelectRemark(remark)}
            >
              <SlLocationPin />
              <span className="text-[15px] ml-4">{remark.remark}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
