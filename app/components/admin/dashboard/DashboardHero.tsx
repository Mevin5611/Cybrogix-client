import React, { FC, useState } from 'react'
import DashboardHeader from './DashboardHeader'
import DashboardWidget from '../widgets/DashboardWidget'


type Props = {
  isDashboard:boolean
}

const DashboardHero:FC<Props> = (isDashboard) => {
  
  const [open,setOpen] = useState(false)
  const [value,setValue] = useState(0)

  
  return (
    <div>
        <DashboardHeader/>
        {
          isDashboard && (
            <DashboardWidget open={open} value={value} />
          )
        }
    </div>
  )
}

export default DashboardHero