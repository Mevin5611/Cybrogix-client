import React, { FC } from "react";
import Image from "next/image";
import avatarDefault from "../../../public/assets/image/avatar.png";
import { RiLockUnlockLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { CiLogout } from "react-icons/ci";
import { GrCertificate } from "react-icons/gr";
import { MdSpaceDashboard } from "react-icons/md";
import Link from "next/link";

type Props = {
  user: any;
  active: number;
  setActive: (active: number) => void;
  avatar: string | null;
  logoutHandler: any;
};

const SidebarProfile: FC<Props> = ({
  user,
  active,
  setActive,
  avatar,
  logoutHandler,
}) => {
  return (
    <div className="w-full ">
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 1
            ? "dark:bg-slate-800 bg-white dark:border-b-0 border-b"
            : "bg-transparent"
        }`}
        onClick={() => setActive(1)}
      >
        <Image
          src={user.avatar || avatar ? user.avatar.url || avatar : avatarDefault}
          width={30}
          height={30}
          alt=""
          className="w-[20px] h-[20px] 800px:w-[30px] 800px:h-[30px] cursor-pointer rounded-full"
        />
        <h5 className="ps-2 dark:text-white text-black font-semibold font-Poppins hidden md:block">
          My Account
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 2
            ? "dark:bg-slate-800 bg-white dark:border-b-0 border-b"
            : "bg-transparent"
        }`}
        onClick={() => setActive(2)}
      >
        <RiLockUnlockLine size={20} className="dark:text-white text-black" />
        <h5 className="pl-2 800px:block hidden dark:text-white text-black font-Poppins">
          Change Password
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 3
            ? "dark:bg-slate-800 bg-white dark:border-b-0 border-b"
            : "bg-transparent"
        }`}
        onClick={() => setActive(3)}
      >
        <SiCoursera size={20} className="dark:text-white text-black" />
        <h5 className="pl-2 800px:block hidden dark:text-white text-black font-Poppins">
          Enrolled Courses
        </h5>
      </div>
      {
        user.role === "admin" && (
          <Link href={"/admin"}
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 5
            ? "dark:bg-slate-800 bg-white dark:border-b-0 border-b"
            : "bg-transparent"
        }`}
        
      >
        <MdSpaceDashboard size={20} className="dark:text-white text-black" />
        <h5 className="pl-2 800px:block hidden dark:text-white text-black font-Poppins">
          Admin Dashboard
        </h5>
      </Link>
        )
      }
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 4
            ? "dark:bg-slate-800 bg-white dark:border-b-0 border-b"
            : "bg-transparent"
        }`}
        onClick={() => setActive(4)}
      >
        <GrCertificate size={20} className="dark:text-white text-black" />
        <h5 className="pl-2 800px:block hidden dark:text-white text-black font-Poppins">
          Certificates
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 5
            ? "dark:bg-slate-800 bg-white dark:border-b-0 border-b"
            : "bg-transparent"
        }`}
        onClick={() => logoutHandler()}
      >
        <CiLogout size={20} className="dark:text-white text-black" />
        <h5 className="pl-2 800px:block hidden dark:text-white text-black font-Poppins">
          Logout
        </h5>
      </div>
    </div>
  );
};

export default SidebarProfile;
