
import PropTypes from 'prop-types'
import { dateFormat } from '../middleware/dateFormat'
import { formatDistanceToNow } from "date-fns"
const PostComment = ({ reply }) => {

  return (
    <div>
      <div className=" flex items-center justify-between py-5">

        <div className=' flex items-center space-x-2 w-full'>
          <div ><img src={reply.userProfilePic} alt="Askar" className=" w-8 h-8 rounded-full object-cover" /> </div>
          <div>
            <div className=' lg:text-[14px] text-sm'>{reply.username}</div>
            <div className=' text-xs lg:text-[14px]'><p> {reply.text}</p></div>
          </div>
        </div>

        <div >
          <div className=' text-xs w-[100px] flex-nowrap text-end'>
            {formatDistanceToNow(reply.createdAt) || '12m_ago'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostComment

PostComment.propTypes = {
  reply: PropTypes.object
}