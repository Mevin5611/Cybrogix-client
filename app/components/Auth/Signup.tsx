'use client'
import React, { FC, useState,useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../../styles/style";
import { useRegisterMutation } from "@/redux/features/auth/authApi"; 
import toast from "react-hot-toast";

type Props = {
  setRoute: (route: string) => void;
};
const schema = Yup.object().shape({
    name:Yup.string().required("Please enter your name"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email"),
  password: Yup.string().required("Please enter your password").min(6),
});

const Signup: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);
  const [register,{error,isLoading,isSuccess,data}] = useRegisterMutation();

  useEffect(() => {
   if(isSuccess){
    const message = data?.message || "Registeration successfull"
    toast.success(message);
    setRoute("Verification")
   }
   if(error){
    if("data" in error){
        const errorData = error as any;
        toast.error(errorData.data.message)
    }
   
  
   }

  },[isSuccess,error])
  

  const formik = useFormik({
    initialValues: {name:"", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ name,email, password }) => {
      const data = {name,email,password}
      console.log(data);
      await register(data)
      
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Register With Cybrogix</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className={`${styles.label}`}>
          Enter your Name
        </label>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          id="name"
          placeholder="Mevin"
          className={`${errors.name && touched.name && "border-red-500"} ${
            styles.input
          }`}
        />
        {errors.name && touched.name && (
          <span className="text-red-500 pt-2 block">{errors.name}</span>
        )}

        <div className="mt-5">
        <label htmlFor="email" className={`${styles.label}`}>
          Enter your Email
        </label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="sample@gmail.com"
          className={`${errors.email && touched.email && "border-red-500"} ${
            styles.input
          }`}
        />
        {errors.email && touched.email && (
          <span className="text-red-500 pt-2 block">{errors.email}</span>
        )}
        </div>

        <div className="w-full mt-5 relative mb-1">
          <label htmlFor="password" className={`${styles.label}`}>
            Enter your password
          </label>
          <input
            type={show ? "text" : "password"}
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Password!@%"
            id="password"
            className={`${
              errors.password && touched.password && "border-red-500"
            } ${styles.input}`}
          />

          <div className="absolute bottom-3 z-1 cursor-pointer right-2">
          {!show ? (
            <AiOutlineEyeInvisible
            className="dark:text-white text-black"
            size={20}
            onClick={() => setShow(true)}
          />
            
          ) : (
            <AiOutlineEye
              className="dark:text-white text-black"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
          </div>
        </div>
        {errors.password && touched.password && (
          <span className="text-red-500 pt-2 block">{errors.password}</span>
        )}

        <div className="w-full mt-5">
          <input type="submit" value="Sign Up" className={`${styles.button}`} />
        </div>

        <h5 className="text-center  pt-4 font-Poppins text-[14px] text-black dark:text-white">
          Or join with
        </h5>
        <div className="flex items-center justify-center my-3">
          <FcGoogle size={30} className="cursor-pointer ml-2" />
          <AiFillGithub
            size={30}
            className="cursor-pointer ml-2 text-black dark:text-white"
          />
        </div>
        <h5 className="text-center pt-4 font-Poppins text-[14px] dark:text-white text-black">
          Already have any account ?{" "}
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setRoute("Login")}
          >
            Login
          </span>
        </h5>
      </form>
    </div>
  );
};

export default Signup;
