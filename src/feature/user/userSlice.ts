import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useAxios from "./../../helpers/useAxios";
import axios from "axios";
// const dispatch = useDispatch()

// First, create the thunk
export const fetchUserById = createAsyncThunk(
  "users/fetchByIdStatus",
  async (userId: number, thunkAPI) => {
    // const response = await userAPI.fetchById(userId)

    let data = await useAxios.GET(
      `/userss`
    );
    console.log(data, "data");
    return data;
  }
);

export const fetchData = createAsyncThunk("users/fetchData", async () => {
  let { data } = await useAxios.GET(
    `/users`
  );
  let response = await useAxios.GET(
    `/users`
  );
  console.log(response, "resiii");
  return data;
});

// add the data

export const addData = createAsyncThunk("users/addData", async (params ,{dispatch}) => {
  console.log('alert')
  const data = await useAxios.POST(
    `/users`,params
  );
  
    // console.log(data, "add response...");
   if(data.status==201){
    dispatch(fetchData())
   }
  
  return data;
});

// update data

export const updateData = createAsyncThunk("users/updateData", async (params ,{dispatch}) => {
  console.log('alert')
  const data = await useAxios.PUT(
    `/users/${params.id}`,params.data
  );
  
    // console.log(data, "add response...");
   if(data.status==200){
    dispatch(fetchData())
   }
  
  return data;
});


// single data


export const fetchSingleData = createAsyncThunk("users/fetchSingleData", async (id ,{dispatch}) => {
  console.log('alert')
  const data = await useAxios.GET(
    `/users/${id}`
  );
  
    console.log(data, "single response...");
  //  if(data.status==200){
  //   dispatch(fetchData())
  //  }
  
  return data;
});

export const deletedUser = createAsyncThunk("users/deleteUser", async (id,{dispatch,getState}) => {

  let response  = await useAxios.DELETE(
    `/users/${id}`
  );
  // console.log(data, "data");
  console.log('this is response',response)
  if(response.status=='200'){
  //  console.log('yes 200')
   dispatch(fetchData())
   
  }else{
    console.log('your req is going wrong')
  }
  return response;
});


export const toggleDrawer = createAsyncThunk("users/updateui", async (update) => {
      console.log('this is uppppppppppppp',update)
  return  update;
});


interface UsersState {
  entities: [];
  loading: "idle" | "pending" | "succeeded" | "failed";
  data:[];
  ui:any;
}

const initialState = {
  entities: [],
  loading: "idle",
  data: {},
  user:{},
  ui:{
    addrawer:{
      open:false
    },
    updateDrawer:{
      open:false
    }
  }
} as UsersState;

// Then, handle actions in your reducers:
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
    .addCase(fetchUserById.fulfilled, (state, action) => {
      // Add user to the state array
      state.entities.push(action.payload);
    })
    .addCase(fetchData.fulfilled, (state, action) => {
      // Add user to the state array
      state.data=(action.payload);
      // dispatch(toggleDrawer)
      // state.Addrawer= {open:false}
      console.log('ye...',state)
    })
    .addCase(toggleDrawer.fulfilled, (state, action) => {
      // Add user to the state array
      state.ui= ({...state.ui,...action.payload})
    })
    .addCase(fetchSingleData.fulfilled,(state,action)=>{
      state.user=action.payload.data
    })
  },
});

// Later, dispatch the thunk as needed in the app
// dispatch(fetchUserById(123))
export default usersSlice.reducer;
