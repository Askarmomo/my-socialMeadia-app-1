
import PropTypes from 'prop-types'

const PostComment = ({ reply }) => {
  // console.log(reply);

  return (
    <div>
      <div className=" flex items-center lg:space-x-4 py-5">
        <div className=' flex items-center space-x-2 w-full'>
          <div ><img src={reply.userProfilePic} alt="Askar" className=" w-10 h-10 rounded-full object-cover" /> </div>
          <div>
            <div className=' lg:text-[14px] text-sm'>{reply.username}</div>
            <div className=' text-xs lg:text-[14px]'><p> {reply.text}</p></div>
          </div>
        </div>
        <div>
          <h1 className=' text-sm '>12m_ago</h1>
        </div>
      </div>
    </div>
  )
}

export default PostComment

PostComment.propTypes = {
  reply: PropTypes.object
}