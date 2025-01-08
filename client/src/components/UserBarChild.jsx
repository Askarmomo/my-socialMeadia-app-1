import PropTypes from 'prop-types';
import { useUserStrore } from '../store/useUserStrore';
import { useState } from 'react';

const UserBarChild = ({ userData }) => {
  
  const { user, handleFollowAndUnfollow } = useUserStrore(); // Removed `loading` from here
  const [loadingId, setLoadingId] = useState(null); // Track loading per user

  const handleFollowAndUnfollowFunc = async () => {
    setLoadingId(userData._id); // Set the loading state for the current user
    try {
      await handleFollowAndUnfollow(userData); // Ensure this returns a promise
    } catch (error) {
      console.error('Follow/Unfollow failed:', error);
    } finally {
      setLoadingId(null); // Reset the loading state
    }
  };

  const isLoading = loadingId === userData._id;
  const isFollowing = user.following.includes(userData._id);

  return (
    <div className='flex justify-between space-x-16 border border-slate-600 rounded-xl px-4 py-2'>
      <div className='flex items-center space-x-2'>
        <div className='w-10 h-10'>
          <img
            src={userData.profilePic}
            alt={userData.username}
            className='w-10 h-10 rounded-full object-cover'
          />
        </div>
        <div className='font-semibold text-sm'>{userData.username}</div>
      </div>
      <div>
        <button
          onClick={handleFollowAndUnfollowFunc}
          disabled={isLoading}
          className={`w-24 btn btn-sm text-white ${
            isFollowing ? '' : 'btn-accent'
          }`}
        >
          {isLoading ? (
            <span className='loading loading-spinner'></span>
          ) : isFollowing ? (
            'Unfollow'
          ) : (
            'Follow'
          )}
        </button>
      </div>
    </div>
  );
};

export default UserBarChild;

UserBarChild.propTypes = {
  userData: PropTypes.object.isRequired, // Mark `userData` as required
};
