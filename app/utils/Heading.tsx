import React, { FC } from "react";

interface headprops {
  title: string;
  description: string;
  keyword: string;
}

const Heading: FC<headprops> = ({ title, description, keyword }) => {
  return (
    <div>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <meta name="keyword" content={keyword} />
    </div>
  );
};

export default Heading;
