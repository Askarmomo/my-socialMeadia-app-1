import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime';


export const dateFormat = (date) => {

    dayjs.extend(relativeTime)
    
    const createdAt = dayjs(date)
    return dayjs().to(createdAt)
}

