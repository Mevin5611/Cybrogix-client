import React from "react";
import Loader from "../../Loader/Loader";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { styles } from "@/app/styles/style";
import { useGetUsersAnalyticsQuery } from "@/redux/features/analytics/analytics";

type Props = {
  DashBoard?: boolean;
};

const UserAnalytics= ({ DashBoard }: Props) => {
  const { data, isLoading, isError } = useGetUsersAnalyticsQuery({});
  console.log(data);

  const analyticsData: any = [
    /* {name:'january 2023', count:452},
     {name:'february 2023', count:42},
     {name:'march 2023', count:425},
     {name:'april 2023', count:2},
     {name:'may 2023', count:35},
     {name:'june 2023', count:278},
     {name:'july 2023', count:22},
     {name:'august 2023', count:27},
     {name:'september 2023', count:278},
     {name:'october 2023', count:256},
     {name:'november 2023', count:242},
     {name:'december 2023', count:278}, */
  ];

  data &&
    data?.users?.last12Months?.forEach((item: any, index: number) =>
      analyticsData.push({ name: item.month, count: item.count })
    );
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`${
            !DashBoard
              ? "mt-[50px]"
              : "mt-[20px] dark:text-white shadow-sm rounded-sm "
          }`}
        >
          <div className={`${DashBoard ? "!ml-3 mb-1" : ""}`}>
            <h1
              className={`${styles.title}  ${
                DashBoard && "!text-[20px] px-5 !text-start"
              }`}
            >
              Users Analytics
            </h1>

            {DashBoard && (
              <p className={`${styles.label} px-5 mb-8`}>
                Last 12 months analytics data
              </p>
            )}
            <div
              className={` w-full ${
                DashBoard ? "h-[20vh] w-full" : "h-screen pb-10"
              } flex items-center justify-center`}
             >
              <ResponsiveContainer
                width={DashBoard ? "100%" : "90%"}
                height={!DashBoard ? "50%" : "100%"}
              >
                <AreaChart
                  data={analyticsData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#4d62d9"
                    fill="#4d62d9"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserAnalytics;
