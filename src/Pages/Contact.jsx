import React from 'react'
import { Footer } from '../Components/Footer';

const Contact = () => {
  return (
    <> 
    <section>
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mt-8 mb-4 text-4xl font-bold text-center text-gray-900 dark:text-white">Contact Us</h2>
        <p className="mb-8 lg:mb-16 text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Let us know.</p>
        <form action="#" className="space-y-8 border-2 p-10 rounded-xl">
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
            <div>
              <label for="fname" className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">First Name</label>
              <input type="text" id="fname" className="shadow-sm bg-gray-50 border border-gray-300 placeholder-gray-50 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-700 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="John" required />
            </div>
            <div>
              <label for="lname" className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Last Name</label>
              <input type="text" id="lname" className="shadow-sm bg-gray-50 border border-gray-300 placeholder-gray-50 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-700 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Cena" required />
            </div>
          </div>
          <div>
            <label for="email" className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Your email</label>
            <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="contact@us.com" required />
          </div>
          <div>
            <label for="subject" className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-300">Subject</label>
            <input type="text" id="subject" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required />
          </div>
          <div className="sm:col-span-2">
            <label for="message" className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-400">Your message</label>
            <textarea id="message" rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-00 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
          </div>
          <button type="submit" className="py-2 px-3 text-center text-white bg-blue-600 rounded-lg bg-primary-700 sm:w-fit hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send message</button>
        </form>
      </div>
    </section>

    <Footer />
    </>
  )
}

export default Contact
