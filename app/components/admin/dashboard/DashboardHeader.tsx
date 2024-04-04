
import { useGetAllNotificationQuery, useUpdateNotificationStatusMutation } from "@/redux/features/notification/notificationApi";
import { ThemeSwitcher } from "../../../utils/ThemeSwitcher";
import React, { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import socketIO from 'socket.io-client'
import { format } from "timeago.js";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT,{transports:["websocket"]});

type Props = {

};

const DashboardHeader = (props: Props) => {
  
    const [Open, setOpen] = useState(false);
    const {data,refetch} = useGetAllNotificationQuery(undefined,{refetchOnMountOrArgChange:true})
    const [updateNotificationStatus,{isSuccess}] = useUpdateNotificationStatusMutation()
    const [notification,setNotification] = useState<any>([])
    const [audio, setAudio] = useState<HTMLAudioElement| null>(null);

useEffect(() => {
  // Check if window is defined (i.e., if the code is running in the browser)
  if (typeof window !== 'undefined') {
    // Create the Audio instance
    const audioElement = new Audio("https://res.cloudinary.com/dzrvgsiey/video/upload/v1711179510/audio/ow5no9nx8h6dahwxkl5o.mp3");
    setAudio(audioElement);
  }
}, []);
    const playerNotificationSound = ()=>{
      if(audio){
        audio.play()
      }
    }
    console.log("notification",data);
    
    useEffect(() => {
      if(data){
        setNotification(data?.notifications?.filter((item:any) => item.status === "unread"))
      }
      if(isSuccess){
        refetch()
      } 
      if(audio){
        audio.load()
      }
    }, [data,isSuccess])
    
    useEffect(() => {
      socketId.on("newNotification",(data)=>{
        refetch();
        playerNotificationSound()
      })
    }, [data])

    const handleupdateNotificationStatus = async(id:string)=>{
        await updateNotificationStatus(id)
        
    }
    
  return (
    <div className="min-h-[10vh]">
      <div className="w-full flex items-center justify-end p-6 fixed top-0 right-0 z-10 ">
        <ThemeSwitcher />
        <div
          onClick={() => setOpen(!Open)}
          className="relative cursor-pointer m-2 "
        >
          <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
          <span className="absolute -top-2 -right-2 bg-blue-300 rounded-full w-[20px] text-[12px] flex items-center justify-center text-white">
            {notification && notification.length}
          </span>
        </div>
        {Open && (
          <div className="w-[350px] min-h-[50vh] dark:bg-[#080e24] bg-white shadow-xl absolute top-16  rounded p-5  ">
            <h1 className="text-center text-[20px] font-Poppins text-black dark:text-white">
              Notification
            </h1>

            {
              notification && notification.map((item:any,index:number)=>(
                <>
                <div key={index} className="dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#fffffff4] border-b-[#0000000f] mt-1">
              <div className="w-full flex items-center justify-between p-2">
                <p className="text-black dark:text-white">
                  {item.title}
                </p>

                <p className="text-black dark:text-white cursor-pointer" onClick={()=> handleupdateNotificationStatus(item._id)}>
                  Mark as read
                </p>
              </div>
              <p className="px-2 text-black dark:text-white">
                {item.message}
              </p>
              <p className="px-2 text-black dark:text-white">{format(item.createdAt)}</p>
            </div>
                </>
              ))
            }

            
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
