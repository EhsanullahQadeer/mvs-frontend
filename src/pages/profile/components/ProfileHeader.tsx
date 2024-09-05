import profileImage from '../sampleData/Ellipse 730.png'
import { FaEllipsisV, FaEnvelope } from 'react-icons/fa';
import { FiEdit3, FiUserPlus } from "react-icons/fi";
import { MdVerified } from "react-icons/md";


const ProfileHeader = () => {
  return (
    <>
    <header style={{
      background: "linear-gradient(to right,  rgb(74, 12, 140),black  , rgb(0, 91, 190) )"

    }} className="relative flex justify-between items-start  w-full    p-6">
      <div className="flex items-center space-x-4">
      <div className="rounded-full  p-1 bg-gradient-to-r from-blue-500 to-lime-500">
          <img
            src= {profileImage}
            alt="Profile"
            className="h-full w-full rounded-full object-cover border-4 border-gray-900"
          />
        </div>

        
        <div className="text-white w-1/3">
          <h1 className="text-2xl flex items-center font-bold">Becky Hill<MdVerified className="ml-1 text-lime-400"/>

          </h1>
          <p className="text-sm text-gray-200 mt-1">
          Becky Hill is a British singer-songwriter known for her powerful vocals and hit singles like "Wish You Well" and "Better Off Without You." She's a former "The Voice UK" contestant.          </p>

          <div className="flex space-x-3 mt-4">
      {/* Connect Button */}
      <button className="flex text-sm py-2 items-center bg-transparent text-white border  border-white px-2 rounded-lg cursor-pointer transition">
        <FiUserPlus className="mr-1 text-xl"  />
        Connect
      </button>

      {/* Send Message Button */}
      <button className="flex font-medium bg-lime-400 items-center bg-green-500 text-black px-2 py-2 text-sm rounded-lg hover:bg-green-600 transition">
        Send Message
      </button>

      {/* Vertical 3-dot Icon */}
      <button className="bg-black text-coolGray p-2 rounded-lg hover:bg-gray-700 transition">
        <FaEllipsisV />
      </button>
    </div>
        </div>
      </div>
      <button>
      <FiEdit3 className=" text-coolGray text-xl" />
      </button>
    </header>
    </>
  )
}

export default ProfileHeader
