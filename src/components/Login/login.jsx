import { useState, useEffect } from "react";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import OtpInput from "otp-input-react";
import { CgSpinner } from "react-icons/cg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { RecaptchaVerifier } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../../firebaseconfig";
import Image from '../../assets/frontimage.png';
const Login = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [ph, setPh] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  // const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { auth, isLoggedIn, signInUserWithPhoneNumber,handleUser } = useFirebase();

  //Redirecting user to homepage after entering phoneNumber in firestore
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    } else {
      // handleUser(user);
    }
  }, [isLoggedIn]);

  function onCaptchaVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) =>({
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            onSignUp
        }),
          "expired-callback": () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
          },
        }
      );
    }
    //console.log(window.recaptchaVerifier);
  }
  const onSignUp = async () => {
    setLoading(true);
    await onCaptchaVerify();
    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+" + ph;
    await signInUserWithPhoneNumber(formatPh, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP SENT");
      })
      .catch((error) => {
        // Error; SMS not sent
        toast.error("INVALID NUMBER");
        // console.log(error);
        setLoading(false);
      });
  };
  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        console.log(result.user);
        console.log(ph);
        handleUser(result.user);

        // setUser(result.user);
        setLoading(false);
      })
      .catch((error) => {
        toast.error("WRONG VERIFICATION CODE");
        /*Catch */

        //console.log(error);
        setLoading(false);
      });
  }
  //console.log(user);

  return (
    <section
    style={{
      backgroundColor: 'white', // bg-cyan-600
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      overflow: 'hidden',
      height: '90vh',
      '@media(min-width: 768px)': { height: '60vh' }, // md:h-[60vh]
      backgroundImage: `url(${Image})`,
      backgroundSize: '60%',
      backgroundPosition: 'left center',
        backgroundRepeat: 'no-repeat',
        width:'100%'
    }}
  >
      {/* <div>
          <img src={Image} alt="Description" style={{ width: '500px', height: '500px',marginRight:'30px' }} />
        </div> */}
    <div style={{ backgroundColor: '#0e7490' /* bg-cyan-700 */ , marginRight:'250px',zIndex:'100'}}>
      <Toaster toastOptions={{ duration: 4000 }} />
      <div id="recaptcha-container"></div>
      {isLoggedIn ? null : (
        /* <>
  {console.log(user)}
  {navigate("/home")}
  </> */
        <div
          style={{
            width: '20rem', // w-80
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem', // gap-4
            border: '1px solid #22c55e', // border-green-500
            boxShadow: '0 4px 6px -1px rgba(34,197,94,0.4), 0 2px 4px -2px rgba(34,197,94,0.2)',
            padding: '1rem', // p-4
           
          }}
        >
          <h1
            style={{
              textAlign: 'center', // text-center
              lineHeight: '1.5', // leading-normal
              color: 'white', // text-white
              fontWeight: '500', // font-medium
              fontSize: '1.875rem', // text-3xl
              marginBottom: '1.5rem', // mb-6
            }}
          >
            Welcome to{" "}
            <span
              style={{
                fontFamily: 'monospace', // font-mono
                fontSize: '2.25rem', // text-4xl
                padding: '1rem', // p-4
              }}
            >
              MedicalRecord
              <span
                style={{
                  verticalAlign: 'bottom', // align-bottom
                  animation: 'pulse 1s infinite', // animate-pulse
                }}
              >
                !
              </span>
            </span>
          </h1>
          {showOTP ? (
            // OTP VERIFICATION FIELDS
            <>
              <div
                style={{
                  backgroundColor: 'white', // bg-white
                  color: '#22c55e', // text-green-500
                  width: 'fit-content', // w-fit
                  margin: '0 auto', // mx-auto
                  padding: '1rem', // p-4
                  borderRadius: '9999px', // rounded-full
                  boxShadow: '0 10px 15px -3px rgba(34,197,94,0.5), 0 4px 6px -4px rgba(34,197,94,0.4)', // shadow-green-600 shadow-lg
                }}
              >
                <BsFillShieldLockFill size={30} />
              </div>
              <label
                htmlFor="otp"
                style={{
                  color: 'white', // text-white
                  fontWeight: 'bold', // font-bold
                  fontSize: '1.5rem', // text-2xl
                  textAlign: 'center', // text-center
                  fontFamily: 'monospace', // font-mono
                }}
              >
                Enter OTP
              </label>
              <OtpInput
                value={otp}
                onChange={setOtp}
                OTPLength="6"
                otpType="number"
                disabled={false}
                autoFocus
                className="opt-container"
              />
              <button
                onClick={onOTPVerify}
                style={{
                  boxShadow: '0 4px 6px -1px rgba(34,197,94,0.4), 0 2px 4px -2px rgba(34,197,94,0.2)', // shadow-green-600 shadow-sm
                  backgroundColor: '#22c55e', // bg-green-500
                  color: 'white', // text-white
                  fontFamily: 'monospace', // font-mono
                  borderRadius: '0.25rem', // rounded
                  width: '100%', // w-full
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.25rem', // gap-1
                  padding: '0.625rem 0', // py-2.5,
                  border:'2px solid rgba(34,197,94,0.4)'
                }}
              >
                {loading && (
                  <CgSpinner
                    size={20}
                    style={{ marginTop: '0.25rem', animation: 'spin 1s linear infinite' }} // mt-1 animate-spin
                  />
                )}
                <span>Verify OTP</span>
              </button>
            </>
          ) : (
            // PHONE NUMBER FIELDS
            <>
              <div
                style={{
                  backgroundColor: 'white', // bg-white
                  color: '#22c55e', // text-green-500
                  width: 'fit-content', // w-fit
                  margin: '0 auto', // mx-auto
                  padding: '1rem', // p-4
                  borderRadius: '9999px', // rounded-full
                  boxShadow: '0 10px 15px -3px rgba(34,197,94,0.5), 0 4px 6px -4px rgba(34,197,94,0.4)', // shadow-green-600 shadow-lg
                }}
              >
                <BsTelephoneFill size={30} />
              </div>
              <label
                htmlFor="ph"
                style={{
                  color: 'white', // text-white
                  fontWeight: 'bold', // font-bold
                  fontSize: '1.5rem', // text-2xl
                  textAlign: 'center', // text-center
                  fontFamily: 'monospace', // font-mono
                }}
              >
                Verify Phone Number
              </label>
              <PhoneInput country={"in"} value={ph} onChange={setPh} />
              <button
                onClick={onSignUp}
                style={{
                  boxShadow: '0 4px 6px -1px rgba(34,197,94,0.4), 0 2px 4px -2px rgba(34,197,94,0.2)', // shadow-green-600 shadow-sm
                  backgroundColor: '#16a34a', // bg-green-600
                  color: 'white', // text-white
                  fontFamily: 'monospace', // font-mono
                  borderRadius: '0.25rem', // rounded
         
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.25rem', // gap-1
                  padding: '0.625rem 0', // py-2.5,
                  border:'2px solid rgba(34,197,94,0.4)'
                }}
              >
                {loading && (
                  <CgSpinner
                    size={20}
                    style={{ marginTop: '0.25rem', animation: 'spin 1s linear infinite' }} // mt-1 animate-spin
                  />
                )}
                <span>Send code via SMS</span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  </section>
  
  );
};

export default Login;
