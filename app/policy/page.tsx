'use client'
import React, { useState } from 'react'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import Footer from '../components/Route/Footer'


type Props = {}

const Page = (props: Props) => {

    const [route, setRoute] = useState('Login')
    const [open, setOpen] = useState(false)
    return (
        <div className='min-h-screen'>
            <Heading
                title='Policy'
                description='Elearning is programming community'
                keyword='Programming community coding skills expert insights collaborating growth' />
            <Header
                route={route}
                setRoute={setRoute}
                open={open}
                setOpen={setOpen}
                activeItem={3} />

            <div className="w-full mb-8">


                <div className="w-[95%] 800px:w-[90%] p-1 m-auto">
                    <h1 className='font-Poppins  text-[26px] mt-10 text-black dark:text-white text text-center' >Platform Terms and Condition</h1>
                    <p className='font-Poppins text-start text-[20px] mt-10 text-black dark:text-white'>Welcome to Cybrogix, an online learning platform designed to empower individuals through education. These Terms and Conditions govern your access to and use of the Cybrogix platform and services. By accessing or using Cybrogix, you agree to comply with these Terms and Conditions.</p>
                    <ul className='mt-10 ms-5 text-black dark:text-white'>
                        <li className="font-Poppins font-medium text-[18px] mb-3 list-decimal">Acceptance of Terms: By accessing or using Cybrogix, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not access or use Cybrogix.</li>
                        <li className="font-Poppins font-medium text-[18px] mb-3 list-decimal">User Accounts: To access certain features of Cybrogix, you may need to create a user account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate and complete information when creating your account and to promptly update any information that may change.</li>
                        <li className="font-Poppins font-medium text-[18px] mb-3 list-decimal">Use of Content: The content available on Cybrogix, including but not limited to courses, videos, articles, and quizzes, is for educational purposes only. You may not reproduce, distribute, modify, or otherwise use the content for any commercial purpose without prior written permission from Cybrogix.</li>
                        <li className="font-Poppins font-medium text-[18px] mb-3 list-decimal">Code of Conduct: You agree to use Cybrogix in a manner consistent with all applicable laws and regulations. You may not use Cybrogix to engage in any unlawful or harmful activities, including but not limited to harassment, defamation, or unauthorized access to computer systems.</li>
                        <li className="font-Poppins font-medium text-[18px] mb-3 list-decimal">Intellectual Property: All intellectual property rights in Cybrogix, including but not limited to copyrights, trademarks, and trade secrets, are owned by Cybrogix or its licensors. You may not use any of Cybrogix's intellectual property without prior written permission.</li>
                        <li className="font-Poppins font-medium text-[18px] mb-3 list-decimal">Privacy: Cybrogix collects and uses personal information in accordance with its Privacy Policy. By using Cybrogix, you consent to the collection and use of your personal information as described in the Privacy Policy.</li>
                        <li className="font-Poppins font-medium text-[18px] mb-3 list-decimal">Third-Party Links: Cybrogix may contain links to third-party websites or resources. Cybrogix is not responsible for the content or availability of these websites or resources and does not endorse any products or services offered by third parties.</li>
                        <li className="font-Poppins font-medium text-[18px] mb-3 list-decimal">Modifications: Cybrogix reserves the right to modify or update these Terms and Conditions at any time without prior notice. Your continued use of Cybrogix after any such changes constitutes your acceptance of the new Terms and Conditions.</li>
                        <li className="font-Poppins font-medium text-[18px] mb-3 list-decimal">Termination: Cybrogix reserves the right to terminate or suspend your access to Cybrogix at any time for any reason, including but not limited to violation of these Terms and Conditions.</li>
                        <li className="font-Poppins font-medium text-[18px] mb-3 list-decimal">Governing Law: These Terms and Conditions are governed by the laws of [insert jurisdiction]. Any dispute arising out of or relating to these Terms and Conditions shall be subject to the exclusive jurisdiction of the courts of Banglore.</li>
                    </ul>

                    
                    <p className='font-Poppins text-start text-[20px] mt-10 text-black dark:text-white'>By accessing or using Cybrogix, you agree to these Terms and Conditions. If you have any questions or concerns about these Terms and Conditions, please contact us at Cybrogix.support@gmail.com</p>



                </div>




            </div>
            <Footer />
        </div>
    )
}

export default Page