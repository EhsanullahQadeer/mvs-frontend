import Theme from "theme"
import ProfileHeader from "./components/ProfileHeader";
import ScrollableContainer from "components/util/scrollable-container";
import ProfileCards from "./components/ProfileCards";
import { Data } from "./sampleData/sampleData";
import { useState } from "react";
import cardpic from './sampleData/download.webp'


const ArtistProfile = () => {
  const [selectedTab, setSelectedTab] = useState('Instrumentals');

  const tabs = ['Instrumentals', 'Samples', 'Full Songs'];
  return (
    <Theme>
    <ProfileHeader/>
    <section className="ml-5 mt-3">
      <h2 style={
  {
    color:' #D1D1D1'

  }} className="text-white mb-3  ">Credit</h2>
      <ScrollableContainer
        {...{
          showScrollArrows: false,
        }}>
      
              <div className="flex gap-2">
{
  Data.map((value, index) => (
    <ProfileCards
      key={index} 
      imageurl={cardpic} 
      title={value.title}
      singer={value.singer}
      date={value.date}
      p1={value.p1}
      p2={value.p2}
      p3={value.p3}
    />
  ))
}
  </div>


      </ScrollableContainer>

    </section>
<section className="my-4 mx-5">

 <div className=" text-coolGray   flex flex-col">
      <h3 className="text-lg text-lightGray font-bold my-2">Library</h3>
      <div className="flex space-x-4 w-fit border-b border-coolGray ">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`pb-2 text-lg ${
              selectedTab === tab
                ? 'border-b border-white text-white'
                : 'text-gray-400'
            } hover:text-white transition duration-300`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
</section>
    </Theme>
  )
}

export default ArtistProfile
