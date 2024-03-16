import { styles } from "@/app/styles/style";
import { useUpdatePasswordMutation } from "@/redux/features/user/userApi";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as y from "yup";
import toast from "react-hot-toast";

type Props = {
  user: any;
};

const ChangePassword: FC<Props> = ({ user }) => {
  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

  const schema = y.object().shape({
    oldPassword: y.string().required("please enter your old password"),
    newPassword: y.string().required("please enter your new password"),
    confirmPassword: y.string().required("please enter your confirm password"),
  });
  const formik = useFormik({
    initialValues: { oldPassword: "", newPassword: "", confirmPassword: "" },
    validationSchema: schema,
    onSubmit: async ({ oldPassword, newPassword, confirmPassword }) => {
      if (newPassword !== confirmPassword) {
        toast.error("New password and confirm password not matched");
      } else {
        updatePassword({ newPassword, oldPassword });
      }
    },
  });
  useEffect(() => {
    if (isSuccess) {
      toast.success("Password update successfully");
    }
    if (error) {
      if ("data" in error) {
        const newE = error as any;
        toast.error(newE.data.message);
      }
    }
  }, [isSuccess, error]);

  const { handleSubmit, errors, touched, values, handleChange } = formik;
  return (
    <div className="w-full pl-7 px-2 800px:px-5">
      <h1 className={`${styles.title}`}>Change Password</h1>
      <div className="w-full">
        <form
          onSubmit={handleSubmit}
          className="w-full flex  flex-col items-center "
        >
          <div className="w-full mt-4 800px:w-[60%]">
            <label className="block pb-2 dark:text-white text-black font-Poppins">
              Enter your old password
            </label>
            <input
              type="text"
              name="oldPassword"
              value={values.oldPassword}
              onChange={handleChange}
              className={`${styles.input}
                 `}
            />

            {errors.oldPassword && touched.oldPassword && (
              <span className="text-red-500 mt-3 ">{errors.oldPassword}</span>
            )}
          </div>

          <div className="w-full mt-4 800px:w-[60%]">
            <label className="block pb-2 dark:text-white text-black font-Poppins">
              Enter your new password
            </label>
            <input
              type="text"
              name="newPassword"
              value={values.newPassword}
              onChange={handleChange}
              className={`${styles.input}
                 `}
            />

            {errors.newPassword && touched.newPassword && (
              <span className="text-red-500 mt-3 ">{errors.newPassword}</span>
            )}
          </div>
          <div className="w-full mt-4 800px:w-[60%]">
            <label className="block pb-2 dark:text-white text-black font-Poppins">
              Enter your confirm password
            </label>
            <input
              type="text"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              className={`${styles.input}
                `}
            />

            {errors.confirmPassword && touched.confirmPassword && (
              <span className="text-red-500 mt-3 ">
                {errors.confirmPassword}
              </span>
            )}
          </div>

          <div className="w-full mt-4 800px:w-[60%] ">
            <input
              type="submit"
              value={"Update Password"}
              className={`w-full h-[40px] border border-[#2acfcf] text-center mx-auto  text-black dark:text-white cursor-pointer`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
