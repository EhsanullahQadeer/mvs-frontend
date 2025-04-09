import { MdOutlineCheckCircle, MdOutlineCancel, MdOutlinePerson } from "react-icons/md"
import { FaChevronRight } from "react-icons/fa"

const CollaboratorRequest = () => {
    return (
        <div className="text-white">
            <div className="max-md:px-4 bg-zinc-900 text-center py-6">
                <div className="md:max-w-4xl mx-auto">
                    <h1 className="font-bold text-xl md:text-2xl pb-2">You've been invited to collaborate!</h1>
                    <p className="text-gray-200 max-md:text-sm">Listen to the file <span className="text-white font-medium">"MVSSIVE_SBZ_JG_95_guitar_de_cruzero_full_C#m"</span>and review details before accepting or denying the requesr. Your contribution will be officially credited if you you choose to join.</p>
                </div>
            </div>

            {/* There will be Music Player */}

            <div className="md:max-w-5xl px-4 md:px-8 py-8">
                <h1 className="text-xl md:text-2xl font-bold pb-2">File Contributors</h1>
                <p className="text-gray-200 max-md:text-sm">This sections displays all collaborators involved in this file or song, including producers, songwriters, musicians, and other key contributors. Each listed contributor has played a role in shaping the track, ensuring proper credit and trasnparency.</p>
            </div>

            <div className="flex flex-wrap justify-between bg-zinc-900 py-4 px-4 md:px-6 items-center gap-y-2">
                <p className="text-sm md:text-lg"><b className="max-md:text-sm">File Name:</b> MVSSIVE_SBZ_JG_95_guitar_de_cruzero_full_C#m</p>
                <div className="flex gap-x-3">
                    <button className="text-gray-300 flex items-center gap-x-2 rounded-full px-2 md:px-4 font-medium border border-gray-300 py-[2px] md:py-[6px]"><MdOutlineCancel className="text-lg" />Deny</button>
                    <button className="bg-[#84ff48] text-black flex items-center gap-x-2 rounded-full px-2 md:px-4 font-medium md:py-[6px]"><MdOutlineCheckCircle className="text-lg" /> Accept</button>
                </div>
            </div>

            {/* Tables */}
            <Table data={musicProducrs} heading="Music Producers"/>
            <Table data={writers} heading="Composers/Writers"/>

        </div>
    )
}

const Table = ({ data, heading }) => {
    return (
        <div className="md:px-8 py-8 px-4">
            <h1 className="text-gray-200 text-xl font-medium pb-3">{ heading }</h1>
            <table className="w-full md:w-[98%] md:mx-[1%] max-md:text-sm">
                <thead className="text-left text-white">
                    <tr>
                        <th className="ps-4 text-xl"><MdOutlinePerson /></th>
                        <th>User</th>
                        <th>Publishing Split</th>
                        <th className="max-md:hidden">Status</th>
                        <th className="max-md:hidden">Role</th>
                        <th>Action</th>
                        <th className="md:hidden"></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((producer, index) => (
                        <tr key={index} className="border-none text-gray-300">
                            <td>
                                <div className="bg-gray-200 w-8 h-8 rounded-full m-2"></div>
                            </td>
                            <td className="font-medium text-white">{producer.name}</td>
                            <td>{producer.split}</td>
                            <td className="max-md:hidden">{producer.status}</td>
                            <td className="max-w-[200px] text-sm max-md:hidden">
                                {producer.role.map((r, i) => (
                                    <span key={i} className="bg-zinc-900 rounded-full px-4 mx-1 py-1">{r}</span>
                                ))}
                            </td>
                            <td>
                                <a href="#" className="underline">{producer.action}</a>
                            </td>
                            <td className="md:hidden"><FaChevronRight /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const musicProducrs = [
    {
        name: "SoundBoyz",
        split: "25%",
        status: "Accepted",
        role: ["Songwriter", "Music Producer"],
        action: "View Profile"
    },
    {
        name: "SoundBoyz",
        split: "25%",
        status: "Accepted",
        role: ["Songwriter", "Music Producer"],
        action: "View  Profile"
    },
    {
        name: "SoundBoyz",
        split: "25%",
        status: "Pending",
        role: ["Songwriter", "Music Producer"],
        action: "View  Profile"
    },
]
const writers = [
    {
        name: "SoundBoyz",
        split: "25%",
        status: "Accepted",
        role: ["Songwriter", "Music Producer"],
        action: "View Profile"
    },
    {
        name: "SoundBoyz",
        split: "25%",
        status: "Accepted",
        role: ["Songwriter", "Music Producer"],
        action: "View Profile"
    },
    {
        name: "SoundBoyz",
        split: "25%",
        status: "Pending",
        role: ["Songwriter", "Music Producer"],
        action: "View Profile"
    },
]

export default CollaboratorRequest