

import {
  Add,
  Delete,
  Done,
  Edit,
  KeyboardArrowLeft,
  Menu,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { lazy, memo, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import AvatarCard from '../components/shared/AvatarCard';
import UserItem from '../components/shared/UserItem';
import { Link } from '../components/styles/StyledComponents';

import '../components/CssStyles/groups.css';

import { useAsyncMutation } from '../../hooks/hook';
import AddMemberDialog from '../components/dialog/AddMember';
import {
  useAddGroupmemberMutation,
  useChatDetailsQuery,
  useDeleteChatMutation,
  useMyGroupsQuery,
  useRemoveGroupmemberMutation,
  useRenameGroupMutation,
} from '../redux/api/api';
import { setisaddMember } from '../redux/reducer/misc';

const ConfirmDeleteDialog = lazy(
  () => import('../components/dialog/ConfirmDeleteDialog')
);

const Groups = () => {
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get('group');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isaddMember } = useSelector((state) => state.misc);

  const { data: myGroupsData, isError: groupsError } = useMyGroupsQuery('');

  const { data: groupDetailsData, isError: detailsError } = useChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId }
  );
  
  const [renameGroup, { isLoading: isLoadingGroupname }] =
    useRenameGroupMutation();
  const [removeMember] = useRemoveGroupmemberMutation();
  const [addMembers] = useAsyncMutation(useAddGroupmemberMutation);
  const [deleteGroup] = useDeleteChatMutation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupNameUpdateValue, setGroupNameUpdateValue] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);


  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (groupDetailsData) {
      const { name, members } = groupDetailsData.chat;
      setGroupName(name);
      setGroupNameUpdateValue(name);
      setMembers(members || []);
    }

    return () => {
      setGroupName('');
      setGroupNameUpdateValue('');
      setMembers([]);
      setIsEdit(false);
    };
  }, [groupDetailsData]);

  const handleMobileToggle = () => setIsMobileMenuOpen((prev) => !prev);
  const updateGroupName = () => {
    setIsEdit(false);
    renameGroup({ chatId, name: groupNameUpdateValue });
  };

  const removeMemberHandler = (id) => {
    removeMember({ chatId, userId: id });
  };

  const openConfirmDeleteDialogHandler = () => {
    setConfirmDelete(true);
  };
  const closeConfirmDeleteDialogHandler = () => {
    setConfirmDelete(false);
  };

  const deleteHandler = () => {
    deleteGroup({ chatId });
    setGroupName('');
    setGroupNameUpdateValue('');
    setMembers([]);

    closeConfirmDeleteDialogHandler();
    navigate('/groups');
  };

  const GroupNameSection = (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing="1rem"
      padding="1rem"
    >
      {isEdit ? (
        <>
          <TextField
            value={groupNameUpdateValue}
            onChange={(e) => setGroupNameUpdateValue(e.target.value)}
            variant="standard"
            sx={{
              input: { color: 'white' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                '&:hover fieldset': { borderColor: 'white' },
              },
            }}
          />
          <IconButton
            onClick={updateGroupName}
            sx={{
              color: '#fff',
              backgroundColor: 'rgba(184, 22, 135, 0.94)',
              '&:hover': { backgroundColor: 'rgba(70, 5, 51, 0.94)' },
            }}
          >
            <Done />
          </IconButton>
        </>
      ) : (
        <>
          <Typography
            sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}
          >
            {groupName}
          </Typography>
          <IconButton
            onClick={() => setIsEdit(true)}
            sx={{
              color: '#fff',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(5px)',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
            }}
          >
            <Edit />
          </IconButton>
        </>
      )}
    </Stack>
  );

  const ActionButtons = (
    <Stack
      direction={{ sm: 'row', xs: 'column-reverse' }}
      spacing="1rem"
      p={{ sm: '1rem', xs: '3rem', md: '1rem 4rem' }}
    >
      <Button
        variant="outlined"
        startIcon={<Delete />}
        onClick={openConfirmDeleteDialogHandler}
        sx={{
          color: '#fff',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.3)',
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            background: 'rgba(255,255,255,0.2)',
          },
        }}
      >
        Delete Group
      </Button>

      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => dispatch(setisaddMember(true))}
        sx={{
          background: 'linear-gradient(90deg, #83a4d4, #b6fbff)',
          color: '#0a2540',
          borderRadius: '20px',
          fontWeight: 500,
          '&:hover': {
            background: 'linear-gradient(90deg, #a1c4fd, #c2e9fb)',
          },
        }}
      >
        Add Member
      </Button>
    </Stack>
  );

  const BackAndMenuButtons = (
    <>
      <Box
        sx={{
          display: { xs: 'block', sm: 'none' },
          position: 'fixed',
          right: '1rem',
          top: '1rem',
          zIndex: 1300,
        }}
      >
        <IconButton
          onClick={handleMobileToggle}
          sx={{
            color: 'white',
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <Menu />
        </IconButton>
      </Box>

      <Tooltip title="Back">
        <IconButton
          sx={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(8px)',
            color: 'white',
          }}
          onClick={() => navigate(-1)}
        >
          <KeyboardArrowLeft />
        </IconButton>
      </Tooltip>
    </>
  );

  return (
    <div className="groupContainer">
      <div className="group-list">
        <GroupList myGroups={myGroupsData?.groups} chatId={chatId} />
      </div>

      <div className="group">
        {BackAndMenuButtons}

        {groupName && (
          <>
            {GroupNameSection}
 <Divider/>
            <Typography
  margin="2rem"
  alignSelf="flex-start"
  variant="body1"
  sx={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 600 }}
>
  Members
            </Typography>
           

<Stack
  maxWidth="45rem"
  width="100%"
  padding="1rem 2rem"
  spacing="1rem"
              sx={{
    marginBottom: '2rem',
    maxHeight: '40vh', 
    overflowY: 'auto', 
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '1rem',
    '&::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar if desired
  }}
>
  {members.length > 0 ? (
    members.map((user) => (
      <UserItem
        user={user}
        key={user._id}
        isSelected={false}
        isAdded
        style={{
          padding: '1rem 2rem',
          background: 'rgba(255,255,255,0.08)',
          color: '#fff',
          borderRadius: '1rem',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.2)',
        }}
        handler={removeMemberHandler}
      />
    ))
  ) : (
    <Typography>No members found.</Typography> // Optional message when no members exist
  )}
</Stack>



            {ActionButtons}
          </>
        )}
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        {isaddMember && (
          <AddMemberDialog
            open={isaddMember}
            chatId={chatId}
            
            onClose={() => dispatch(setisaddMember(false))}
          />
        )}
      </Suspense>

      {confirmDelete && (
        <Suspense fallback={<div>Loading...</div>}>
          <ConfirmDeleteDialog
            open={confirmDelete}
            onClose={closeConfirmDeleteDialogHandler}
            deleteHandler={deleteHandler}
          />
        </Suspense>
      )}

      <Drawer
        anchor="right"
        open={isMobileMenuOpen}
        onClose={handleMobileToggle}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            background: 'rgba(6,6,28,0.18)',
            backdropFilter: 'blur(5px)',
            color: '#fff',
            width: '40vw',
          },
        }}
      >
        <GroupList myGroups={myGroupsData?.groups} chatId={chatId} />
      </Drawer>
    </div>
  );
};

const GroupList = ({ w = '100%', myGroups = [], chatId }) => (
  <Stack width={w} direction="column" overflow="auto" spacing={1}>
    {myGroups.length ? (
      myGroups.map((group) => (
        <GroupListItem group={group} chatId={chatId} key={group._id} />
      ))
    ) : (
      <Typography
        textAlign="center"
        padding="1rem"
        color="rgba(255,255,255,0.6)"
      >
        No groups
      </Typography>
    )}
  </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;
  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => chatId === _id && e.preventDefault()}
    >
      <Stack direction="row" alignItems="center" spacing="1rem">
        <AvatarCard avatar={avatar} />
        <Typography
          sx={{ color: 'white', marginLeft: { xs: '1rem', sm: '10rem' } }}
        >
          {name}
        </Typography>
      </Stack>
    </Link>
  );
});

export default Groups;
