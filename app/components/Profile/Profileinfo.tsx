import React, { FC, useEffect, useState } from "react";
import { styles } from "../../../app/styles/style";
import avatarDefault from "../../../public/assets/image/avatar.png";
import Image from "next/image";
import { AiOutlineCamera } from "react-icons/ai";
import {
  useUpdateAvatarMutation,
  useUpdateInfoMutation,
} from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import toast from "react-hot-toast";

type Props = {
  user: any;
  avatar: any;
};

const Profileinfo: FC<Props> = ({ user, avatar }) => {
  const [name, setName] = useState(user && user.name);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [loadeuser, setLoadeUser] = useState(false);
  const {} = useLoadUserQuery(undefined, { skip: loadeuser ? false : true });
  const [updateInfo, { isSuccess: success, error: err }] =
    useUpdateInfoMutation();

  const imagehandler = async (e: any) => {
    const filereader = new FileReader();

    filereader.onload = () => {
      if (filereader.readyState === 2) {
        const avatar = filereader.result;
        updateAvatar(avatar);
      }
    };
    filereader.readAsDataURL(e.target.files[0]);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== "") {
      await updateInfo({
        name: name,
      });
    }
    console.log("frmmm");
  };

  useEffect(() => {
    if (isSuccess || success) {
      setLoadeUser(true);
    }
    if (error || err) {
      console.log(error);
    }
    if (success) {
      toast.success("Profile updated successfully!");
    }
  }, [isSuccess, error, err, success]);
  return (
    <div>
      <div className="w-full flex justify-center">
        <div className="relative">
          <Image
            src={
              user.avatar || avatar ? user.avatar.url || avatar : avatarDefault
            }
            height={120}
            width={120}
            alt="img not found"
            className="w-[120px] h-[120px] rounded-full border-[3px] dark:border-[#37a39a] border-slate-300 object-cover"
          />

          <input
            type="file"
            name="avatar"
            id="avatar"
            className="hidden"
            onChange={imagehandler}
            accept="image/png,image/jpg,image/jpeg,image/webp"
          />

          <label htmlFor="avatar">
            <AiOutlineCamera
              size={20}
              className="absolute bottom-3 right-2 cursor-pointer bg-black rounded-full p-[1px]"
            />
          </label>
        </div>
      </div>

      <div className="w-full pl-6 800px:pl-10">
        <form action="" onSubmit={handleSubmit}>
          <div className=" m-auto block pb-4">
            <div className="w-[100%]">
              <label
                htmlFor=""
                className="block pb-2 dark:text-white text-black"
              >
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0 border-slate-300 `}
              />
            </div>
          </div>

          <div className="m-auto block pb-4">
            <div className="w-[100%]">
              <label
                htmlFor=""
                className="block pb-2 dark:text-white text-black"
              >
                Email Address
              </label>
              <input
                type="email"
                readOnly
                required
                value={user?.email}
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0 border-slate-300`}
              />
            </div>
          </div>

          <div className="m-auto block pb-4">
            <div className="w-[100%]">
              <input
                type="submit"
                required
                value="Update"
                className={`w-[95%] 800px:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-white text-black rounded-sm cursor-pointer `}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profileinfo;
