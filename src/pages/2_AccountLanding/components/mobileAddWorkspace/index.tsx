import { AnimatePresence, motion } from "framer-motion"
import { useContext, useEffect, useRef } from "react"
import { AppContext } from "../../../appRefContext";
import { useState } from "react";

import AddModal from './component/workspaceModal';
import ConfirmDelete from './component/confirmDelete';
import { useAppDispatch, useAppSelector } from "../../../../reduxStore/hook";
import { addNewWorkspace, changeModal, getWorkspaceSelect, updateWorkspaceBoard } from "../../../../reduxStore/workspace/workspaceSlice";
import { sanitize } from "../../../../customLogic";
import { updateUserBoards, updateUserWorkspaces } from "../../../../reduxStore/users/userSlice";
import { addBoards, changeBoardModal } from "../../../../reduxStore/boards/boardsSlice";

const index = ({boardsModal,mobileWorkspace,modaal}:{boardsModal:boolean,mobileWorkspace:boolean,modaal:string}) => {

    const dispatch = useAppDispatch();

    const appContext= useContext(AppContext);
    const {mobileAddNewWorkspace} = appContext!;

    const selectWorkspace = useAppSelector(getWorkspaceSelect);

    const workspaceRef = useRef<HTMLInputElement>(null);
    const boardRef = useRef<HTMLInputElement>(null)

    const [newWorkspaceName,setNewWorkspaceName] = useState<string>("");
    const [newBoardName, setNewBoardName] = useState<string>("");

    const checkInputNewworkspace = ():void => {
      if(newWorkspaceName.trim().length > 13){
        alert('Please make sure your workspace name is less than 12 letters.');
        return;
      }
      dispatch(addNewWorkspace(sanitize(newWorkspaceName.trim())))
          .unwrap()
          .then((x:any)=>{
              alert('New workspace successfully added!');
              if(x?.newWorkspace) dispatch(updateUserWorkspaces(x.newWorkspace));
              dispatch(changeModal(false));
              setNewWorkspaceName('')
          })
    };

    const checkInputNewBoard = ():void => {
      if(newBoardName.trim().length > 15) {
        alert('Please make sure the board name is less than 15 characters.')
        return;
      }
      dispatch(addBoards({boardName:newBoardName.trim(),workspaceId:selectWorkspace}))
      .unwrap()
      .then((x) => {
        alert('New board successfully added!');
        if(x) {
          dispatch(updateUserBoards(x.newBoard));
          dispatch(updateWorkspaceBoard(x.newBoard))
        } 
        dispatch(changeBoardModal(false));
        setNewBoardName('');
      })
    } 

    useEffect(()=> {

      if(workspaceRef.current && newWorkspaceName.trim().length >13){
        workspaceRef.current.style.color = 'red';
      } else if (boardRef.current && newBoardName.trim().length >15){
        boardRef.current.style.color = 'red';
      } else if (workspaceRef.current && newWorkspaceName.trim().length <= 13){
        workspaceRef.current.style.color = 'black';
      } else if (boardRef.current && newBoardName.trim().length <= 15){
        boardRef.current.style.color = 'black';
      }

    },[])

  return (
    <motion.div 

    ref={mobileAddNewWorkspace}

    initial={{ 
        opacity: 0 
      }}
      animate={{ 
        opacity: 1 
      }}
      exit={{ 
        opacity: 0 
      }}
    className="
    absolute
    z-[20]
    top-0
    left-0
    w-dvw
    h-dvh
    
    overflow-x-hidden
    overflow-y-auto
    no-scrollbar
    bg-[rgba(0,0,0,0.75)]

    flex
    justify-center
    items-center

    sLaptop:hidden
    ">
      {
        mobileWorkspace ? 
        <AnimatePresence>
            <AddModal 
            label="Add New Workspace:"
            placeholder="New Workspace..."
            valueHolder = {newWorkspaceName}
            setHolder = {(e:React.ChangeEvent<HTMLInputElement>)=> setNewWorkspaceName(e.target.value)}
            checkInputHolder = {checkInputNewworkspace}
            closeModal = {()=>dispatch(changeModal(false))}
            />
        </AnimatePresence> : ''
      }
      {
        boardsModal ? 
        <AnimatePresence>
            <AddModal 
            label="Add New Board:"
            placeholder="New Board..."
            valueHolder={newBoardName}
            setHolder = {(e:React.ChangeEvent<HTMLInputElement>)=> setNewBoardName(e.target.value)}
            checkInputHolder = {checkInputNewBoard}
            closeModal={()=> dispatch(changeBoardModal(false))}
            />
        </AnimatePresence> : ''
      }
      {
        modaal === 'deleteConfirm' ? 
        <AnimatePresence>
            <ConfirmDelete />
        </AnimatePresence> : ''
      }
    </motion.div>
  )
}

export default index