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

import { useForm, Controller, useFieldArray } from "react-hook-form";

import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { addData } from "../feature/user/userSlice";
// import { useDispatch } from "react-redux";

//** custom json data import  */
import formData from '../json/formData'



export default function TemporaryDrawer() {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    // const dispatch = useDispatch();

    const toggleDrawerr = (anchor, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        dispatch(toggleDrawer({ addrawer: { open: false } }));
    };
    const defaultValues = {
        name: "",
        metaData: []
    }

    const {
        control,
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues,
        mode: 'onSubmit'
    });

    const {
        fields,
        append,
        prepend,
        remove,
        swap,
        move,
        insert,
        replace
    } = useFieldArray({
        control,
        name: "metaData"
    });



    const onSubmit = (data, e) => {
        // console.log(data);

        // dispatch(addData(data));
        // dispatch(toggleDrawer({ addrawer: { open: false } }));
        // e.targetreset();
        console.log('data', data)
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
            role="presentation"
            onClick={toggleDrawerr(anchor, false)}
            onKeyDown={toggleDrawerr(anchor, false)}
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
    const openn = useSelector((state) => state.userReducer.ui.addrawer.open);
    const dispatch = useDispatch();
    //   console.log("opppp", openn);
    console.log('form detaaa', formData)

    const handleClose = () => {
        dispatch(toggleDrawer({ addrawer: { open: false } }));
    };


    formData.metaData.map((item, index) => setValue(`metaData.${index}.key`, item['key']));

    formData.metaData.map((item, index) => setValue(`metaData.${index}.value`, item['value']));

    formData.data.map((item, index) => setValue(`name`, item['name']));


    return (
        <div>
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
                    {errors.name && <p>name is required</p>}
                </FormControl>

                {/* {fields.map((item, index) => {
                    return (
                        <li key={item.id}>
                            <TextField {...register(`metaData.${index}.key`)} />

                            <Controller
                                render={({ field }) => <TextField {...field} />}
                                name={`metaData.${index}.value`}
                                control={control}
                            />
                            <button type="button" onClick={() => remove(index)}>
                                Delete
                            </button>
                        </li>
                    );
                })} */}

                {formData.metaData.map((item, index) => {
                    return (
                        <li key={item.id}>
                            {/* <TextField {...register(`metaData.${index}.key`)} /> */}

                            <Controller
                                name={`metaData.${index}.key`}
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextField
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        value={value}
                                        id="outlined-basic"
                                        label='Key'
                                        variant="outlined"
                                        style={{ margin: 20 }}
                                    />
                                )}

                            />

                            {/* <Controller
                                render={({ field }) => <TextField {...field} />}
                                name={`metaData.${index}.value`}
                                control={control}
                            /> */}


                            <Controller
                                name={`metaData.${index}.value`}
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextField
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        value={value}
                                        id="outlined-basic"
                                        label='value'
                                        variant="outlined"
                                        style={{ margin: 20 }}
                                    />
                                )}

                            />
                        </li>
                    );
                })}



                <br></br>
                <Button type="submit" className="mx-10">Submit</Button>
            </form>
        </div>
    );
}
