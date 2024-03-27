import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import Image from "next/image";
import React, { useState, FC } from "react";
import { Menu, MenuItem, SubMenu, Sidebar } from "react-pro-sidebar";
import { useSelector } from "react-redux";
import { FaHome } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { MdLiveTv } from "react-icons/md";
import { SiHeroku } from "react-icons/si";
import { FaQuora } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { MdOutlineManageAccounts } from "react-icons/md";
import { SiSimpleanalytics } from "react-icons/si";
import { IoIosAnalytics } from "react-icons/io";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { AiOutlineLogout, AiOutlineSetting } from "react-icons/ai";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useLogoutQuery } from "@/redux/features/auth/authApi";

type Props = {
  select?: number;
  setSelect?: (select: number) => void;
  
};

const AdminSidebar: FC<Props> = ({ select, setSelect }) => {
  const { user } = useSelector((state: any) => state.auth);
  const [Collapse, setCollapse] = useState(false);
  const [logout, setLogout] = useState(false);
  const {} = useLogoutQuery(undefined, { skip: !logout ? true : false });

  const logoutHandler = async () => {
    await signOut();
    setLogout(true);

  }
  return (
    <>
      <Sidebar collapsed={Collapse} backgroundColor="#3d407d" width="230px">
        <div
          className={`${
            Collapse && "w-[100px]"
          }w-[230px] h-screen overflow-y-auto p-5  fixed left-0 bg-[#1b1e64]`}
        >
          <div className="flex justify-between w-full items-center ">
            <h1
              className={`${
                Collapse && "hidden"
              } "font-Poppins font-[600] text-[25px] cursor-pointer "`}
            >
              Cybrogix
            </h1>

            <div onClick={() => setCollapse(!Collapse)}>
              {Collapse ? (
                <IoIosArrowDropright size={25} className="cursor-pointer" />
              ) : (
                <IoIosArrowDropleft size={25} className="cursor-pointer" />
              )}
            </div>
          </div>

          <div
            className={`${
              Collapse && "hidden"
            } mt-5 flex w-full justify-center "`}
          >
            <div>
              <Image
                src={user.avatar.url}
                alt="img not found"
                height={90}
                width={90}
                className=" h-[90px] w-[90px] rounded-full border-[3px]  border-[aqua] cursor-none"
              />

              <h1 className="mt-5 font-Poppins font-[400] text-center">
                {user.name}
              </h1>
            </div>
          </div>

          <div className={`${!Collapse && "pl-8"} mt-5`}>
            <Link
              href={"/admin"}
              onClick={() => setSelect(1)}
              className={`${
                select === 1 && "text-blue-300"
              } flex gap-x-5 items-center  cursor-pointer hover:text-blue-600 duration-200 p-1 rounded-sm`}
            >
              <FaHome size={25} />
              <h1 className={`${Collapse && "hidden"} font-Poppins font-[500]`}>
                Dashboard
              </h1>
            </Link>

            <h1
              className={`${
                Collapse && "hidden"
              } font-Poppins font-[400] my-3 `}
            >
              Data
            </h1>
            <hr className={`${Collapse && "hidden"}`} />
            <br className={`${Collapse && "hidden"}`} />

            <Link href={"admin/users"}>
              <div
                onClick={() => setSelect(2)}
                className={`${
                  select === 2 && "text-blue-300"
                } flex gap-x-5 items-center  cursor-pointer hover:text-blue-600 duration-200 p-1 rounded-sm`}
              >
                <FaUserGroup size={25} />
                <h1
                  className={`${Collapse && "hidden"} font-Poppins font-[500]`}
                >
                  User
                </h1>
              </div>
            </Link>

            <Link
              href={"/admin/invoices"}
              onClick={() => setSelect(3)}
              className={`${
                select === 3 && "text-blue-300"
              } flex gap-x-5 items-center  cursor-pointer hover:text-blue-600 duration-200 p-1 mt-2 rounded-sm`}
            >
              <LiaFileInvoiceSolid size={25} />
              <h1 className={`${Collapse && "hidden"} font-Poppins font-[500]`}>
                Invoices
              </h1>
            </Link>

            <h1
              className={`${Collapse && "hidden"} font-Poppins font-[400] my-3`}
            >
              Content
            </h1>
            <hr className={`${Collapse && "hidden"}`} />
            <br className={`${Collapse && "hidden"}`} />

            <Link
              href={"admin/create-course"}
              onClick={() => setSelect(4)}
              className={`${
                select === 4 && "text-blue-300"
              } flex gap-x-5 items-center  cursor-pointer hover:text-blue-600 duration-200 p-1 rounded-sm`}
            >
              <MdOutlineVideoLibrary size={25} />
              <h1 className={`${Collapse && "hidden"} font-Poppins font-[500]`}>
                Create Course
              </h1>
            </Link>

            <Link href={"admin/courses"}>
              <div
                onClick={() => setSelect(5)}
                className={`${
                  select === 5 && "text-blue-300"
                } flex gap-x-5 items-center  cursor-pointer hover:text-blue-600 duration-200 p-1 mt-2 rounded-sm`}
              >
                <MdLiveTv size={25} />
                <h1
                  className={`${Collapse && "hidden"} font-Poppins font-[500]`}
                >
                  Live Course
                </h1>
              </div>
            </Link>

            <h1
              className={`${Collapse && "hidden"} font-Poppins font-[400] my-3`}
            >
              Customization
            </h1>
            <hr className={`${Collapse && "hidden"}`} />
            <br className={`${Collapse && "hidden"}`} />

            <Link
              href={"/admin/hero"}
              onClick={() => setSelect(6)}
              className={`${
                select === 6 && "text-blue-300"
              } flex gap-x-5 items-center  cursor-pointer hover:text-blue-600 duration-200 p-1 rounded-sm`}
            >
              <SiHeroku size={25} />
              <h1 className={`${Collapse && "hidden"} font-Poppins font-[500]`}>
                Hero
              </h1>
            </Link>

            <Link
              href={"/admin/faq"}
              onClick={() => setSelect(7)}
              className={`${
                select === 7 && "text-blue-300"
              } flex gap-x-5 items-center  cursor-pointer hover:text-blue-600 duration-200 p-1 mt-2 rounded-sm`}
            >
              <FaQuora size={25} />
              <h1 className={`${Collapse && "hidden"} font-Poppins font-[500]`}>
                FAQ
              </h1>
            </Link>

            <Link
              href={"/admin/categories"}
              onClick={() => setSelect(8)}
              className={`${
                select === 8 && "text-blue-300"
              } flex gap-x-5 items-center  cursor-pointer hover:text-blue-600 duration-200 p-1 mt-2 rounded-sm`}
            >
              <BiCategory size={25} />
              <h1 className={`${Collapse && "hidden"} font-Poppins font-[500]`}>
                Categories
              </h1>
            </Link>

            <h1
              className={`${Collapse && "hidden"} font-Poppins font-[400] my-3`}
            >
              Content
            </h1>
            <hr className={`${Collapse && "hidden"}`} />
            <br className={`${Collapse && "hidden"}`} />

            <Link
              href={"/admin/team"}
              onClick={() => setSelect(9)}
              className={`${
                select === 9 && "text-blue-300"
              } flex gap-x-5 items-center  cursor-pointer hover:text-blue-600 duration-200 p-1 rounded-sm`}
            >
              <MdOutlineManageAccounts size={25} />
              <h1 className={`${Collapse && "hidden"} font-Poppins font-[500]`}>
                Manage Teams
              </h1>
            </Link>

            <h1
              className={`${Collapse && "hidden"} font-Poppins font-[400] my-3`}
            >
              Analysis
            </h1>
            <hr className={`${Collapse && "hidden"}`} />
            <br className={`${Collapse && "hidden"}`} />

            <Link
              href={"/admin/course-analytics"}
              onClick={() => setSelect(10)}
              className={`${
                select === 10 && "text-blue-300"
              } flex gap-x-5 items-center  cursor-pointer hover:text-blue-600 duration-200 p-1 rounded-sm`}
            >
              <SiSimpleanalytics size={25} />
              <h1 className={`${Collapse && "hidden"} font-Poppins font-[500]`}>
                Courses Analysis
              </h1>
            </Link>

            <Link
              href={"/admin/order-analytics"}
              onClick={() => setSelect(11)}
              className={`${
                select === 11 && "text-blue-300"
              } flex gap-x-5 items-center  cursor-pointer hover:text-blue-600 duration-200 p-1 mt-2 rounded-sm`}
            >
              <IoIosAnalytics size={25} />
              <h1 className={`${Collapse && "hidden"} font-Poppins font-[500]`}>
                Orders Analysis
              </h1>
            </Link>

            <Link
              href={"/admin/user-analytics"}
              onClick={() => setSelect(12)}
              className={`${
                select === 12 && "text-blue-300"
              } flex gap-x-5 items-center  cursor-pointer hover:text-blue-600 duration-200 p-1 mt-2 rounded-sm`}
            >
              <TbBrandGoogleAnalytics size={25} />
              <h1 className={`${Collapse && "hidden"} font-Poppins font-[500]`}>
                User Analysis
              </h1>
            </Link>

            <h1
              className={`${Collapse && "hidden"} font-Poppins font-[400] my-3`}
            >
              Extras
            </h1>
            <hr className={`${Collapse && "hidden"}`} />
            <br className={`${Collapse && "hidden"}`} />

            {/* <div
              onClick={() => setSelect(13)}
              className={`${
                select === 13 && "text-blue-300"
              } flex gap-x-5 items-center  cursor-pointer hover:text-blue-600 duration-200 p-1 rounded-sm`}
            >
              <AiOutlineSetting size={25} />
              <h1 className={`${Collapse && "hidden"} font-Poppins font-[500]`}>
                Sittings
              </h1>
            </div> */}

            <div
              onClick={() => logoutHandler()}
              className={`${
                select === 14 && "text-blue-300"
              } flex gap-x-5 items-center  cursor-pointer hover:text-blue-600 duration-200 p-1 mt-2 rounded-sm`}
            >
              <AiOutlineLogout size={25} />
              <h1 className={`${Collapse && "hidden"} font-Poppins font-[500]`}>
                Log Out
              </h1>
            </div>
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default AdminSidebar;
