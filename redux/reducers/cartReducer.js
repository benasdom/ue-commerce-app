

import { createSlice } from '@reduxjs/toolkit'

      // Remeber to filter out all duplicates before using useSelector for this array
      // Remeber to filter out all duplicates before using useSelector for this array
      // Remeber to filter out all duplicates before using useSelector for this array
      
 

      

const cartReducer = createSlice({
  name:"selectedItems",
  initialState:{item:[],value:0,completed:false,credentials:{}},  
  reducers: {
    itemsadded:(state, action)=>{
      
      let newadded={
        name:action.payload.title,
        image:action.payload.thumbnail,
        price:action.payload.price.current_price,
        id:action.payload.id,
        amount:action.payload.itemamount,
        region:action.payload.region,
        city:action.payload.city,
        landmark:action.payload.landmark,
       }
    if(state.item.length>0){
    for(let i=0;i<state.item.length;i++){
      if((state.item[i].id===newadded.id)){
        if((state.item[i].image==newadded.image)){
          state.item[i]=newadded;
          state.item[i]?state.value=0:state.item[i]=newadded;
        }
       else{

        state.item.push(newadded)?state.value=0:false;
       }
      }
      else{
      if((state.item[i].id !=newadded.id)){

        state.item.push(newadded)?state.value=0:false;
      }
        else{
          false
        }
      }
    }
    state.item=[...state.item.filter((obj,index)=>{return state.item.indexOf(obj)===index}).map((cartlist)=>cartlist)]
    }
    else{
      state.item.push(newadded)?state.value=0:false;

    }

    },
    increment:(state)=>{
      
      state.value+=1

    },
    decrement:(state)=>{
      state.value>0? state.value-=1:false;
 
     }, 
     keepdetails:(state,action)=>{
      let credents={
        myemail:action.payload.myemail,
        myphone:action.payload.myphone,
        myuid:action.payload.myuid,
      }
      state.credentials=credents;



     },
     clear:(state)=>{
      state.value=0;
     },
     logout:(state)=>{
       state.credentials=[{}];
       state.value=0;
      state.item=[];


     },
     clearcart:(state)=>{
      state.item=[];
     },
      
     removal:(state,action)=>{

      let ids=parseInt(action.payload.propId);
     let names= action.payload.propName

     if(state.item[ids].name==names)
     {
      state.item[ids].amount-1==0?state.item[ids]=false:false;


      state.item[ids].amount>0?state.item[ids].amount-=1:
      state.item=[...state.item.filter((obj)=>obj.amount>0)];

      
      
      
     }
     else{
      false
     }



 
     }, 

     

 

  }
})



export const  {itemsadded,increment,decrement,clear,removal,keepdetails,logout,clearcart} = cartReducer.actions
export default cartReducer.reducer

      // Remeber to filter out all duplicates before using useSelector for this array
      // Remeber to filter out all duplicates before using useSelector for this array
      // Remeber to filter out all duplicates before using useSelector for this array
