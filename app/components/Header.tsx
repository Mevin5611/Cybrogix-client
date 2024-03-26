import Link from "next/link";
import { relative } from "path";
import React, { FC, useEffect, useState } from "react";
import Navitem from "../utils/Navitem";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { HiOutlineUserCircle } from "react-icons/hi";
import CustomModel from "../utils/CustomModel";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";
import Verification from "../components/Auth/Verification";
import { useSelector } from "react-redux";
import Image from "next/image";
import avatar from "../../public/assets/image/avatar.png";
import { useSession } from "next-auth/react";
import {
  useLogoutQuery,
  useSocialAuthMutation,
} from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, setOpen, route, open, setRoute }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, serOpenSidebar] = useState(false);
  const { data:user ,isLoading,refetch} = useLoadUserQuery(undefined,{})
  const { data } = useSession();
  const [logout, setLogout] = useState(false);
  const {} = useLogoutQuery(undefined, { skip: !logout ? true : false });

  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();

  
  
  useEffect(() => {
    if(!isLoading){

      if (!user) {
        if (data) {
          socialAuth({
            email: data.user?.email,
            name: data.user?.name,
            avatar: data.user?.image,
          });
          refetch()
        }
      }
      if (data === null ) {
        if (isSuccess) {
          toast.success("Login Successfully");
        }
      }
      if (data === null && !isLoading && !user) {
        setLogout(true);
      }
    }
  }, [data, user]);
  if (typeof window !== "undefined") {
    window.addEventListener("scroll ", () => {
      if (window.scrollY > 80) {
        setActive(true);
        console.log(window.scrollY);
      } else {
        setActive(false);
      }
    });
  }

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      serOpenSidebar(false);
    }
  };

  return (
    <div className="w-full relative">
      <div
        className={`${
          active
            ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark: to-black fixed top-0 left-0 w-full h-[80px] border-b dark:border-[#ffffff]"
            : "w-full border-b dark: border-[#3b3a3afc] h-[80px] z-[80] dark:shadow"
        }`}
      >
        <div className='"w-[95%] 800px:w-[92%] m-auto py-2 h-full'>
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <Link
              href={"/"}
              className=" text-black dark:text-white font-Poppins font-semibold text-[25px]"
            >
              <span className="font-bold text-[30px]">C</span>ybrogix
            </Link>

            <div className="flex items-center">
              <Navitem activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />
              {/*  only show in mobile screen */}
              <div className="800px:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => serOpenSidebar(true)}
                />
              </div>
              {user ? (
                <>
                  <Link href={"/profile"}>
                    <Image
                      src={user.user?.avatar ? user.user?.avatar.url : avatar}
                      alt=""
                      width={25}
                      height={25}
                      className="w-[25px] h-[25px] rounded-full object-cover"
                    />
                  </Link>
                </>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className="cursor-pointer dark:text-white text-black 800px:block hidden"
                  onClick={() => setOpen(true)}
                />
              )}
            </div>
          </div>
        </div>
        {/* mobile sidebar */}
        {openSidebar && (
          <div
            className=" 800px:hidden fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[70%] fixed z-[99999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
              <Navitem activeItem={activeItem} isMobile={true} />
              <HiOutlineUserCircle
                size={25}
                className="cursor-pointer dark:text-white text-black ml-5 my-2"
                onClick={() => setOpen(true)}
              />
              <br />
              <br />
              <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                Copyright &copy; 2024 Cybrogix
              </p>
            </div>
          </div>
        )}
      </div>
      {route === "Login" && (
        <>
          {open && (
            <CustomModel
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Login}
              refetch={refetch}
            />
          )}
        </>
      )}

      {route === "Signup" && (
        <>
          {open && (
            <CustomModel
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Signup}
            />
          )}
        </>
      )}
      {route === "Verification" && (
        <>
          {open && (
            <CustomModel
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Verification}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
