import Theme from "theme"
import ProfileHeader from "./components/ProfileHeader";
import ScrollableContainer from "components/util/scrollable-container";
import ProfileCards from "./components/ProfileCards";
import { Data } from "./sampleData/sampleData";
import { useState } from "react";


const ArtistProfile = () => {
  const [selectedTab, setSelectedTab] = useState('Instrumentals');

  const tabs = ['Instrumentals', 'Samples', 'Full Songs'];
  return (
    <Theme>
    <ProfileHeader/>
    <section className="ml-2">
      <h2 style={
  {
    color:' #D1D1D1'

  }} className="text-white mx-1 my-2">Credit</h2>
      <ScrollableContainer
        {...{
          showScrollArrows: false,
        }}>
      {
  Data.map((value, index) => (
    <ProfileCards
      key={index} 
      imageurl={value.imageurl} 
      title={value.title}
      singer={value.singer}
      date={value.date}
      p1={value.p1}
      p2={value.p2}
      p3={value.p3}
    />
  ))
}
      </ScrollableContainer>

    </section>
<section className="mx-2">

 <div className="bg-black text-coolGray   p-4">
      <h3 className="text-lg text-lightGray font-bold mb-2">Library</h3>
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
