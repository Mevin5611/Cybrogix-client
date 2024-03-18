import { useGetCourseContnetQuery } from '@/redux/features/courses/coursesApi'
import React from 'react'
import Loader from '../Loader/Loader'

type Props = {
    id:string
}

const CourseContentMedia = ({id}: Props) => {
    const {data,isLoading} = useGetCourseContnetQuery(id)
    console.log("content",data);
    
  return (
    <>
    {
        isLoading ? (
            <Loader/>
        ) : (
            <div>
                
            </div>
        )
    }
    </>
  )
}

export default CourseContentMedia