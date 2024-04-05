import React from "react";
import Certificate from "./Certificate";

type Props = {
  user: any;
};

const Certificates = ({ user }: Props) => {
  console.log(user);

  return (
    <div>
      <div className="ps-5">
        <h1 className="font-Poppins text-[30px] font-[600]">{user.name}</h1>

        <h1 className="pt-4 font-Poppins text-[18px]">
          Download your certificate in here
        </h1>

        <div className="grid  col-span-1 md:grid-cols-3 lg:grid-cols-4">
          {user &&
            user.certificates.map((item: any, index: number) => (
              <Certificate key={index} item={item} />
            ))}
          
        </div>
      </div>
    </div>
  );
};

export default Certificates;
