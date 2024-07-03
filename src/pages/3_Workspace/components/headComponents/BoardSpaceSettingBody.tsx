import { memo, useContext, useLayoutEffect } from "react"
import { useAppDispatch } from "../../../../reduxStore/hook"
import { AppContext } from "../../../appRefContext";
import { motion } from 'framer-motion'
import { setSettingModal } from "../../../../reduxStore/modal/modalSlice";

const BoardSpaceSettingBody = memo(() => {

    const dispatch = useAppDispatch();

    const appContext = useContext(AppContext);
    const {settingsBodyRef, settingsRef, mobileMembersRef} = appContext!;

    useLayoutEffect(()=> {
        const checkClick = (e:MouseEvent | TouchEvent) => {
            const element = e.target as Node;

            if(settingsBodyRef.current && !settingsBodyRef.current.contains(element) &&
            settingsRef.current && !settingsRef.current.contains(element)
            || !settingsBodyRef.current
            ) {
              if(!mobileMembersRef.current?.contains(element))dispatch (setSettingModal(false))
            } 

        }   
        window.addEventListener('click',checkClick,true);
       return () => {
        window.removeEventListener('click',checkClick,true);
       }
    },[])

  return (
    <motion.div 
    initial={{ 
        y:'-15%',
        opacity: 0 
      }}
      animate={{ 
        y:0,
        opacity: 1 
      }}
      exit={{ 
        y:'-15%',
        opacity: 0 
      }}
      transition={{
        ease: "easeInOut",
        duration:.3
      }}
    ref={settingsBodyRef} 
    className={`
        absolute
        top-[102.5%]
        right-[-25%]

        sLaptop:w-[159.999px]
        sLaptop:h-[133.333px]
        mLaptop:w-[199.999px]
        mLaptop:h-[166.666px]
        desktop:w-[240px]
        desktop:h-[200px]
        largeDesktop:w-[300px]
        largeDesktop:h-[250px]

        dropDownShadow

        bg-PrimaryWhite

        sLaptop:rounded-[0.381rem]
        mLaptop:rounded-[0.476rem]
        desktop:rounded-[0.572rem]
        largeDesktop:rounded-[0.715rem]
    `}>
    </motion.div>
  )
})

export default BoardSpaceSettingBody