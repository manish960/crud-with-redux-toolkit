import { useSelector, useDispatch } from "react-redux";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from '@mui/material/Typography';

import {
  fetchData,
  toggleDrawer,
  deletedUser,
  fetchSingleData
} from "../feature/user/userSlice";
import { useEffect } from "react";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DataGrid } from '@mui/x-data-grid';


const rows = [
  {
    id: 1,
    name: 'MUI',
    stars: 28000,
  },
  {
    id: 2,
    name: 'DataGrid',
    stars: 15000,
  },
];

const columns = [
  {
    field: 'name', 
    width: 150, 
    renderCell: ({row}) => (
      <Typography variant="subtitle2">
        {row.name}
      </Typography>
    )
  },
  { field: 'stars', width: 150 ,renderCell: (row) => (
    <Typography variant="subtitle2">
      {row.name}
    </Typography>
  )},
];


export function SortedDescendingIcon() {
  return <ExpandMoreIcon className="icon" />;
}

export function SortedAscendingIcon() {
  return <ExpandLessIcon className="icon" />;
}



const Users = () => {
  const data = useSelector((state) => state.userReducer.data);
  console.log("ss", data);
  const dispatch = useDispatch();
  const handleOpen = () => {
    dispatch(toggleDrawer({ addrawer: { open: true } }));
  };

  const handleClose = () => {
    dispatch(toggleDrawer({ addrawer: { open: false } }));
  };

  const handleOpenUpdate = (id) => {
    dispatch(toggleDrawer({ updateDrawer: { open: true } }))
    dispatch(fetchSingleData(id))
  };
  useEffect(() => {
    dispatch(fetchData());
    // dispatch(toggleDrawer({addrawer:{open:true}}))
  }, [dispatch]);
  return (
    <>
      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Id
              </th>
              <th scope="col" className="py-3 px-6">
                Avtaar
              </th>
              <th scope="col" className="py-3 px-6">
                Name
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data[0] &&
              data.map((data) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {data.id}
                  </th>
                  <img
                    src={data.avatar}
                    className="rounded-full h-10 w-10"
                  ></img>
                  <td className="py-4 px-6">{data.name}</td>
                  <Stack spacing={2} direction="row">
                    <Button onClick={handleOpen}>
                      <AddIcon />
                    </Button>
                    <Button onClick={() => handleOpenUpdate(data.id)} > <EditIcon /></Button>
                    <Button onClick={() => dispatch(deletedUser(data.id))}>
                      <DeleteIcon />
                    </Button>
                  </Stack>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <DataGrid
        columns={columns}
        rows={data}
        sortModel={[{ field: 'name', sort: 'asc' }]}
        components={{
          ColumnSortedDescendingIcon: SortedDescendingIcon,
          ColumnSortedAscendingIcon: SortedAscendingIcon,
        }}
      />
    </>
  );
};

export default Users;
