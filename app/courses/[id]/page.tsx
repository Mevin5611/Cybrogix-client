'use client'

import React, { FC } from 'react'
import CourseDetailsPage from '../../components/course/CourseDetailsPage'

type Props = {
    
}

const page= ({params}:any) => {
    
  return (
    <>
    <CourseDetailsPage id={params.id}/>
    </>
  )
}

export default page