"use client";
import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Route/Footer";
import { AiOutlineSend } from "react-icons/ai";

type Props = {};

const Page = (props: Props) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen">
      <Heading
        title="About"
        description="Elearning is programming community"
        keyword="Programming community coding skills expert insights collaborating growth"
      />
      <Header
        route={route}
        setRoute={setRoute}
        open={open}
        setOpen={setOpen}
        activeItem={2}
      />

      <div className="w-full mb-8 mt-5">
        <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl dark:text-white text-black 800px:leading-[60px] font-[700] tracking-tight">
          About{" "}
          <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-sky-400 bg-clip-text text-transparent font-[800]">
            {" "}
            Cybrogix
          </span>
        </h1>

        <div className="w-[95%] 800px:w-[90%] p-1 m-auto">
          <p className="font-Poppins text-start text-[20px] mt-10 text-black dark:text-white">
            Welcome to Cybrogix, your premier destination for innovative and
            effective learning management solutions. At Cybrogix, we're
            passionate about revolutionizing the way education is delivered and
            received in the digital age. Our platform is designed to empower
            learners, educators, and administrators alike, providing a dynamic
            and user-friendly environment for teaching, learning, and
            collaboration.
          </p>
          <br />
          <h2 className="font-Poppins text-[25px] font-[600] text-center text-black dark:text-white">
            Our Mission
          </h2>
          <p className="font-Poppins text-start text-[20px] mt-4 text-black dark:text-white">
            Our mission at Cybrogix is to democratize education by making
            high-quality learning resources accessible to everyone, regardless
            of geographical location, socioeconomic status, or educational
            background. We believe that education is the key to unlocking human
            potential and driving positive change in the world.
          </p>
          <br />
          <h2 className="font-Poppins text-[25px] font-[600] text-center text-black dark:text-white">
            What We Offer
          </h2>
          <p className="font-Poppins text-start text-[20px] mt-4 text-black dark:text-white">
            Cybrogix offers a comprehensive suite of features and tools tailored
            to meet the diverse needs of modern learners and educators. Whether
            you're a student, teacher, or administrator, you'll find everything
            you need to succeed on our platform:
          </p>
          <ul className="mt-5 ms-10 text-black dark:text-white">
            <li className="font-Poppins font-medium text-[18px] mb-3 ">
              <span className="!font-bold !text-[18px] ">
                {" "}
                Interactive Courses{" "}
              </span>
              :
              <p className="text-black dark:text-gray-300">
                {" "}
                Engaging multimedia courses covering a wide range of subjects,
                from academic disciplines to professional skills development.
              </p>
            </li>
            <li className="font-Poppins font-medium text-[18px] mb-3 ">
              <span className="!font-bold !text-[18px] ">
                {" "}
                Collaborative Learning{" "}
              </span>
              :
              <p className="text-black dark:text-gray-300">
                Robust collaboration tools, including discussion forums, group
                projects, and live chat, fostering a sense of community and
                peer-to-peer learning.
              </p>
            </li>
            <li className="font-Poppins font-medium text-[18px] mb-3 ">
              <span className="!font-bold !text-[18px] ">
                {" "}
                Personalized Learning Paths{" "}
              </span>
              :
              <p className="text-black dark:text-gray-300">
                Adaptive learning algorithms that tailor content to each
                learner's unique needs, preferences, and learning style.
              </p>
            </li>
            <li className=" mb-3  font-Poppins font-medium text-[18px]">
              <span className="!font-bold !text-[18px] ">
                {" "}
                Assessment and Feedback{" "}
              </span>
              :
              <p className="text-black dark:text-gray-300">
                Comprehensive assessment tools, including quizzes, exams, and
                peer reviews, with detailed feedback to track progress and
                identify areas for improvement.
              </p>
            </li>
            <li className="font-Poppins font-medium text-[18px] mb-3 ">
              <span className="!font-bold !text-[18px] ">
                {" "}
                Analytics and Reportingy{" "}
              </span>
              :
              <p className="text-black dark:text-gray-300">
                Powerful analytics dashboards for administrators to track
                learner engagement, performance metrics, and course
                effectiveness.
              </p>
            </li>
            <li className="font-Poppins font-medium text-[18px] mb-3  ">
              <span className="!font-bold !text-[18px] ">
                {" "}
                Mobile Accessibility{" "}
              </span>
              :
              <p className="text-black dark:text-gray-300">
                Seamless access from any device, allowing learners to study
                anytime, anywhere, with offline capabilities for uninterrupted
                learning experiences.
              </p>
            </li>
          </ul>
          <br />
          <h2 className="font-Poppins text-[25px] font-[600] text-center text-black dark:text-white">
            Why Choose Cybrogix
          </h2>
          <ul className="ms-10 text-black dark:text-white">
            <li className="font-Poppins font-medium text-[18px] mb-3  ">
              <span className="!font-bold !text-[18px] "> Innovation </span>:
              <p className="text-black dark:text-gray-300">
                We're constantly pushing the boundaries of educational
                technology, leveraging the latest advancements in AI, machine
                learning, and data analytics to enhance the learning experience.
              </p>
            </li>
            <li className="font-Poppins font-medium text-[18px] mb-3  ">
              <span className="!font-bold !text-[18px] "> Flexibility </span>:
              <p className="text-black dark:text-gray-300">
                {" "}
                Our platform is highly customizable, allowing institutions to
                tailor the learning environment to their specific needs and
                branding requirements.
              </p>
            </li>
            <li className="font-Poppins font-medium text-[18px] mb-3  ">
              <span className="!font-bold !text-[18px] "> Support </span>:
              <p className="text-black dark:text-gray-300">
                {" "}
                Our dedicated support team is available 24/7 to assist users
                with any questions or technical issues, ensuring a smooth and
                hassle-free experience for all.
              </p>
            </li>
            <li className="font-Poppins font-medium text-[18px] mb-3  ">
              <span className="!font-bold !text-[18px] "> Community </span>:
              <p className="text-black dark:text-gray-300">
                Join a vibrant community of learners and educators from around
                the globe, sharing knowledge, insights, and best practices to
                inspire and empower one another.
              </p>
            </li>
          </ul>
          <br />
          <h2 className="font-Poppins text-[25px] font-[600] text-center text-black dark:text-white">
            Get Started Today
          </h2>
          <p className="font-Poppins text-start text-[20px] mt-4 text-black dark:text-white">
            Ready to experience the future of learning with Cybrogix? Sign up
            for a free trial today and join thousands of learners and educators
            who are already transforming education with us. Together, let's
            unlock the full potential of every learner and build a brighter
            future for generations to come.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
