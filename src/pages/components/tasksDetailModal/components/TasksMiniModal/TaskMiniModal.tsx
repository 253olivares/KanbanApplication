import { comments } from "../../../../../reduxStore/comments/commentsSlice";
import { task } from "../../../../../reduxStore/tasks/tasksSlice";
import { miniTaskTypes } from "../../TaskDetailModal";
import Content from "./content/Content";
import { motion } from "framer-motion";


const TaskMiniModal = ({
  boardId,
  task,
  openTaskMiniModal,
  setOpenTaskMiniModal,
  comment,
  setCommentFn
} : {
  boardId:string,
  task:task,
  openTaskMiniModal:miniTaskTypes,
  setOpenTaskMiniModal: React.Dispatch<React.SetStateAction<miniTaskTypes>>,
  comment:comments | null,
  setCommentFn: (comment:comments|null)=>void

}) => {

  return (
    <motion.div  
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{
        duration:.3 
    }}
    className='
      fixed
      sLaptop:absolute

      top-0
      left-0

      w-full
      h-full

      flex
      justify-center
      items-center

      bg-[rgba(0,0,0,0.75)]
      sLaptop:bg-transparent

      z-[10]
    '>
        <Content setOpenTaskMiniModal={setOpenTaskMiniModal} boardId={boardId} comment={comment} setCommentFn={setCommentFn} task={task} openTaskMiniModal={openTaskMiniModal} />
      <div
      className="
      absolute
      hidden
      sLaptop:block
      w-full
      h-full
      sLaptop:bg-[rgba(0,0,0,0.75)]
      "
      onClick={()=> setOpenTaskMiniModal("")}
      />
    </motion.div>
  )
}

export default TaskMiniModal