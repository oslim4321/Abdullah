import React, { useState, useEffect } from 'react';
import { Button, message, Spin, Steps, theme } from 'antd';
import SellerRegisterForm from './SellerRegisterForm';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/navigation'
import Category from './Category';
import ProofOfDocument from './ProofOfDocument';
import { auth, db } from "../config/firebase";
import { countries } from '../data/countries'
import { getCategories } from '../lib/sellerCategory';
import { collection, doc, setDoc } from 'firebase/firestore';

const MainDup = () => {

  const [current, setCurrent] = useState(0);
  const [businessProof, setBusinessProof] = useState([]);
  const [activeButton, setActiveButton] = useState("individual");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmPassowrd, setConfirmPassword] = useState("");
  const [emailCode, setEmailCode] = useState(0);
  const [otp,setOtp] = useState(0);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isNotValidCode, setIsNotValidCode] = useState(true);
  const [isNotValidOtp, setIsNotValidOtp] = useState(true);
  const router = useRouter();

  const [cards, setCards] = useState([{
    id: new Date().getTime(),
    selectedCategory: null,
    selectedSubCategories: [],
    subcategoryDetails: {}
  }]);

  const [usedCategories, setUsedCategories] = useState([]);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    const countryCodeData = countries.find(
      (country) => country.name === e.target.value
    );

    if (countryCodeData) {
      setPhoneNumber(countryCodeData.dial_code);
    }
  };

  useEffect(() => {
    getCategories()
      .then((categories) => setCategories(categories))
      .catch((err) => message.error('Something Went Wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const handleSignup = (e) => {

    setIsRegistering(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User signed up successfully
        const user = userCredential.user;
        // Additional user data to be stored in the database
        const userData = {
          firstname: firstName,
          lastname: lastName,
          userName: userName,
          businessProof: businessProof,
          userId: user?.uid,
          email: email,
          phoneNumber: phoneNumber,
          categories: selectedCategories,
          country:selectedCountry,
          role: "seller",
          sellerAs: activeButton,
          status: "pending"
        };
        const usersCollectionRef = collection(db, "customers");
        const userDocRef = doc(usersCollectionRef, user.uid);

        setDoc(userDocRef, userData)
          .then(() => {
            message.success("Registerd successfully!");
            fetch("/api/send-email", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, emailType: "welcomeSeller" })
            }).then(response => response.json())
              .then(() => {
                router.push("/");
              }).catch(() => {
                router.push("/")
              })
          })
          .catch((error) => {
            message.error(error.message);
            setIsNotValidCode(true)
            setEmailCode(null)
          });
      })
      .catch((error) => {
        // Handle signup errors

        message.error(error.message);
        setIsNotValidCode(true)
        setEmailCode(null)

        // Handle specific error codes or display a generic error message
      })
      .finally(() => {
        setIsRegistering(false)
      });
  }

  const steps = [
    {
      title: 'Information',
      content: <SellerRegisterForm otp={otp} setOtp={setOtp} confirmPassowrd={confirmPassowrd} setConfirmPassword={setConfirmPassword} selectedCountry={selectedCountry} handleCountryChange={handleCountryChange} isValidCode={isNotValidCode} isNotValidOtp={isNotValidOtp} setIsNotValidOtp={setIsNotValidOtp} setIsValidCode={setIsNotValidCode} next={next} activeButton={activeButton} setActiveButton={setActiveButton} firstName={firstName} lastName={lastName} userName={userName} email={email} password={password} phoneNumber={phoneNumber} emailCode={emailCode} setFirstName={setFirstName} setLastName={setLastName} setUserName={setUserName} setEmail={setEmail} setPassword={setPassword} setPhoneNumber={setPhoneNumber} setEmailCode={setEmailCode} />
    },
    {
      title: 'Type of Request',
      content: <Category cards={cards} setCards={setCards} usedCategories={usedCategories} setUsedCategories={setUsedCategories} categories={categories} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} isLoading={isLoading} />
    },
    {
      title: 'Proof of Documents',
      content: <ProofOfDocument businessProof={businessProof} setBusinessProof={setBusinessProof} />,
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  function handleNext(arg) {

    if (arg !== "register") {
      if (!firstName || !lastName || !email || !password || !phoneNumber || !userName || !emailCode) { return message.error("Enter All fields") }
      if (password != confirmPassowrd) { return message.error("Password donot match") }
      if (current == 1 && selectedCategories.length == 0) { return message.error("Choose any one category") }
      if (isNotValidCode) { return message.error("Invalid Email Code") }
      next();
    }else{
      // if (current == 2 && businessProof.length == 0) { return message.error("Upload any one buisness proof") }
      handleSignup();
    }

  }
  return (
    <Spin spinning={isRegistering}>
      <div className='p-10'>
        <Steps className='px-32 py-10' current={current} items={items} />
        <div >{steps[current].content}</div>
        <div
          style={{
            marginTop: 24,
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          {(current < steps.length - 1 && steps != 0) && (
            <Button disabled={isNotValidCode} type="text" className='bg-[#F6BE00]' onClick={handleNext}>
              Next
            </Button>
          )}



          {current === steps.length - 1 && (
            <Button type="primary" className="bg-[#f6be00]" onClick={() => handleNext("register")}>
              Register
            </Button>
          )}
          {current > 0 && (
            <Button
              type='text'

              style={{
                margin: '0 8px',
              }}
              onClick={() => prev()}
            >
              Previous
            </Button>
          )}
        </div>
      </div>

    </Spin>
  );
};
export default MainDup;