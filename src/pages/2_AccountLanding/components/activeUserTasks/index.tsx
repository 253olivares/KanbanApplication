import { memo } from "react";
import { task } from "../../../../reduxStore/tasks/tasksSlice"
import Tasks from "./tasks/Tasks";
import scrollbarImage from '/assets/scrollBarTrack.png';
import { AnimatePresence } from "framer-motion";

const index = memo((
  {
    getUserTasks
  } : {
    getUserTasks:task[]
  }
) => {

  return (
    <div
    style={{
      // @ts-ignore
        "--img": `url(${scrollbarImage})`
    }} 
    className="
    
      boardsScroll

      w-full

      relative
      z-[5]

      sLaptop:w-[33.333rem]
      mLaptop:w-[41.666rem]
      desktop:w-[50rem]
      largeDesktop:w-[62.5rem]

      grid
      grid-cols-1
      auto-rows-auto

      gap-y-[1.084rem]
      mobile:gap-y-[1.445rem]
      sMobile:gap-y-[2.313rem]
      mMobile:gap-y-[2.775rem]
      sLaptop:gap-y-[1.042rem]
      mLaptop:gap-y-[1.302rem]
      desktop:gap-y-[1.563rem]
      largeDesktop:gap-y-[1.953rem]

      px-[3.125%]

      sLaptop:pr-[1.5%]
      sLaptop:pl-0

      mb-[2.933rem]
      mobile:mb-[3.666rem]
      sMobile:mb-[4.4rem]
      mMobile:mb-[5.28rem]

      sLaptop:mb-[2.342rem]
      mLaptop:mb-[2.916rem]
      desktop:mb-[3.5rem]
      largeDesktop:mb-[4.375rem]

      sLaptop:scrollGutter
     
    ">
      {
        getUserTasks.map((task,index)=> {
          return  <AnimatePresence key={task.t_id}>
            <Tasks durat={(index+1)*.15} task={task} />
          </AnimatePresence>
        })
      }
    </div>
  )
})

export default index