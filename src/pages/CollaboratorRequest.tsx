import { MdOutlineCheckCircle, MdOutlineCancel, MdOutlinePerson } from "react-icons/md"

const CollaboratorRequest = () => {
    return (
        <div className="text-white">
            <div className="bg-zinc-900 text-center py-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="font-bold text-2xl pb-2">You've been invited to collaborate!</h1>
                    <p className="text-gray-200">Listen to the file <span className="text-white font-medium">"MVSSIVE_SBZ_JG_95_guitar_de_cruzero_full_C#m"</span>and review details before accepting or denying the requesr. Your contribution will be officially credited if you you choose to join.</p>
                </div>
            </div>

            {/* There will be Music Player */}

            <div className="max-w-5xl px-8 py-8">
                <h1 className="text-2xl font-bold">File Contributors</h1>
                <p className="text-gray-200">This sections displays all collaborators involved in this file or song, including producers, songwriters, musicians, and other key contributors. Each listed contributor has played a role in shaping the track, ensuring proper credit and trasnparency.</p>
            </div>

            <div className="flex justify-between bg-zinc-900 py-4 px-6 items-center">
                <p className="text-lg"><b>File Name:</b> MVSSIVE_SBZ_JG_95_guitar_de_cruzero_full_C#m</p>
                <div className="flex gap-x-3">
                    <button className="text-gray-300 flex items-center gap-x-2 rounded-full px-4 font-medium border border-gray-300 py-[6px]"><MdOutlineCancel />Deny</button>
                    <button className="bg-[#84ff48] text-black flex items-center gap-x-2 rounded-full px-4 font-medium py-[6px]"><MdOutlineCheckCircle /> Accept</button>
                </div>
            </div>

            {/* Tables */}
            <Table data={musicProducrs} heading="Music Producers"/>
            <Table data={writers} heading="Writers"/>

        </div>
    )
}

const Table = ({ data, heading }) => {
    return (
        <div className="p-8">
            <h1 className="text-gray-200 text-xl font-medium pb-3">{ heading }</h1>
            <table className="w-[98%] mx-[1%]">
                <thead className="text-left text-gray-400">
                    <tr>
                        <th className="ps-4 text-xl"><MdOutlinePerson /></th>
                        <th>User</th>
                        <th>Publishing Split</th>
                        <th>Status</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((producer, index) => (
                        <tr key={index} className="border-0 text-gray-300">
                            <td>
                                <div className="bg-gray-200 w-8 h-8 rounded-full m-2"></div>
                            </td>
                            <td className="font-medium text-white">{producer.name}</td>
                            <td>{producer.split}</td>
                            <td>{producer.status}</td>
                            <td className="flex gap-2">
                                {producer.role.map((r, i) => (
                                    <span key={i} className="bg-zinc-900 rounded-full px-4">{r}</span>
                                ))}
                            </td>
                            <td>
                                <a href="#" className="text-blue-400 underline">{producer.action}</a>
                            </td>
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
        role: ["Songwrileiter", "Music Producer"],
        action: "View Profile"
    },
]

export default CollaboratorRequest