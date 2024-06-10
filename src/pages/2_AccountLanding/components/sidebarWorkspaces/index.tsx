import { AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../../../reduxStore/hook';

import { changeModal, getWorkSpaceModal } from '../../../../reduxStore/workspace/workspaceSlice';
import { memo, useContext } from 'react';

import addWorkspace from '/assets/Add_New_Workspace.svg';
import WorkspaceModal from '../addWorksapace';
import { AppContext } from '../../../appRefContext';
import { openAccountLadingModal } from '../../../../reduxStore/modal/modalSlice';

const index = memo((
  {
    // setWorkspace,
    // workspaces
  }
  :
  {
    setWorkspace:(string:string)=>void
    workspaces:unknown[]
  }
  ) => {
    const dispatch = useAppDispatch();
    
    const openModal:boolean = useAppSelector(getWorkSpaceModal);

    const appContext = useContext(AppContext);
    const {openSpaceModal} = appContext!;

    // console.log(setWorkspace);
    // console.log(workspaces);
  return (
    <div className="
    w-full

    flex
    flex-col

    grow-0
    sLaptop:grow

    z-0
    ">
      {/* Workspaces */}
      <div className="
      w-full

      hidden
      sLaptop:flex

      flex-row

      justify-between
      items-center

      relative

      sLaptop:px-[7.5%]

      sLaptop:pt-[1.124rem]
      mLaptop:pt-[1.405rem]
      desktop:pt-[1.687rem]
      largeDesktop:pt-[2.109rem]
      4k:pt-[2.811rem]
      ">
        <h1 className="
        sLaptop:text-[1.25rem]
        mLaptop:text-[1.562rem]
        desktop:text-[1.875rem]
        largeDesktop:text-[2.344rem]
        4k:text-[3.125rem]

        leading-snug

        font-medium

        text-white
        "
        >Workspaces</h1>
        <div 
        ref={openSpaceModal}
        onClick={()=>{
          dispatch(openAccountLadingModal());
          dispatch(changeModal(!openModal));
        }}
        className='
        sLaptop:hover:bg-SpaceBlueSelected
        
        sLaptop:p-[0.266rem]
        mLaptop:p-[0.333rem]
        desktop:p-[0.4rem]
        largeDesktop:p-[.5rem]
        4k:p-[0.666rem]

        sLaptop:rounded-[0.133rem]
        mLaptop:rounded-[0.166rem]
        desktop:rounded-[0.2rem]
        largeDesktop:rounded-[.25rem]
        4k:rounded-[0.333rem]
        
        sLaptop:hover:cursor-pointer

        transition-[background-color]
        duration-500
        '>
          <img 
          className='
          sLaptop:w-[0.933rem]
          mLaptop:w-[1.166rem]
          desktop:w-[1.4rem]
          largeDesktop:w-[1.75rem]
          4k:w-[2.333rem]
          ' 
          src={addWorkspace} 
          alt="Add Workspace" />
        </div>
        <AnimatePresence>
          {openModal ? <WorkspaceModal/>  : ''}
        </AnimatePresence>
      </div>
      <div className="
      w-full
      flex
      flex-row
      sLaptop:flex-col
      pt-[0.854rem]
      pb-[0.659rem]
      px-[4.55%]
      mobile:pt-[1.139rem]
      mobile:pb-[0.879rem]
      sMobile:pt-[1.823rem]
      sMobile:pb-[1.406rem]
      mMobile:pt-[2.188rem]
      mMobile:pb-[1.688rem]
      sLaptop:pt-0
      sLaptop:pb-0
      ">
        <div 

        onClick={()=>{
          dispatch(changeModal(!openModal));
        }}
        className=' 
        flex
        sLaptop:hidden
        justify-between
        items-center
        gap-[0.585rem]
        mobile:gap-[0.937rem]
        sMobile:gap-[1.5rem]
        mMobile:gap-[1.8rem]
        px-[1.025rem]
        mobile:px-[1.367rem]
        sMobile:px-[2.187rem]
        mMobile:px-[2.625rem]
        py-[0.659rem]
        mobile:py-[0.879rem]
        sMobile:py-[1.406rem]
        mMobile:py-[1.688rem]

        rounded-[0.244rem]
        mobile:rounded-[0.325rem]
        sMobile:rounded-[0.520rem]
        mMobile:rounded-[0.625rem]

        hover:bg-SpaceBlueSelected
        hover:cursor-pointer

        '>
          <span className='
          text-PrimaryWhite
          text-[0.854rem]
          mobile:text-[1.139rem]
          sMobile:text-[1.823rem]
          mMobile:text-[2.188rem]
          leading-none

          font-medium
          '>Add Workspace</span>
          <img className='
          w-[0.683rem]
          mobile:w-[1.093rem]
          sMobile:w-[1.75rem]
          mMobile:w-[2.1rem]
          ' src={addWorkspace} alt="Add Workspace" />
        </div>
      </div>
    </div>
  )
})

export default index