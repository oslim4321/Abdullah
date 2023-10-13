import { Raleway } from "next/font/google";
import {
  AiOutlineSearch,
} from "react-icons/ai";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthProvider";
import { getCategories } from "../../../lib/sellerCategory";
const { Option } = Select;
import { Spin, message, Select, DatePicker } from "antd";
import { countries } from "../../../data/countries";
import { useRouter } from "next/router";

const font = Raleway({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});


const Sales = ({ enquiryType }) => {
  const router = useRouter();
  const { user, isLoggedIn } = useAuth();

  

  const [country, setCountry] = useState();
  const [date, setDate] = useState();
  const [categories, setCategories] = useState([]);
  const [isSpinning, setIsSpinning] = useState(true);
  const [marineSystem, setMarineSystem] = useState(null);
  const [machinery, setMachinery] = useState(null);
  const [system, setSystem] = useState(null);
  const [component, setComponent] = useState(null);
  const [fifth,setFifth] = useState(null);

  function handleMarineChange(value) {
    setMarineSystem(value);
    setMachinery(null);
    setSystem(null);
    setComponent(null);
    setFifth(null);
  }

  function handleMachineryChange(value) {
    setMachinery(value);
    setSystem(null);
    setComponent(null);
    setFifth(null);
  }

  function handleSystemChange(value) {
    setSystem(value);
    setComponent(null);
    setFifth(null);
  }

  function handleComponentChange(value) {
    setComponent(value)
    setFifth(null);
  }

  function handleFifthCategory(value){
       setFifth(value);
  }

  useEffect(() => {
    getCategories()
      .then((categories) => {
        setCategories(categories);
        setIsSpinning(false);
      })
      .catch(() => message.error("Something Went Wrong"));
  }, []);
  


  const handleSubmit = (event) => {
     event.preventDefault();
     
     if(!marineSystem){return message.error("Select any Marine System")}
     if(!machinery){return message.error("Select any Machinery")}
     if(!system){return message.error("Select any System")}
     if(!date || !country){return message.error("Select Date or country")}

     setIsSpinning(true);
     const timestamp = new Date().getTime();
     const random = Math.random().toString(36).substring(2, 10); // Generate a random string

     localStorage.setItem(timestamp+random,JSON.stringify({
       id:timestamp+random,
       marineSystem,
       machinery,
       system,
       component,
       fifth,
       country,
       date,
       enquiryType
     }))

     router.push(`/enquiries/${timestamp+random}`)


  };

  function handleDateChange(date,dateStr){
    setDate(dateStr);
  }

  return (
    <Spin spinning={isSpinning}>
      <div
        className={`p-4 pb-8 pt-4 bg-transparent  w-full h-full border-t border-slate-600 ${font.className}`}
      >
        <form action="" onSubmit={handleSubmit} className="xs:min-w-[400px]">
          <div className="relative">
            <Select
              size="large"
              value={marineSystem}
              style={{backgroundColor:"none",border:"none"}}
              onChange={handleMarineChange}
              className="w-full h-14 rounded-lg  placeholder-black focus:outline-none "
              showSearch
              placeholder="Select Marine System"
            >
              {
                categories.map((cat, index) => (
                  <Option key={index} value={cat?.name}>{cat?.name}</Option>
                ))
              }
            </Select>
          </div>
          <div className="relative">
        
                <Select
                  size="large"
                  value={machinery}
                  onChange={handleMachineryChange}
                  className="w-full h-14  rounded-lg placeholder-black focus:outline-none "
                  showSearch
                  placeholder="Select Machinery"
                >
                  {categories
                    ?.find((category) => category.name === marineSystem)
                    ?.subcategories?.map((subCategory) => (
                      <Option key={subCategory.name} value={subCategory.name}>
                        {subCategory.name}
                      </Option>
                    ))}
                </Select>
            
          </div>
          <div className="relative">
                <Select
                  size="large"
                  value={system}
                  onChange={handleSystemChange}
                  className="w-full h-14  rounded-lg placeholder-black focus:outline-none "
                  showSearch
                  placeholder="Select System"
                >
                  {categories
                    ?.find((category) => category.name === marineSystem)
                    ?.subcategories?.find((subCategory) => subCategory.name === machinery)
                    ?.subcategories?.map((subCategory2) => ( 
                      <Option key={subCategory2.name} value={subCategory2.name}>
                        {subCategory2.name}
                      </Option>
                    ))}
                </Select>
  
          </div>
          <div className="relative">
            
                <Select
                  size="large"
                  value={component}
                  onChange={handleComponentChange}
                  className="w-full h-14  rounded-lg placeholder-black focus:outline-none "
                  showSearch
                  placeholder="Select Component"
                >
                  {categories
                    ?.find((category) => category.name === marineSystem)
                    ?.subcategories?.find((subCategory) => subCategory.name === machinery)
                    ?.subcategories?.find((subCategory)=> subCategory.name === system )
                    ?.subcategories?.map((subCategory2) => ( 
                      <Option key={subCategory2.name} value={subCategory2.name}>
                        {subCategory2.name}
                      </Option>
                    ))}
                </Select>
        
          </div>
          <div className="relative">
            
                <Select
                  size="large"
                  value={fifth}
                  onChange={handleFifthCategory}
                  className="w-full h-14  rounded-lg placeholder-black focus:outline-none "
                  showSearch
                  placeholder="Select"
                >
                  {categories
                    ?.find((category) => category.name === marineSystem)
                    ?.subcategories?.find((subCategory) => subCategory.name === machinery)
                    ?.subcategories?.find((subCategory)=> subCategory.name === system )
                    ?.subcategories?.find((subCategory)=> subCategory.name === component )
                    ?.subcategories?.map((subCategory2) => ( 
                      <Option key={subCategory2.name} value={subCategory2.name}>
                        {subCategory2.name}
                      </Option>
                    ))}
                </Select>
        
          </div>
          <div className="relative">
            <AiOutlineSearch className="absolute left-2 top-4 text-gray-500" />
            {/* <AiOutlineEnvironment className="absolute right-2 top-3 text-gray-500" /> */}
            <select
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full h-12 pl-8 pr-10 mb-4 rounded-lg placeholder-black focus:outline-none "
              required
            >
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country.name} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div className="relative ">
            <DatePicker  placeholder="ETA (Delivery Date)" onChange={handleDateChange} size="large" className="w-full h-12 px-2 pl-5 mb-4 rounded-lg placeholder-black focus:outline-none"/>
          </div>

          

          <button
            disabled={!isLoggedIn}
            type="submit"
            className="bg-transparent border-2 border-white rounded-lg text-white w-full h-14"
          >
            {!isLoggedIn ? "Login To Submit Enquiry" : "Submit"}
          </button>
          
        </form>
      </div>
    </Spin>
  );
};

export default Sales;
