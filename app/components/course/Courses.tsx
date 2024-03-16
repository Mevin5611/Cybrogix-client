import React, { useEffect, useState } from 'react'
import CourseCard from './CourseCard'
import { useGetAllCoursesForUsersQuery } from '@/redux/features/courses/coursesApi'

type Props = {}

const Courses = (props: Props) => {
  const [courseData,setCourseData] = useState()
  const {data} = useGetAllCoursesForUsersQuery({})

  useEffect(() => {
    if(data){
      setCourseData(data?.courses)
    }
  }, [data])
  


  return (
    <div>
        <div className="w-[90%] 800px:w-[80%] m-auto">
            <h1 className='text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl dark:text-white text-black 800px:leading-[60px] font-[700] tracking-tight'>Expand Your Career 
            <span className='text-gradient'> Opportunity</span><br /> Opportunity With Our Courses</h1>
            <br />
            <div className="grid  grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[30px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">

                {
                    courseData&& courseData.map((item:any,index:number)=>(
                      <CourseCard key={index} course={item} />
                    ))
           
                }
            </div>
        </div>
    </div>
  )
}

export default Courses