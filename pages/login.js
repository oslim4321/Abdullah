import Image from "next/image";
import { useState } from "react";
import { Work_Sans } from "next/font/google";
import { useRouter } from "next/router";
import User from "../data/User";
import { useAuth } from "../context/AuthProvider";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import { Spin, message } from "antd";
const font = Work_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isSpinning,setIsSpinning] = useState(false);
  const { user, login } = useAuth();
  const router = useRouter();

  const handleSubmit = (event) => {

    event.preventDefault();
    setIsSpinning(true);
    signInWithEmailAndPassword(auth, formData?.email, formData?.password)
      .then(async (userCredential) => {
        // User logged in successfully
        const user = userCredential.user;
        const token = user.accessToken;


        // Fetch additional user information from the "customers" collection
        const usersCollectionRef = collection(db, "customers");
        const userDocRef = doc(usersCollectionRef, user.uid);

        try {
          const userDocSnapshot = await getDoc(userDocRef);
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            // const loginUser = User.find((user) => user.email === formData.email && user.password === formData.password);
            if (userData && userData.status == "approved") {
              localStorage.setItem("user", userData?.role);
              console.log("User data:", userData);
              localStorage.setItem("token", token);
              localStorage.setItem("id", user?.uid);
              login(userData);
              router.push({
                pathname: "/user",
                query: { role: userData.role },
              });
            } else if (userData && (userData.status === "rejected" || userData.status === "pending")) {
              router.push({ query: { status: userData.status }, pathname: "/status_seller" });
            } else if (userData && userData.role==="buyer") {
              localStorage.setItem("user", userData?.role);
              console.log("User data:", userData);
              localStorage.setItem("token", token);
              localStorage.setItem("id", user?.uid);
              login(userData);
              router.push({
                pathname: "/user",
                query: { role: userData.role },
              });
            }else{

              message.error("Invalid credentials");
            }

            // Now you have access to user information from the "customers" collection
            // You can store it in local state or context for your app
          } else {
            message.error("Invalid credentials");
          }
        } catch (error) {
          console.log("Error fetching user data:", error);
        } finally{
          setIsSpinning(false);
        }

        // router.push('/home');
      })
      .catch((error) => {
        // Handle login errors
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // Handle specific error codes or display a generic error message
      });

      setIsSpinning(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };
  return (
    
      <div className="bg-white w-[100vw] h-[100vh] text-black overflow-hidden">
        <div className="w-full h-full flex">
          <div className="w-full h-full relative overflow-hidden hidden sm:block">
            <Image
              src="/assets/login-img.svg"
              alt="banner-image"
              fill
              priority
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="w-full h-full border flex justify-center items-center">
            <div className="w-full h-full flex flex-col justify-center items-center ">
              <div className="">
                <Image
                  src="/assets/logoFooter.svg"
                  alt="banner-image"
                  width={106}
                  height={106}
                />
              </div>
              <div>
                <h1 className={` ${font.className} font-bold text-2xl`}>
                  Welcome!
                </h1>
              </div>
              <div>
                <h1 className={`${font.className} font-medium text-lg`}>
                  Log in
                </h1>
              </div>
              <div>
                <Spin spinning={isSpinning}>
                <div>
                  <form className="font-inter py-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-3">
                      <div>
                        <label
                          className="text-sm lg:text-medium font-medium"
                          htmlFor="email"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Doejohn78@gmail.com"
                          value={formData.email}
                          className="text-sm lg:text-medium w-full border border-[#A4CCEC] bg-[#F3FAFF] px-4 py-2 rounded focus:border-[#2D80F3] focus:outline-none focus:bg-[#F3FAFF] transition-all hover:border-[#2D80F3]"
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <label
                          className="text-sm lg:text-medium font-medium"
                          htmlFor="createPassword"
                        >
                          Enter Password
                        </label>
                        <input
                          type="password"
                          id="createPassword"
                          placeholder=". . . . ."
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="text-sm lg:text-medium w-full border border-[#A4CCEC] px-4 py-2 rounded focus:border-[#2D80F3] bg-[#F3FAFF] focus:outline-none focus:bg-[#F3FAFF] transition-all hover:border-[#2D80F3]"
                        />
                      </div>
                      <div className="flex items-center justify-between gap-2 my-2">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="rememberMe"
                            name="rememberMe"
                          />
                          <label
                            htmlFor="rememberMe"
                            checked={rememberMe}
                            onChange={handleRememberMeChange}
                            className=" text-xs font-light font-roboto"
                          >
                            Remember me!
                          </label>
                        </div>
                        <a href="#" className="font-light text-xs font-roboto">
                          Forgot password?
                        </a>
                      </div>
                      <div>
                        {error && (
                          <p className="text-red-500 text-xs">{error}</p>
                        )}
                      </div>
                      <button
                        type="submit"
                        className="bg-customYellow text-black py-2 rounded-md text-sm hover:scale-105 ease-in duration-300 transition-all"
                      >
                        Log in
                      </button>
                    </div>
                  </form>
                </div>
                </Spin>
              </div>
            </div>
          </div>
        </div>
      </div>
 
  );
}

export default Login;
