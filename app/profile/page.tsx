'use client'
import React,{useState,FC } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Protected from "../hooks/useProtected";
import Profile from "../components/Profile/Profile"
import { useSelector } from "react-redux";

type Props = {

};

const Page:FC<Props> = (props) => {
  
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  const {user} = useSelector((state:any)=> state.auth)

  return (
    <>
      <Protected>
      <Heading
        title={`${user.name} Profile`}
        description="Elearning is the new method to study"
        keyword="Programming"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <Profile 
      user={user}
      />
      </Protected>
    </>
  );
};

export default Page;
