// Searchdialog.jsx
import { useInputValidation } from "6pp";
import { Search } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  Divider,
  InputAdornment,
  List,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation } from "../../../hooks/hook";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";
import { setisSearch } from "../../redux/reducer/misc";
import UserItem from "../shared/UserItem";

const Searchdialog = () => {
  const [users, setUsers] = useState([]);
  const search = useInputValidation("");
  const { isSearch } = useSelector((state) => state.misc);
  const dispatch = useDispatch();

  const [searchUser] = useLazySearchUserQuery();
  const [isLoadingFriend, executemutation] = useAsyncMutation(
    useSendFriendRequestMutation
  );

  const addFriendHandler = async (id) => {
    console.log("Add friend:", id);
    await executemutation("sending friend request....", { userId: id });
  };

  const searchCloseHandler = () => {
    dispatch(setisSearch(false));
  };

  useEffect(() => {
    if (!search.value.trim()) {
      setUsers([]);
      return;
    }
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => {
          if (data?.users) setUsers(data.users);
        })
        .catch((err) => {
          console.error("Search error:", err);
          setUsers([]);
        });
    }, 500);

    return () => clearTimeout(timeOutId);
  }, [search.value]);

  return (
    <Dialog
      open={isSearch}
      onClose={searchCloseHandler}
      PaperProps={{
        sx: {
     borderRadius: '1rem',
          backdropFilter: 'blur(10px)',
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
        },
      }}
    >
      <Stack spacing={2} width={{ xs: "60vw", sm: "20rem" }} padding={2}>
        <DialogTitle sx={{ color: "white", fontSize: "1rem", padding: 0 }}>
          Find People
        </DialogTitle>

        <TextField
          variant="outlined"
          placeholder="Search by username"
          value={search.value}
          onChange={search.changeHandler}
          size="small"
          fullWidth
          sx={{
            input: { color: "white" },
            "& .MuiOutlinedInput-root": {
              borderRadius: "0.8rem",
          background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: "blur(1px)",
              border: "1px solid rgba(255,255,255,0.2)",
              "& fieldset": { border: "none" },
              "&:hover fieldset": {
                backgroundColor: "rgba(255,255,255,0.15)",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "gray" }} />
              </InputAdornment>
            ),
          }}
        />

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

        <List>
          {users.length > 0 ? (
            users.map((user) => (
              <UserItem
                key={user._id}
                user={user}
                handler={addFriendHandler}
                handlerIsLoading={isLoadingFriend}
              />
            ))
          ) : (
            <Typography color="gray" textAlign="center" mt={2}>
              No users found.
            </Typography>
          )}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Searchdialog;
