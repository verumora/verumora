import React from 'react';
import { AlertCircle } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 md:py-32 bg-neutral-950 scroll-mt-24 md:scroll-mt-32">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-10 md:mb-20">
          <h2 className="text-4xl md:text-9xl font-black uppercase tracking-tighter mb-3 md:mb-8">
            Let's Talk <br /><span className="text-neutral-700">Business.</span>
          </h2>
          <p className="text-sm md:text-xl text-neutral-400">
            Ready to elevate your brand above the noise?
          </p>
        </div>

        {/* 
          Web3Forms Submission
          Redirects to Web3Forms success page by default.
        */}
        <form 
          action="https://api.web3forms.com/submit" 
          method="POST" 
          className="max-w-2xl mx-auto space-y-8 md:space-y-12"
        >
          {/* Access Key */}
          <input type="hidden" name="access_key" value="8f4b0b2d-4757-4ce1-b2fa-b03edba1f080" />
          
          {/* Optional: Custom Subject */}
          <input type="hidden" name="subject" value="New Project Inquiry from Verumora" />

          {/* Optional: Redirect to your site after success (uncomment if you have a thank you page) 
          <input type="hidden" name="redirect" value="https://yourwebsite.com/thanks" /> 
          */}

          <div className="grid md:grid-cols-2 gap-6 md:gap-12">
            <div className="relative">
              <input
                type="text"
                name="name"
                placeholder=" "
                required
                className="block w-full bg-transparent border-b border-neutral-700 py-3 md:py-4 text-base md:text-xl focus:outline-none focus:border-white transition-colors peer text-white"
              />
              <label className="absolute left-0 top-3 md:top-4 text-neutral-500 text-sm md:text-lg transition-all -translate-y-8 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-8 peer-focus:scale-75 origin-left pointer-events-none uppercase tracking-wider">
                Name
              </label>
            </div>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                placeholder=" "
                required
                className="block w-full bg-transparent border-b border-neutral-700 py-3 md:py-4 text-base md:text-xl focus:outline-none focus:border-white transition-colors peer text-white"
              />
              <label className="absolute left-0 top-3 md:top-4 text-neutral-500 text-sm md:text-lg transition-all -translate-y-8 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-8 peer-focus:scale-75 origin-left pointer-events-none uppercase tracking-wider">
                Phone Number
              </label>
            </div>
          </div>

          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder=" "
              required
              className="block w-full bg-transparent border-b border-neutral-700 py-3 md:py-4 text-base md:text-xl focus:outline-none focus:border-white transition-colors peer text-white"
            />
            <label className="absolute left-0 top-3 md:top-4 text-neutral-500 text-sm md:text-lg transition-all -translate-y-8 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-8 peer-focus:scale-75 origin-left pointer-events-none uppercase tracking-wider">
              Email
            </label>
          </div>

          <div className="relative">
            <textarea
              rows={4}
              name="message"
              placeholder=" "
              required
              className="block w-full bg-transparent border-b border-neutral-700 py-3 md:py-4 text-base md:text-xl focus:outline-none focus:border-white transition-colors peer resize-none text-white"
            ></textarea>
            <label className="absolute left-0 top-3 md:top-4 text-neutral-500 text-sm md:text-lg transition-all -translate-y-8 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-8 peer-focus:scale-75 origin-left pointer-events-none uppercase tracking-wider">
              Project Details
            </label>
          </div>

          <button 
            type="submit" 
            className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 md:py-6 text-base md:text-xl hover:bg-neutral-200 transition-all relative overflow-hidden group flex items-center justify-center"
          >
             <span className="relative z-10">Send Inquiry</span>
             <div className="absolute inset-0 bg-neutral-300 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;




// import React from 'react';
// import { AlertCircle } from 'lucide-react';

// const Contact: React.FC = () => {
//   return (
//     <section id="contact" className="py-24 md:py-32 bg-neutral-950 scroll-mt-24 md:scroll-mt-32">
//       <div className="container mx-auto px-6">
//         <div className="max-w-4xl mx-auto text-center mb-10 md:mb-20">
//           <h2 className="text-4xl md:text-9xl font-black uppercase tracking-tighter mb-3 md:mb-8">
//             Let's Talk <br /><span className="text-neutral-700">Business.</span>
//           </h2>
//           <p className="text-sm md:text-xl text-neutral-400">
//             Ready to elevate your brand above the noise?
//           </p>
//         </div>

//         {/* 
//           Web3Forms Submission
//           Redirects to Web3Forms success page by default.
//         */}
//         <form 
//           action="https://api.web3forms.com/submit" 
//           method="POST" 
//           className="max-w-2xl mx-auto space-y-8 md:space-y-12"
//         >
//           {/* Access Key */}
//           <input type="hidden" name="access_key" value="8f4b0b2d-4757-4ce1-b2fa-b03edba1f080" />
          
//           {/* Optional: Custom Subject */}
//           <input type="hidden" name="subject" value="New Project Inquiry from Verumora" />

//           {/* Optional: Redirect to your site after success (uncomment if you have a thank you page) 
//           <input type="hidden" name="redirect" value="https://yourwebsite.com/thanks" /> 
//           */}

//           <div className="grid md:grid-cols-2 gap-6 md:gap-12">
//             <div className="relative">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder=" "
//                 required
//                 className="block w-full bg-transparent border-b border-neutral-700 py-3 md:py-4 text-base md:text-xl focus:outline-none focus:border-white transition-colors peer text-white"
//               />
//               <label className="absolute left-0 top-3 md:top-4 text-neutral-500 text-sm md:text-lg transition-all -translate-y-8 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-8 peer-focus:scale-75 origin-left pointer-events-none uppercase tracking-wider">
//                 Name
//               </label>
//             </div>
//             <div className="relative">
//               <input
//                 type="email"
//                 name="email"
//                 placeholder=" "
//                 required
//                 className="block w-full bg-transparent border-b border-neutral-700 py-3 md:py-4 text-base md:text-xl focus:outline-none focus:border-white transition-colors peer text-white"
//               />
//               <label className="absolute left-0 top-3 md:top-4 text-neutral-500 text-sm md:text-lg transition-all -translate-y-8 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-8 peer-focus:scale-75 origin-left pointer-events-none uppercase tracking-wider">
//                 Email
//               </label>
//             </div>
//           </div>

//           <div className="relative">
//             <textarea
//               rows={4}
//               name="message"
//               placeholder=" "
//               required
//               className="block w-full bg-transparent border-b border-neutral-700 py-3 md:py-4 text-base md:text-xl focus:outline-none focus:border-white transition-colors peer resize-none text-white"
//             ></textarea>
//             <label className="absolute left-0 top-3 md:top-4 text-neutral-500 text-sm md:text-lg transition-all -translate-y-8 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-8 peer-focus:scale-75 origin-left pointer-events-none uppercase tracking-wider">
//               Project Details
//             </label>
//           </div>

//           <button 
//             type="submit" 
//             className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 md:py-6 text-base md:text-xl hover:bg-neutral-200 transition-all relative overflow-hidden group flex items-center justify-center"
//           >
//              <span className="relative z-10">Send Inquiry</span>
//              <div className="absolute inset-0 bg-neutral-300 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default Contact;
