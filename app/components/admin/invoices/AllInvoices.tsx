import React, { useEffect, useState,FC } from "react";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useTheme } from "next-themes";
import Loader from "../../Loader/Loader";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { useGetAllCourseaQuery } from "@/redux/features/courses/coursesApi";

import { AiOutlineMail } from "react-icons/ai";
import { useGetAllOrdersQuery } from "@/redux/features/orders/ordersApi";


type Props = {
  isDashBoard?: boolean;
};

const AllInvoices:FC<Props> = ({isDashBoard}) => {

  const { theme ,setTheme } = useTheme();
  const { data,isLoading } = useGetAllOrdersQuery({});
  const { data: courseData } = useGetAllCourseaQuery({});
  const { data:userData } = useGetAllUsersQuery({});
  const [orderData, setOrderData] = useState<any>([]);



  useEffect(() => {
    if (data) {
      const temp = data.orders.map((item: any) => {
        const user = userData?.users?.find(
          (user: any) => user._id === item.userId
          
        );
        

        const course = courseData?.courses.find(
          (course: any) => course._id === item.courseId
        );
        
        

        return {
          ...item,
          userName: user?.name,
          userEmail: user?.email,
          title: course?.name,
          price: "$" + course?.price,
        };
      });
      setOrderData(temp);
      
    }
  }, [data, userData, courseData]);

 

  console.log(orderData);
  
  

  const colums = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.2,
    },
    {
      field: "userName",
      headerName: "Name",
      flex: 0.3,
    },
    {
      field: "title",
      headerName: "Title",
      flex: 0.7,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.2,
    },
    {
      field: "joinAt",
      headerName: "Join At",
      flex: 0.3,
    },

    {
      field: "Mail",
      headerName: "Mail",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <a href={` mailto:${params.row.email}`}>
            <AiOutlineMail className="dark:text-white text-black" size={22} />
          </a>
        );
      },
    },
  ];
  const rows = [
    
  ];

  {
    orderData && orderData.forEach((item:any)=>{
        rows.push({
            id: item._id,
      userName: item.userName,
      userEmail: item.userEmail,
      title: item.title,
      price: item.price,
      joinAt: item.createdAt
        })
    })
  }
  
 

  return <div>

{/* {
        isLoading? <Loader/>: */}
        <Box>
        <Box
          height={isDashBoard? '40vh':'80vh'}
          width={isDashBoard? '48vh':'100%'}
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              outline: "none",
            },
            "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
              color: theme === "dark" ? "#fff" : "#000",
            },
            "& .MuiDataGrid-sortIcon": {
              color: theme === "dark" ? "#fff" : "#000",
            },
            "& .MuiDataGrid-row": {
              color: theme === "dark" ? "#fff" : "#000",
              borderBottom:
                theme === "dark"
                  ? "1px solid #ffffff30 !important"
                  : "1px solid #ccc !important",
            },
            "& .MuiTablePagination-root": {
              color: theme === "dark" ? "#fff" : "#000",
            },

            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "&.name-column--cell": {
              color: theme === "dark" ? "#fff" : "#000",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              borderBottom: "none",
              color: theme === "dark" ? "#fff" : "#000",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
            },

            "& .MuiDataGrid-footerContainer": {
              color: theme === "dark" ? "#fff" : "#000",
              borderTop: "none",
              backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
            },
            "& .MuiCheckbox-root": {
              color:
                theme === "dark" ? `#b7ebde !important` : `#000 !important`,
            },
            "& .MuiCheckbox-toolbarContainer .MuiButton-text": {
              color: `#000 !important`,
            },
          }}
        >
          <DataGrid checkboxSelection rows={rows} columns={colums} />
        </Box>
     
      </Box>
  {/*   } */}
  </div>;
};

export default AllInvoices;