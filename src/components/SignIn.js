import {BsFillShieldLockFill, BsTelephoneFill} from "react-icons/bs";
import OtpInput from "otp-input-react"
import PhoneInput from "react-phone-input-2"
import 'react-phone-input-2/lib/style.css'
import {auth} from "./Firebase.config"
import { useState } from "react";
import {CgSpinner} from "react-icons/cg"
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import toast, { Toaster } from 'react-hot-toast';


const SignIn = () => {

 const [otp,setotp] =useState("");
 const [ph,setph] =useState("");

 const [loading,setloading]=useState(false);
 const [showOTP,setShowOTP]=useState(false);

 const [user,setuser]=useState(null)

 function onCaptchVerify(){
  if(!window.recaptchaVerifier){
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        onSignup()
      },
      'expired-callback': () => {
        // Response expired. Ask user to solve reCAPTCHA again.
        // ...
      }
    },auth);
  }
 }

 function onSignup(){
  setloading(true)
  onCaptchVerify();
  const appVerifier =window.recaptchaVerifier

  const formatph='+'+ph
  signInWithPhoneNumber(auth, formatph, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      setloading(false);
      setShowOTP(true);
      toast.success('otp sended successfully!')
    }).catch((error) => {
      console.log(error)
      setloading(false)
    });
 }


 function onOTPVerify(){
  setloading(true);
  window.confirmationResult.confirm(otp)
  .then(async(res)=>{
    console.log(res)
    setuser(res.user)
    setloading(false)
  })
  .catch((err)=>{
    console.log(err)
    setloading(false)
  })
}


  return (
    <section className="bg-emerald-500 flex items-center justify-center h-screen">
      <div>

        <Toaster toastOptions={{duration:4000}}></Toaster>

        <div id="recaptcha-container">

        </div>


        {
          user ? (<h2 className="text-center text-white font-medium text-2xl">
          👍Login Success
        </h2>
        ):(
        <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
        <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
  welcome to <br></br>code a program
</h1>

{
  showOTP ?
         <>
         <div className="bg-emerald-500  bg-white w-fit mx-auto p-4 rounded-full ">
          <BsFillShieldLockFill size={30}/>

         </div>
         <label htmlFor="otp" className="font-bold text-2xl text-white text-center">
          Enter your OTP 
         </label>
         <OtpInput value={otp} onChange={setotp} OTPLength={6} otpType="number" disabled={false} autoFocus className="otp-container"></OtpInput>
         <button onClick={onOTPVerify} className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded">
          
          {
            loading&& <CgSpinner size={20} className="mt-1 animate-spin"/>

          }
          <span>Verify OTP</span>
         </button>
         
        </>:
         <>
         <div className="bg-emerald-500  bg-white w-fit mx-auto p-4 rounded-full ">
          <BsTelephoneFill size={30}/>

         </div>
         <label htmlFor="" className="font-bold text-xl text-white text-center">
      Verify your phone number
         </label>
         <PhoneInput country={"in"} value={ph} onChange={setph}/>

         <button onClick={onSignup} className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded">
          
          {
            loading&& <CgSpinner size={20} className="mt-1 animate-spin"/>

          }
          <span>Send code via SMS</span>
         </button>
         
         </>
}
         

        </div>
        )
        }
        

      </div>
    </section>
  );
};

export default SignIn;



