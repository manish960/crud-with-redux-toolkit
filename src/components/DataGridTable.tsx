import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useSelector, useDispatch } from "react-redux";
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { blue } from '@mui/material/colors';
import {
  fetchData,
  toggleDrawer,
  deletedUser,
  fetchSingleData
} from "../feature/user/userSlice";
import { useEffect } from "react";






const ITEM_HEIGHT = 48;

 const LongMenu = ({id})=> {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useDispatch();

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenUpdate = (id) => {
    dispatch(toggleDrawer({ updateDrawer: { open: true } }))
    dispatch(fetchSingleData(id))
  };



  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
      
          <MenuItem key={'1'} onClick={() => handleOpenUpdate(id)} >
            edit
          </MenuItem>
          <MenuItem key={'2'} onClick={() => dispatch(deletedUser(id))}>
            Delete
          </MenuItem>
  
      </Menu>
    </div>
  );
}






const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90,flex:1 },
  {
    flex:1,
    field: 'avataar',
    headerName: 'Avatar',
    // width: 150,
    editable: true,
    renderCell: ({row}) => (
      <Avatar alt="Travis Howard" src={row.avatar} />
    )
  },
  {
    flex:1,
    field: 'firstName',
    headerName: 'Full Name',
    // width: 150,
    editable: true,
    renderCell: ({row}) => (
      <Typography variant="subtitle2">
        {row.name}
      </Typography>
    )
  },
  {
    flex:1,
    field: 'action',
    headerName: 'Action',
    // width: 110,
    renderCell: ({row}) => (
      <LongMenu id = {row.id}/>
    )
  },

];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function DataGridTable() {
  const data = useSelector((state) => state.userReducer.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
    // dispatch(toggleDrawer({addrawer:{open:true}}))
  }, []);
  return (
  <>
  <Button sx={{ color: blue ,textAlign:'center'}} className='text-center mt-6' onClick={()=> dispatch(toggleDrawer({ addrawer: { open: true } }))}>Add <AddIcon/></Button>
    <Box sx={{ height: 400, width: '100%' }}>
      
      
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  </>
  );
}
