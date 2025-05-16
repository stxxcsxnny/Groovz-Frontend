import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Stack,
  Button,
  Typography
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import UserItem from "../shared/UserItem";
import { setisaddMember } from "../../redux/reducer/misc";
import { sampleUsers } from "../../constants/sampleData";
import { useAsyncMutation } from "../../../hooks/hook";
import { useAddGroupmemberMutation, useAvailableFriendsQuery } from "../../redux/api/api";

const AddMemberDialog = ({ chatId  }) => {
  const dispatch = useDispatch();
  const { isaddMember } = useSelector((state) => state.misc);
  const [addMember, isLoadingAddMember] = useAddGroupmemberMutation();


    const { isError, isLoading, error, data } = useAvailableFriendsQuery({});

  const closeHandler = () => {
    dispatch(setisaddMember(false));
  };
  const addHandler = (userId) => {
    console.log("Adding user to group:", userId);
    if (chatId) {
      addMember({ chatId, members: [userId] })
        .unwrap()
       
        .catch(err => {
          console.error("Add Member Error:", err);
        });
    }
  };
  

  return (
    <Dialog open={isaddMember} onClose={closeHandler} fullWidth maxWidth="xs"
      PaperProps={{
        sx: {
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          borderRadius: '1rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#fff',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
        }
      }}
    >
      <DialogTitle sx={{ color: "#fff" }}>
        Add Member
        <IconButton
          onClick={closeHandler}
          sx={{ position: 'absolute', top: 10, right: 10, color: "#fff" }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ maxHeight: '50vh', overflowY: 'auto' }}>
        {data?.friends.map((user) => (
          console.log(user),
          
          <UserItem
          user={user}
          key={user._id}
          isSelected={user._id}
          showAddIcon={true}
           handler={() => addHandler(user._id)}

            style={{
              padding: '0.8rem 1.2rem',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.07)',
              margin: '0.4rem 0',
              transition: '0.3s',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
            isAdded={false}
            showAdd
          />
        ))}
      </DialogContent>

      <DialogActions sx={{ padding: '1rem' }}>
        <Button
          onClick={closeHandler}
          variant="outlined"
          sx={{
            borderColor: "rgba(255, 255, 255, 0.3)",
            color: "#fff",
            "&:hover": {
              borderColor: "#fff",
              background: "rgba(255,255,255,0.1)"
            }
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMemberDialog;
