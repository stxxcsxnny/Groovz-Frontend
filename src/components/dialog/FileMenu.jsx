import React, { useRef } from "react";
import {
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Tooltip,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Image,
  InsertDriveFile,
  Person,
  VideoLibrary,
  AudioFile,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setisFileMenu, setuploadingLoader } from "../../redux/reducer/misc";
import toast from "react-hot-toast";
import { useSendAttachmentsMutation } from "../../redux/api/api";

const FileMenu = ({ anchorEl, chatId }) => {
  const { isFileMenu } = useSelector((state) => state.misc);
  const dispatch = useDispatch();
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Mobile size (600px and below)

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const audioInputRef = useRef(null);

  const [sendAttachments] = useSendAttachmentsMutation();

  const closeFileMenu = () => dispatch(setisFileMenu(false));

  const handleSelect = (type) => {
    switch (type) {
      case "image":
        imageInputRef.current?.click();
        break;
      case "video":
        videoInputRef.current?.click();
        break;
      case "file":
        fileInputRef.current?.click();
        break;
      case "audio":
        audioInputRef.current?.click();
        break;
      default:
        break;
    }
    closeFileMenu();
  };

  const fileInputHandler = async (e, key, maxSize) => {
    const files = Array.from(e.target.files);

    console.log("Selected files:", files); // Debugging - check files selected

    if (files.length <= 0) {
      toast.error(`No ${key} selected`);
      return;
    }

    // Validate file size and type
    for (let file of files) {
      if (file.size > maxSize) {
        toast.error(`${key} file is too large (max size: ${maxSize / (1024 * 1024)}MB)`);
        return;
      }
    }

    dispatch(setuploadingLoader(true));

    const toastId = toast.loading(`Sending ${key}...`);
    closeFileMenu();

    try {
      const myForm = new FormData();
      myForm.append("chatId", chatId);

      files.forEach((file) => {
        console.log(`Appending file: ${file.name}`); // Debugging - log each file name being appended
        myForm.append("files", file);
      });

      // Log FormData content
      console.log("FormData content:");
      for (let pair of myForm.entries()) {
        console.log(pair[0], pair[1]);
      }

      const res = await sendAttachments(myForm);

      if (res.data) {
        toast.success(`${key} sent successfully`, { id: toastId });
      } else {
        toast.error(`Failed to send ${key}`, { id: toastId });
      }
    } catch (error) {
      console.error("Error during file upload:", error); // Debugging - catch and log any error
      toast.error(error.message, { id: toastId });
    } finally {
      dispatch(setuploadingLoader(false));
    }
  };

  const Option = ({ title, desc, icon, gradient, maxSize, onClick }) => (
    <Tooltip title={title} placement={isSmallScreen ? "bottom" : "right"}>
      <MenuItem onClick={() => onClick(maxSize)} sx={{ gap: 1, alignItems: "flex-start", py: 1.5 }}>
        <ListItemIcon>
          <Avatar
            sx={{
              width: isSmallScreen ? 20 : 26,
              height: isSmallScreen ? 20 : 26,
              background: gradient,
              color: "#fff",
              fontSize: isSmallScreen ? 16 : 18,
            }}
          >
            {icon}
          </Avatar>
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography fontWeight={600} fontSize={isSmallScreen ? "0.65rem" : "0.85rem"}>
              {title}
            </Typography>
          }
          secondary={
            <Typography variant="caption" color="gray" sx={{ fontSize: isSmallScreen ? "0.55rem" : "0.75rem" }}>
              {desc}
            </Typography>
          }
        />
      </MenuItem>
    </Tooltip>
  );

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={isFileMenu}
        onClose={closeFileMenu}
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: theme.palette.mode === "dark" ? "#1f1f1f" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "#000",
            minWidth: isSmallScreen ? 2 : 20,
            boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
            padding: isSmallScreen ? 0 : 1,
          },
        }}
        transitionDuration={250}
      >
        <Box px={2} pt={2}>
          <Typography fontSize={"12px"} fontWeight={100} color="text.secondary">
            Share Something
          </Typography>
        </Box>

        <MenuList dense>
          <Option
            title="Photo"
            desc="JPG, PNG — max 10MB"
            icon={<Image />}
            gradient="linear-gradient(45deg, #f857a6, #ff5858)"
            maxSize={10 * 1024 * 1024} // 10MB
            onClick={() => handleSelect("image")}
          />

          <Option
            title="Video"
            desc="MP4, MOV — max 25MB"
            icon={<VideoLibrary />}
            gradient="linear-gradient(45deg, #43cea2, #185a9d)"
            maxSize={25 * 1024 * 1024} // 25MB
            onClick={() => handleSelect("video")}
          />

          <Option
            title="Audio"
            desc="MP3, WAV — max 15MB"
            icon={<AudioFile />}
            gradient="linear-gradient(45deg, #f7971e, #ffd200)"
            maxSize={15 * 1024 * 1024} // 15MB
            onClick={() => handleSelect("audio")}
          />

          <Divider sx={{ my: 1 }} />

          <Option
            title="Document"
            desc="PDF, DOCX, ZIP — max 50MB"
            icon={<InsertDriveFile />}
            gradient="linear-gradient(45deg, #00c6ff, #0072ff)"
            maxSize={50 * 1024 * 1024} // 50MB
            onClick={() => handleSelect("file")}
          />

          <Option
            title="Contact"
            desc="Send saved contact"
            icon={<Person />}
            gradient="linear-gradient(45deg, #00b09b, #96c93d)"
            onClick={() => alert("Coming soon")}
          />
        </MenuList>
      </Menu>

      {/* Hidden Inputs */}
      <input
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/gif"
        hidden
        ref={imageInputRef}
        onChange={(e) => fileInputHandler(e, "Photo", 10 * 1024 * 1024)} // 10MB
      />
      <input
        type="file"
        accept="video/mp4,video/mov,video/webmv,video/quicktime,video/x-msvideo,video/x-ms-wmv"
        hidden
        ref={videoInputRef}
        onChange={(e) => fileInputHandler(e, "Video", 25 * 1024 * 1024)} // 25MB
      />
      <input
        type="file"
        accept="audio/mpeg,audio/wav,audio/ogg"
        hidden
        ref={audioInputRef}
        onChange={(e) => fileInputHandler(e, "Audio", 15 * 1024 * 1024)} // 15MB
      />
      <input
        type="file"
        hidden
        ref={fileInputRef}
        onChange={(e) => fileInputHandler(e, "Document", 50 * 1024 * 1024)} // 50MB
      />
    </>
  );
};

export default FileMenu;
