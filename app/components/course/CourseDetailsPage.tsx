import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import React, { FC, useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import Header from "../Header";
import Heading from "@/app/utils/Heading";
import CourseDetails from "./CourseDetails";
import Footer from "../Route/Footer";
import {
  useCreatePaymentMutation,
  useSendStripeKeyQuery,
} from "@/redux/features/payment/paymentApi";
import { loadStripe } from "@stripe/stripe-js";
type Props = {
  id: string;
};

const CourseDetailsPage: FC<Props> = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const [course, setCourse] = useState();
  const { data, isLoading } = useGetCourseDetailsQuery(id);
  const { data: config } = useSendStripeKeyQuery({});
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [createPayment, { data: paymentData }] = useCreatePaymentMutation();
  /* console.log(data); */

  useEffect(() => {
    if (config) {
      const publishablekey = config?.publishablekey;
      setStripePromise(loadStripe(publishablekey));
    }
    if (data) {
      const amount = Math.round(data.course.price * 100);
      createPayment(amount);
      setCourse(data?.course);
    }
  }, [data, config]);

  useEffect(() => {
    if (paymentData) {
      setClientSecret(paymentData?.client_secret);
    }
  }, [paymentData]);

  /* console.log(course); */

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            activeItem={1}
            open={open}
            setOpen={setOpen}
            route={route}
            setRoute={setRoute}
          />

          <div className="w-full grid 800px:grid-cols-10">
            <Heading
              title={course?.courseData[0]?.title}
              description="course access page"
              keyword={course?.courseData[0]?.tags}
            />

            <div className="col-span-10">
              {stripePromise && (
                <CourseDetails
                  data={course}
                  id={id}
                  setRoute={setRoute}
                  stripePromise={stripePromise}
                  clientSecret={clientSecret}
                />
              )}
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default CourseDetailsPage;
