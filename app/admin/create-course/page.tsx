'use client'
import React from 'react'
import AdminSidebar from '../../../app/components/admin/sidebar/AdminSidebar'
import DashboardHeader from '../../components/admin/dashboard/DashboardHeader'
import Heading from '../../../app/utils/Heading'
import CreateCourse from '../../components/admin/course/CreateCourse'

type Props = {}

function page({}: Props) {
  return (
    <div>
        <Heading
          title="create-course"
          description="Elearning is the new method to study"
          keyword="Programming"
        />
        <div className="flex ">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar/>
          </div>
          <div className="w-[85%]">
            <DashboardHeader/>
            <CreateCourse/>
          </div>
        </div>
    </div>
  )
}

export default page