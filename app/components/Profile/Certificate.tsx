import Image from "next/image";
import React, { useState } from "react";
import jsPDF from "jspdf";
import { FaFilePdf } from "react-icons/fa6";

type Props = {
  item: any;
  key: number;
};

const Certificate = ({ item, key }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleDownload = () => {
    const pdf = new jsPDF("landscape");

    // Add the canvas image to the PDF document
    pdf.addImage(item.url, "JPG", 0, 0, 298, 210);

    // Save the PDF file
    pdf.save("certificate.pdf");
  };

  return (
    <div>
      <div className="container mx-auto p-10" key={key}>
        <Image
          onClick={() => setModalOpen(true)}
          src={item?.url}
          width={400}
          height={600}
          alt=""
        />
        <h1 className="text-black dark:text-white font-Poppins text-[16px] pt-3 text-center">
          {item.course} certificate
        </h1>
      </div>
      {modalOpen && (
        <div
          onClick={() => setModalOpen(false)}
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center  bg-[#000] w-full h-full bg-opacity-50"
        >
          <div className="">
            <Image
              src={item?.url}
              width={800}
              height={1200}
              alt=""
              className=""
            />
            <div className="flex justify-end mt-2 ">
              <FaFilePdf
                size={25}
                className="text-black dark:text-white"
                onClick={handleDownload}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificate;
