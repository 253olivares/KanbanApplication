import { getMobileModal, getModalStatus } from '../../reduxStore/modal/modalSlice';
import { useAppDispatch, useAppSelector } from '../../reduxStore/hook';
import {memo, lazy, useLayoutEffect, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

import SecondaryModalMobile from './components/SecondaryModal';
import ModalContainer from '../../modals'

import { AnimatePresence } from 'framer-motion';
import { checkRemembered, getUser } from '../../reduxStore/users/userSlice';

const MainSection = lazy(()=> import('./section-1_Main-Head'))
const PMSection = lazy(()=>import('./section-2_PM-Section'))
const PricingSection = lazy(()=> import('./section-3_Pricing'));
const Footer = lazy(()=> import('./footer'));

const index = memo(():JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // check to see if a user is signed in
  const user = useAppSelector(getUser);

  useLayoutEffect(()=> {
    console.log('useLayoutEffectRan')
    // check to see if a user has their credentials saved for next login
    dispatch(checkRemembered());
  },[])

  useEffect(()=> {
    if(user){
      console.log('User found page should redirect!');
      navigate(`/u/${user.u_id}`);
    }
  },[user])

  // state to keep track of when our modal is open
  const modalStatus = useAppSelector(getModalStatus)
  const SecondaryModal = useAppSelector(getMobileModal)

  // In this page we are going to handle our popup states within here
  return (
    <main
    className={`
    block
    relative
    w-full
    ${
      SecondaryModal || modalStatus ? 'h-screen overflow-y-hidden' : ''
    }
    overflow-x-hidden
    `}
    >
      <AnimatePresence>
        {/* open and close our modal */}
        { modalStatus &&  <ModalContainer /> }
        {/* secondary modal for mobile only  */}
        { SecondaryModal && <SecondaryModalMobile />}
      </AnimatePresence>
      {/* Main section 1 */}
        <MainSection />
        {/* Project Management Pitch section */}
        <PMSection />
        {/* application pricing section */}
        <PricingSection />
        {/* Footer */}
        <Footer />
    </main>
  )
})

export default index