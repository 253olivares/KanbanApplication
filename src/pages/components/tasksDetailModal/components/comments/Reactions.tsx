import { memo, useContext, useLayoutEffect, useRef, useState } from "react"
import reactionIcon from '/assets/Reaction_Icon.svg';
import { user } from "../../../../../reduxStore/users/userSlice";
import { AppContext } from "../../../../appRefContext/appRefContext";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import ReactionButtons from "./ReactionButtons";


const Reactions = memo(({
  adminCred,
  assignees,
  userInfo,
  commentsReactions,
  usersReacted,
  commentID
} : {
  adminCred:boolean,
  assignees:string[],
  userInfo:user,
  commentsReactions:Record<string,number>,
  usersReacted:Record<string,string[]>,
  commentID:string
}) => {

  const Reactions:Record<string,number> = {
    "👍" : commentsReactions.thumbUp,
    "🎉" : commentsReactions.party,
    "😊": commentsReactions.smile
  }

  return (
    <div className="
    flex
    flex-row

    items-center
   
    gap-[0.234rem]
    mobile:gap-[0.312rem]
    sMobile:gap-[.5rem]
    mMobile:gap-[0.6rem]
    sLaptop:gap-[0.333rem]
    mLaptop:gap-[0.416rem]
    desktop:gap-[.5rem]
    largeDesktop:gap-[0.625rem]
    ">  
      {Object.entries(Reactions).map(([key,value],_) =>
        <Emoticons key={key} emoji={key} number={value} />
      )}
      {
         assignees.includes(userInfo.u_id) && <AddReaction commentID={commentID} userId={userInfo.u_id} commentsReactions={commentsReactions} usersReacted={usersReacted} />
      }
      {
        adminCred && <AddReaction commentID={commentID} commentsReactions={commentsReactions} userId={userInfo.u_id}  usersReacted={usersReacted} />
      }
    </div>
  )
})

const Emoticons = memo((
  {
    emoji,
    number
  } : {
    emoji:string,
    number:number
  }
)=>{
  if(number===0) return ;
  return <div className="
  flex
  flex-row

  items-center

  text-PrimaryWhite

  font-medium

  leading-none

  gap-[0.070rem]
  mobile:gap-[0.093rem]
  sMobile:gap-[0.15rem]
  mMobile:gap-[0.18rem]
  sLaptop:gap-[0.166rem]
  mLaptop:gap-[0.208rem]
  desktop:gap-[.25rem]
  largeDesktop:gap-[0.312rem]

  text-[0.820rem]
  mobile:text-[1.093rem]
  sMobile:text-[1.75rem]
  mMobile:text-[2.1rem]
  sLaptop:text-[0.666rem]
  mLaptop:text-[0.833rem]
  desktop:text-[1rem]
  largeDesktop:text-[1.25rem]
  ">
    <span>{emoji}</span>
    <span>{number}</span>
  </div>
})

const AddReaction = memo((
  {
    userId,
    commentsReactions,
    usersReacted,
    commentID
  } : {
    userId:string,
    commentsReactions:Record<string,number>,
    usersReacted:Record<string,string[]>,
    commentID:string
  }
)=>{

  const [openCloseOptions,setOpenCloseOptions] = useState<boolean>(false);

  const appContext = useContext(AppContext);
  const {reactionButton} = appContext!;

  return <div ref={reactionButton} className="
  relative
  ">
    <AnimatePresence>
    {
      openCloseOptions && <ReactionOptions commentID={commentID} commentsReactions={commentsReactions} userId={userId} usersReacted={usersReacted} setOpenCloseOptions={setOpenCloseOptions} />
    }
    </AnimatePresence>
    
    <img onClick={
      ()=>{
        setOpenCloseOptions(!openCloseOptions);
      }
    } 
    className="
    h-[0.878rem]
    mobile:h-[1.171rem]
    sMobile:h-[1.875rem]
    mMobile:h-[2.25rem]
    sLaptop:h-[0.766rem]
    mLaptop:h-[0.958rem]
    desktop:h-[1.15rem]
    largeDesktop:h-[1.437rem]

    opacity-100
    sLaptop:opacity-75

    hover:opacity-100

    cursor-pointer
    "
    src={reactionIcon} alt="" />
  </div> 
})

const ReactionOptions = memo((
  {
    userId,
    usersReacted,
    commentsReactions,
    setOpenCloseOptions,
    commentID
  } : {
    userId:string,
    usersReacted:Record<string,string[]>,
    commentsReactions:Record<string,number>,
    setOpenCloseOptions:React.Dispatch<React.SetStateAction<boolean>>,
    commentID:string
  }
) => {

  const appContext = useContext(AppContext);
  const {reactionButton} = appContext!;

  const reactionBox = useRef<HTMLDivElement> (null);

  useLayoutEffect(()=>{
    
    const checkClick = (e:MouseEvent | TouchEvent) => {
      const target = e.target as Node;

      if(reactionBox.current && !reactionBox.current.contains(target) &&
      reactionButton.current && !reactionButton.current.contains(target)
    ) {
      setOpenCloseOptions(false)
    } 
    
    } 

    window.addEventListener('click', checkClick, true);

    return () => {
      window.removeEventListener('click', checkClick, true);
    }
  },[])

  console.log("UserReacted",usersReacted)

  return  <motion.div 
    initial={{ 
      y:'15%',
      opacity: 0 
    }}
    animate={{ 
      y:0,
      opacity: 1 
    }}
    exit={{ 
      y:'15%',
      opacity: 0 
    }}
    transition={{
      ease: "easeInOut",
      duration:.3
    }}
    ref={reactionBox} 
    className="
    absolute

    bottom-[150%] 
    left-[-40%]

    rounded-full

    flex
    flex-row

    px-[0.351rem]
    mobile:px-[0.468rem]
    sMobile:px-[.75rem]
    mMobile:px-[0.9rem]
    sLaptop:px-[0.4rem]
    mLaptop:px-[0.5rem]
    desktop:px-[0.6rem]
    largeDesktop:px-[.75rem]

    py-[0.234rem]
    mobile:py-[0.312rem]
    sMobile:py-[.5rem]
    mMobile:py-[0.6rem]
    sLaptop:py-[0.266rem]
    mLaptop:py-[0.333rem]
    desktop:py-[0.4rem]
    largeDesktop:py-[.5rem]

    gap-[0.234rem]
    mobile:gap-[0.312rem]
    sMobile:gap-[.5rem]
    mMobile:gap-[0.6rem]
    sLaptop:gap-[0.266rem]
    mLaptop:gap-[0.333rem]
    desktop:gap-[0.4rem]
    largeDesktop:gap-[.5rem]

    bg-PrimaryWhite
  ">
    {
      Object.entries(usersReacted).map(([key,value],index)=>
        <ReactionButtons 
        key={`${userId} + ${key}`}
        commentID={commentID} 
        commentsReactions={commentsReactions} 
        durat={(index+1)*.15} 
        userId={userId} 
        reaction={key} 
        usersReacted={value} 
      />
      )
    }
    <div 
    className="
      absolute

      sLaptop:w-[0.733rem]
      mLaptop:w-[0.916rem]
      desktop:w-[1.1rem]
      largeDesktop:w-[1.375rem]
      sLaptop:h-[0.733rem]
      mLaptop:h-[0.916rem]
      desktop:h-[1.1rem]
      largeDesktop:h-[1.375rem]

      bottom-[-15%]
      left-[7.5%]
      z-[-1]

      bg-PrimaryWhite
      rounded-full

      hidden
      sLaptop:block
    "
    />
  </motion.div>
})

export default Reactions