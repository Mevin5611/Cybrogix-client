'use client'
import React, { useState } from 'react'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import Faq from '../components/Route/Faq'
import Footer from '../components/Route/Footer'


type Props = {}

const Page = (props: Props) => {

    const [route, setRoute] = useState('Login')
    const [open, setOpen] = useState(false)
    return (
        <div className='min-h-screen'>
            <Heading
                title='About'
                description='Elearning is programming community'
                keyword='Programming community coding skills expert insights collaborating growth' />
            <Header
                route={route}
                setRoute={setRoute}
                open={open}
                setOpen={setOpen}
                activeItem={4} />

            <div className="w-full mb-8">




                <Faq />






            </div>
            <Footer />
        </div>
    )
}

export default Page