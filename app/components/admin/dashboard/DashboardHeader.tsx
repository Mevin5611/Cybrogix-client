import { ThemeSwitcher } from "../../../utils/ThemeSwitcher";
import React, { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";

type Props = {

};

const DashboardHeader = (props: Props) => {
    const [Open, setOpen] = useState(false);
  return (
    <div className="min-h-[10vh]">
      <div className="w-full flex items-center justify-end p-6 fixed top-0 right-0 ">
        <ThemeSwitcher />
        <div
          onClick={() => setOpen(!Open)}
          className="relative cursor-pointer m-2 "
        >
          <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
          <span className="absolute -top-2 -right-2 bg-blue-300 rounded-full w-[20px] text-[12px] flex items-center justify-center text-white">
            3
          </span>
        </div>
        {Open && (
          <div className="w-[350px] min-h-[50vh] dark:bg-[#111C43] bg-white shadow-xl absolute top-16 z-10 rounded p-5">
            <h1 className="text-center text-[20px] font-Poppins text-black dark:text-white">
              Notification
            </h1>

            <div className="dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#fffffff4] border-b-[#0000000f] mt-1">
              <div className="w-full flex items-center justify-between p-2">
                <p className="text-black dark:text-white">
                  New Question Receive
                </p>

                <p className="text-black dark:text-white cursor-pointer">
                  Mark as read
                </p>
              </div>
              <p className="px-2 text-black dark:text-white">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Dolorum, asperiores?
              </p>
              <p className="px-2 text-black dark:text-white">5 days ago</p>
            </div>

            <div className="m-1 dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#fffffff4] border-b-[#0000000f]">
              <div className="w-full flex items-center justify-between p-2">
                <p className="text-black dark:text-white">
                  New Question Receive
                </p>

                <p className="text-black dark:text-white cursor-pointer">
                  Mark as read
                </p>
              </div>
              <p className="px-2 text-black dark:text-white">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Dolorum, asperiores?
              </p>
              <p className="px-2 text-black dark:text-white">5 days ago</p>
            </div>

            <div className="dark:bg-[#2d3a4ea1] m-1 bg-[#00000013] font-Poppins border-b dark:border-b-[#fffffff4] border-b-[#0000000f]">
              <div className="w-full flex items-center justify-between p-2">
                <p className="text-black dark:text-white">
                  New Question Receive
                </p>

                <p className="text-black dark:text-white cursor-pointer">
                  Mark as read
                </p>
              </div>
              <p className="px-2 text-black dark:text-white">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Dolorum, asperiores?
              </p>
              <p className="px-2 text-black dark:text-white">5 days ago</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
