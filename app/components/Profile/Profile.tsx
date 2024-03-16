"use client";
import React, { FC, useState } from "react";
import SidebarProfile from './SidebarProfile'
import { useLogoutQuery } from "../../../redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import Profileinfo from './Profileinfo'
import ChangePassword from './ChangePassword'


type Props = {
    user:any
};

const Profile: FC<Props> = ({user}) => {
  const [scroll, setScroll] = useState(false);
  const [active,setActive] = useState(1)
  const [avatar,setAvatar] = useState(null)
  const [logout,setLogout] =useState(false)
  const {} = useLogoutQuery(undefined,{skip:!logout ? true : false})

const logoutHandler =async()=>{
await signOut();
setLogout(true);

}

  if (typeof window !== "undefined") {
    window.addEventListener("scroll ", () => {
      if (window.scrollY > 80) {
        setScroll(true);
        console.log(window.scrollY);
      } else {
        setScroll(false);
      }
    });
  }
  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[68px] 800px:w-[318px] h-[450px] dark:bg-slate-900 bg-opacity-90 border dark:border-[#ffffffid] rounded-[5px] shadow-lg mt-[80px] mb-[80px] sticky bg-white    ${
          scroll ? "top-[120px]" : "top-[30px]"
        }left-[30px]`}
      >
        <SidebarProfile
        user={user}
        active={active}
        avatar={avatar}
        setActive={setActive}
        logoutHandler={logoutHandler}
        />
      </div>
      {
          active === 1 && (
            <div className="w-full h-full bg-transparent mt-[80px]">
              <Profileinfo user={user} avatar={avatar}/>
            </div>
          )
        }
      {
          active === 2 && (
            <div className="w-full h-full bg-transparent mt-[80px]">
              <ChangePassword user={user}/>
            </div>
          )
        }
    </div>
  );
};

export default Profile;
