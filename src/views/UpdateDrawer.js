import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { toggleDrawer } from "../feature/user/userSlice";

import { useForm, Controller } from "react-hook-form";

import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { updateData } from "../feature/user/userSlice";
// import { useDispatch } from "react-redux";

export default function UpdateDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const userId = useSelector((state)=>state.userReducer.user.id)
  // const dispatch = useDispatch();

  const toggleDrawerr = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    dispatch(toggleDrawer({ updateDrawer: { open: false } }));
  };

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
    },
    mode: "onSubmit",
  });
  const onSubmit = (data, e) => {
    // console.log(data);

    const upData = {id:userId,data:data};

    dispatch(updateData(upData));
    dispatch(toggleDrawer({ updateDrawer: { open: false } }));
    reset()
    console.log(upData,'update')
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const openn = useSelector((state) => state.userReducer.ui.updateDrawer.open);
  const statusRecord = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  console.log("open update", openn);

  if (statusRecord) {
    // setValue("name",statusRecord[statusRecord.name])
    const formField = ["name"];
    formField.map((item) => setValue(item, statusRecord[item]));
  }

  const handleClose = () => {
    dispatch(toggleDrawer({ updateDrawer: { open: false } }));
  };
  return (
    <div>
      <Drawer open={openn} onClose={toggleDrawerr()}>
        <div className="flex justify-between px-4 ">
          <h1 className="py-3">update the Data Here</h1><br></br>
          <Button className="flex justify-end">
            <CloseIcon onClick={handleClose} />
          </Button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl variant="standard">
            <Controller
              name="name"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  style={{ margin: 20 }}
                />
              )}
            />
          </FormControl><br></br>

          <input type="submit" className="mx-5"/>
        </form>
      </Drawer>
    </div>
  );
}
