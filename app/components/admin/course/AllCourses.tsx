import React, { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import { Box, Button, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";
import { AiFillEdit, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import {
  useDeleteCourseMutation,
  useGetAllCoursesForUsersQuery,
} from "@/redux/features/courses/coursesApi";
import { styles } from "@/app/styles/style";
import { format } from "timeago.js";
import Link from "next/link";

type Props = {};

const AllCourses = (props: Props) => {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState(false);
  const [id, setId] = useState("");
  const { isLoading, data, error, refetch } = useGetAllCoursesForUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [deleteCourse, { isSuccess }] = useDeleteCourseMutation({});

  const colums = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
    },
    {
      field: "title",
      headerName: "Course Title",
      flex: 1,
    },
    {
      field: "ratings",
      headerName: "Ratings",
      flex: 0.5,
    },
    {
      field: "purchased",
      headerName: "Purchased",
      flex: 0.5,
    },
    {
      field: "created_at",
      headerName: "Created_At",
      flex: 0.5,
    },
    {
      field: "  ",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <Link href={`edit-course/${params.row.id}`}>
            <AiFillEdit className="dark:text-white text-black" size={22} />
          </Link>
        );
      },
    },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        const DeleteFunction = () => {
          setId(params.row.id);
          setActive(true);
        };
        return (
          <Button onClick={() => DeleteFunction()}>
            <AiOutlineDelete className="dark:text-white text-black" size={22} />
          </Button>
        );
      },
    },
  ];
  const rows: any = [];

  data?.courses?.forEach((item: any) =>
    rows.push({
      id: item._id,
      title: item.name,
      ratings: item.ratings,
      purchased: item.purchased,
      created_at: format(item.createdAt),
    })
  );
  useEffect(() => {
    if (isSuccess) {
      setActive(false);
      refetch();
      toast.success("course deleted successfully");
    }
  }, [isSuccess]);

  const CourseDeleteById = async () => {
    await deleteCourse(id);
  };

  return (
    <div className="">
      {isLoading ? (
        <Loader />
      ) : (
        <Box>
          <Box
            height="80vh"
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
          {active && (
            <Modal
              open={active}
              onClose={() => !active}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <Box className=" absolute top-[30%] left-[45%]">
                <div className="w-[50vh] min-h-[10vh] dark:bg-black p-2 rounded-lg bg-white">
                  <h1 className="text-center font-Poppins mt-3 text-black dark:text-white font-semibold text-lg">
                    Are your sure you want to delete{" "}
                  </h1>

                  <div className="flex justify-between w-full my-8 px-5">
                    <button
                      onClick={() => setActive(!active)}
                      className={`${styles.button} !w-[80px] !h-[5px] !rounded-xl !text-white`}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => CourseDeleteById()}
                      className={`${styles.button} !w-[80px] !h-[5px] !rounded-xl !bg-red-600  !text-white`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllCourses;
