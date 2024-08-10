import axios from "axios";
import React, { FC, useEffect, useState } from "react";

type Props = {
  videoUrl: string;
  title: string;
  isEdit?: boolean;
};

const CoursePlayer: FC<Props> = ({ videoUrl, title,isEdit }) => {
  const [videodata, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });

  useEffect(() => {
    axios
      .post("https://cybrogix-server.onrender.com/api/lms/getVideoCipherOTP", {
        videoId: videoUrl,
      })
      .then((res) => {
        setVideoData(res.data);
      });
  }, [videoUrl]);
  return (
    <div
    /* style={{ paddingTop: "50%", position: "relative", overflow: "hidden" }} */
    >
      {/* <iframe
        width="100%"
        height={isEdit ? '550' : '500'}
        src={`https://www.youtube.com/embed/${videoUrl}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen={true}
      ></iframe> */}
      {videodata.otp && videodata.playbackInfo !== "" && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videodata.otp}&playbackInfo=${videodata.playbackInfo}&player=L87b6IzuW3z12mbx`}
          style={{
            border: 0,
            height: "100%",
            position: "absolute",
            top: "0",
            left: "0",

            width: "100%",
          }}
          allowFullScreen={true}
          allow="encrypted-media"
        ></iframe>
      )}
    </div>
  );
};

export default CoursePlayer;
