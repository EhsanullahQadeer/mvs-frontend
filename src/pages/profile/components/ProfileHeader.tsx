import profileImage from '../sampleData/Ellipse 730.png'
import {  FaEnvelope } from 'react-icons/fa';
import { FiEdit3, FiUserPlus } from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import { LiaEllipsisVSolid } from "react-icons/lia";


const ProfileHeader = () => {
  return (
    <>
    <header style={{
      background: "linear-gradient(to right,  rgb(74, 12, 140),black  , rgb(0, 91, 190) )"

    }} className="relative flex justify-between items-start  w-full    px-5 py-7">
      <div className="flex items-center gap-5">
      <div className="rounded-full w-48 h-48  p-1 bg-gradient-to-r from-blue-500 to-lime-500">
          <img
            src= {profileImage}
            alt="Profile"
            className="h-full w-full rounded-full object-cover border-4 border-gray-900"
          />
        </div>

        
        <div className="text-white flex flex-col gap-1 w-1/3">
          <h1 className="text-2xl flex items-center font-bold">Becky Hill<MdVerified className="ml-1 text-lime-400"/>

          </h1>
          <span style={{
            color: "#DADADA"
          }} className='text-xs font-semibold'>@heckyhill</span>
          <p style={{
            color: "#BEBEBE"
          }} className="text-sm text-gray-200  my-2">
          Becky Hill is a British singer-songwriter known for her powerful vocals and hit singles like "Wish You Well" and "Better Off Without You." She's a former "The Voice UK" contestant.          </p>

          <div className="flex space-x-2 ">
      {/* Connect Button */}
      <button style={{
        padding :"12px 16px"
      }} className="flex text-sm py-3 px-4 items-center bg-transparent text-white border  border-white  rounded-lg cursor-pointer transition">
        <FiUserPlus className="mr-2 text-xl"  />
        Connect
      </button>

      {/* Send Message Button */}
      <button style={{
        padding :"12px 16px" ,
        width : "unset",
        background : "#9EFF00"
      }} className="flex w-28 font-medium items-center   bg-green-500 text-black px-3 py-2 text-sm rounded-lg  transition">
        Send Message
      </button>

      {/* Vertical 3-dot Icon */}
      <button style={{
        background:" #1C1C1C",
        border: "1px solid #242424"
      }} className="bg-black text-coolGray p-2 w-10 h-10 rounded-lg hover:bg-gray-700 transition">
        <LiaEllipsisVSolid className='text-xl font-semibold' />
      </button>
    </div>
        </div>
      </div>
      <button>
      <FiEdit3  className=" text-coolGray text-xl" />
      </button>
    </header>
    </>
  )
}

export default ProfileHeader
