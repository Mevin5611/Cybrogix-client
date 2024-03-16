import { useGetOrderAnalyticsQuery } from "@/redux/features/analytics/analytics";
import React from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Loader from "../../Loader/Loader";

type Props = {
  DashBoard?: boolean;
};
const OrderAnalytics = ({ DashBoard }: Props) => {
  const { data, isLoading, error } = useGetOrderAnalyticsQuery({});
  const analyticsData: any = [
    /* { name: "Page A", uv: 590 },
    { name: "Page B", uv: 868 },
    { name: "Page C", uv: 1397 },
    { name: "Page D", uv: 180 },
    { name: "Page E", uv: 120 },
    { name: "Page F", uv: 100 }, */
  ];

  data &&
    data?.orders?.last12Months?.forEach((item: any, index: number) =>
      analyticsData.push({ name: item.month, uv: item.count })
    );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="min-h-screen">
          <div>
            <h1 className="text-start text-[20px] my-[20px] pb-10 font-Poppins ps-10 dark:text-white text-black">
              Order analytics
            </h1>
            <ResponsiveContainer width="100%" height={DashBoard ? 270 : 400}>
              <ComposedChart
                data={analyticsData}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid stroke="#a6a6a6" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="uv" barSize={20} fill="#009999" />
                <Line type="monotone" dataKey="uv" stroke="#ff471a" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderAnalytics;
