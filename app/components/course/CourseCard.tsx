import Ratings from '@/app/utils/Ratings'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'
import { AiOutlineUnorderedList } from 'react-icons/ai'

type Props = {
    course: any;
    isProfile?:boolean
}

const CourseCard:FC<Props> = ({course,isProfile}) => {
  return (
    <Link href={ !isProfile? `/course/${course._id}` : `/course-access/${course._id}`}>

    <div className=" w-full min-h-[35vh] dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#00000015] dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-sm dark:shadow-inner">
        <Image src={course?.thumbnail?.url } alt='img not found' width={500} height={180} className='rounded w-full' objectFit='contain'/> 
        <br />
        <h1 className='font-Poppins text-[16px] dark:text-white text-black'>
            {course.name} 
        </h1>
        <div className="pt-2 w-full flex items-center justify-between">
                <Ratings rating={course.ratings}/>
                <h5 className={` text-black dark:text-white ${isProfile && 'hidden 800px:inline'}`}>{course.purchased > 1 ? course.purchased +" "+"Students" : course.purchased +" "+ "Student"}</h5>
        </div>

        <div className="pt-2 w-full flex items-center justify-between">
            <div className="flex">
                <h1 className='text-black dark:text-white'>{course.price===0 ?'Free':course.price + '$'}</h1>

                <h1 className='pl-3 text-[14px] mt-[5px] line-through opacity-80  text-black dark:text-white'>
                    {course.estimatedPrice}s
                </h1>
            </div>

            <div className="flex items-center pb-3">
                <AiOutlineUnorderedList size={20} fill='#fff'/>
                <h1 className='pl-2 text-black dark:text-white'>
                    {course?.courseData?.length > 1 ? course?.courseData?.length +" "+ "Lectures" : course?.courseData?.length +" "+ "Lecture" } 
                </h1>
            </div>
        </div>


    </div>
   </Link>
  )
}

export default CourseCard