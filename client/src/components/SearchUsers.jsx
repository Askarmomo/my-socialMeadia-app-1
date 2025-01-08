import { Link } from "react-router-dom";
import { useUserStrore } from "../store/useUserStrore";
import PropTypes from "prop-types"

const SearchUsers = ({ userData }) => {

    const { handleFollowAndUnfollow, user } = useUserStrore()
    const isFollowing = user.following.includes(userData._id);

    return (
        < div key={userData._id} className=" flex items-center justify-between border p-2 rounded-xl border-slate-700 shadow-slate-700 shadow">
            {/* here i wont to change div to link for navigation */}
            <Link to={`/profile/${userData.username}`}>
                <div className=" flex items-center space-x-4 cursor-pointer">
                    <img className=" rounded-full w-12 h-12 object-cover" src={userData.profilePic} alt={userData.username} />
                    <div>
                        <div> <span className=" font-semibold">{userData.username}</span></div>
                        <div> <span className=" text-sm">{userData.bio}</span></div>
                    </div>
                </div>
            </Link>
            <div className="pr-2 text-sm">
                <button className={` ${isFollowing ? 'hover:text-red-500' : 'hover:text-teal-500'}`} onClick={() => handleFollowAndUnfollow(userData)}>{isFollowing ? 'Unfollow' : 'Follow'}</button>
            </div>
        </div >
    )
}

export default SearchUsers


SearchUsers.propTypes = {
    userData: PropTypes.object
}