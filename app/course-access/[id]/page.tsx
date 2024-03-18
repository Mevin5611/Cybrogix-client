'use client'
import Loader from '@/app/components/Loader/Loader'
import { useLoadUserQuery } from '@/redux/features/api/apiSlice'
import { redirect } from 'next/navigation'
import React, { FC, useEffect } from 'react'
import CourseContentMedia from '../../components/course/CourseContentMedia'
type Props = {
    params:any
}

const Page = ({params}: Props) => {
    const id = params.id
    const {isLoading,data,error} = useLoadUserQuery(undefined,{})

    useEffect(() => {
     
        const isPurchased = data?.user?.courses?.find((item:any)=> item._id === id)

        if(!isPurchased){
            redirect("/")
        }

        if(error){
            redirect("/")
        }
     
    }, [data,error])
    
  return (
    <>
    {
        isLoading ? (
            <Loader />
        ): (
            <div>
                <CourseContentMedia id={id} />
            </div>
        )
    }
    </>
  )
}

export default Page