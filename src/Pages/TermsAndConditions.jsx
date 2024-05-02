import React from 'react'
import { Footer } from '../Components/Footer';

const TermsAndConditions = () => {
  return (
    <> 
    <div className='container mt-5 py-10 mx-auto px-10 md:px-30 lg:px-40 2xl:px-96  text-center'>
        <div className='text-3xl font-bold mt-8'>Terms and Conditions</div> <br />

        <div className='text-xl leading-loose text-justify mt-5'>
            Welcome to <span className="font-bold">Prime<span className="font-bold text-blue-600">Reads</span></span>, your premium destination for insightful and engaging content. Before you embark on your journey through our exclusive articles and expert opinions, please take a moment to review our terms and conditions. <br /> <br />


            <b>1. Account Registration:</b> <br />

            To access PrimeReads and enjoy our premium content, users must register for an account.
            Upon registration, users will receive an initial allocation of 10 tokens, which can be used to unlock premium blogs. <br /> <br />

            <b className=''>2. Token System:</b> <br />
            PrimeReads operates on a token-based system. Each user account is allocated tokens, which serve as a form of currency to unlock premium content.
            Users can earn additional tokens through referrals. For each successful referral, both the referrer and the referred user will receive 10 bonus tokens.
            Tokens are deducted from the user's account each time they unlock a premium blog.
            Blog editors receive tokens equivalent to the number of tokens spent by users to unlock their blogs, thereby incentivizing content creation. <br /> <br />

            <b>3. Content Access:</b> <br />
            Premium content on PrimeReads is accessible only to registered users who possess a sufficient token balance.
            Users can use their tokens to unlock individual blogs or purchase subscription packages for unlimited access to premium content for a specified period. <br /> <br />
            
            <b>4. Refund Policy:</b> <br />
            Tokens allocated to user accounts have no monetary value and cannot be refunded or exchanged for cash.
            In the event of technical issues or errors, PrimeReads reserves the right to refund tokens at its discretion. <br /> <br />

            <b>5. User Conduct:</b> <br />
            Users are responsible for maintaining the security of their accounts and should not share their login credentials with others.
            Any attempt to manipulate or abuse the token system, including fraudulent referrals or unauthorized access, will result in account suspension or termination. <br /> <br />
            
            <b>6. Intellectual Property:</b> <br />
            All content published on PrimeReads, including articles, images, and multimedia, is protected by copyright and other intellectual property laws.
            Users may not reproduce, distribute, or modify content from PrimeReads without explicit permission from the website administrators. <br /> <br />

            <b>7. Privacy Policy:</b> <br />
            PrimeReads values user privacy and complies with data protection regulations. Our privacy policy outlines how we collect, use, and protect user information. <br /> <br />

            <b>8. Modifications to Terms and Conditions:</b> <br />
            PrimeReads reserves the right to update or modify these terms and conditions at any time. Users will be notified of any changes via email or through website notifications.
            By accessing PrimeReads and using our services, you agree to abide by these terms and conditions. If you have any questions or concerns, please contact our support team for assistance. <br /> <br />

            Thank you for choosing <span className="font-bold">Prime<span className="font-bold text-blue-600">Reads</span></span>. Happy reading!
        </div>
    </div>

    <Footer />
    </>
  )
}

export default TermsAndConditions