"use client";
import React, { FC, useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import { Box, Button, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";
import { AiFillEdit, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md";
import { GrCertificate } from "react-icons/gr";
import { RxCross1 } from "react-icons/rx";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useUploadCertificateMutation,
} from "@/redux/features/user/userApi";
import { styles } from "@/app/styles/style";
import { format } from "timeago.js";
import Link from "next/link";

type Props = {
  isTeam: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState(false);
  const [addteam, setAddTeam] = useState(false);
  const [id, setId] = React.useState("");
  const [course, setCourse] = React.useState("");
  const [certificate, setcCertificate] = useState();
  const [draging, setDraging] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { isLoading, data, error, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  console.log(id);

  const [updateUserRole, { isSuccess: success, error: err }] =
    useUpdateUserRoleMutation();
  const [deleteUser, { isSuccess }] = useDeleteUserMutation({});
  const [uploadCertificate, { isSuccess: certifySuccess }] =
    useUploadCertificateMutation();
  const [updateRole, setUpdateRole] = React.useState({
    email: "",
    role: "",
  });

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
    {
      field: "courses",
      headerName: "Purchased",
      flex: 0.1,
    },
    {
      field: "created_at",
      headerName: "Created_At",
      flex: 0.5,
    },
    {
      field: "mail",
      headerName: "Email",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <Link href={`mailto:${params.row.email}`}>
            <MdOutlineEmail className="dark:text-white text-black" size={22} />
          </Link>
        );
      },
    },
    {
      field: "certificate",
      headerName: "Certificate",
      flex: 0.2,
      renderCell: (params: any) => {
        const certify = () => {
          setId(params.row.id);
          setModalOpen(true);
        };
        return (
          <div onClick={() => certify()}>
            <GrCertificate size={22} />
          </div>
        );
      },
    },
    !isTeam && {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        const DeleteFunction = () => {
          setId(params.row.id);
          setActive(true);
        };
        return (
          <Button onClick={() => DeleteFunction()} >
            <AiOutlineDelete className="dark:text-white text-black" size={22} />
          </Button>
        );
      },
    },
  ];
  const rows: any = [];
  if (isTeam) {
    const newData =
      data && data.users.filter((item: any) => item.role === "admin");

    newData &&
      newData.forEach((item: any) =>
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        })
      );
  } else {
    data?.users?.forEach((item: any) =>
      rows.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
        courses: item.courses.length,
        created_at: format(item.createdAt),
      })
    );
  }
  const UpdateRole = async () => {
    if (updateRole.email === "") {
      toast.error("Please drop the email ");
    } else if (updateRole.role === "") {
      toast.error("Please select the role ");
    } else {
      await updateUserRole(updateRole);
      if (success) {
        refetch();
        toast.success("User role is Changed");
        setAddTeam(false);
      }
    }
  };
  useEffect(() => {
    if (isSuccess) {
      setActive(false);
      refetch();
      toast.success("User deleted successfully");
    }
    if (certifySuccess) {
      setModalOpen(false)
      refetch();
      toast.success("certificate upload successfully");
      setcCertificate('')
      setCourse('')
    }
  }, [isSuccess,certifySuccess]);

  const DeleteUserByID = async () => {
    await deleteUser(id);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setcCertificate(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async() => {
    /* console.log({ certificates: certificate, course, userId: id }); */

    await uploadCertificate({certificates:certificate,course,userId:id})
  };

  return (
    <div className="p-10">
      {isLoading ? (
        <Loader />
      ) : (
        <Box  >
          {isTeam && (
            <div className="flex justify-end mb-3 mt-3">
              <div>
                <button
                  onClick={() => setAddTeam(!addteam)}
                  className="bg-blue-500 dark:bg-black dark:border text-white font-bold rounded-full w-[180px] h-10"
                >
                  Add Member
                </button>
              </div>
            </div>
          )}

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
            <DataGrid checkboxSelection rows={rows} columns={columns}  />
          </Box>
          {active && (
            <Modal
              open={active}
              onClose={() => !active}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <Box className=" absolute top-[30%] left-[50%]">
                <div className="w-[50vh] min-h-[10vh] bg-white dark:bg-[#000] p-2 rounded-md">
                  <h1 className="text-center font-Poppins mt-3 text-black dark:text-white">
                    Are your sure you want to delete ?{" "}
                  </h1>

                  <div className="flex justify-between w-full my-8 px-5">
                    <button
                      onClick={() => setActive(!active)}
                      className={`${styles.button} !w-[80px] !h-[10px] !rounded-md !bg-sky-200 !text-black`}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => DeleteUserByID()}
                      className={`${styles.button} !w-[80px] !h-[10px] !rounded-md !bg-red-500 text-white`}
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
      {addteam && (
        <Modal
          open={addteam}
          onClose={() => !addteam}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box className=" absolute top-[30%] left-[45%]">
            <div className="w-[60vh] min-h-[15vh] bg-white rounded-lg p-4 dark:bg-black">
              <h1 className="text-center font-Poppins font-semibold ">
                Role Update
              </h1>
              <input
                type="email"
                onChange={(e) =>
                  setUpdateRole({ ...updateRole, email: e.target.value })
                }
                placeholder="Pleas drop the email"
                className={`${styles.input}`}
              />
              <select
                onChange={(e) =>
                  setUpdateRole({ ...updateRole, role: e.target.value })
                }
                className={`${styles.input}`}
              >
                <option className="bg-[#ffffff] dark:bg-black" value="Choose">
                  Choose
                </option>
                <option className="bg-[#ffffff] dark:bg-black" value="admin">
                  admin
                </option>
                <option className="bg-[#ffffff] dark:bg-black" value="user">
                  user
                </option>
              </select>

              <div className="flex justify-between w-full mt-3 mb-5">
                <button
                  onClick={() => setAddTeam(!addteam)}
                  className={`${styles.button} !w-[80px] !h-[10px] !rounded-md !bg-blue-200 !text-black`}
                >
                  Cancel
                </button>
                <button
                  onClick={() => UpdateRole()}
                  className={`${styles.button} !w-[80px] !h-[10px]  !bg-green-500 text-white rounded-md`}
                >
                  Update
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      )}

      {modalOpen && (
        <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center  bg-[#000000] w-full h-full bg-opacity-55 ">
          <div className="w-[1000px] h-[500px] bg-[#202020]  rounded-md">
          <div className="w-full flex justify-end pt-3 pr-3">
            <RxCross1 size={25} onClick={()=> setModalOpen(false)} />
            </div>
            <div className=" w-full h-full flex justify-center items-center">

          <div className="w-[800px]  ">
          
            <div>
              <label htmlFor="">Course Name</label>

              <input
                type="name"
                name=""
                required
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                id="name"
                placeholder="MERN stack lms platforms with next 13  "
                className={styles.input}
              />
            </div>
            <br />
            <input
              type="file"
              accept="image/*"
              id="file"
              className="hidden"
              onChange={handleFileChange}
              
            />
            <label
              htmlFor="file"
              className={`w-full min-h-[15vh] dark:border-white border-[#00000060] p-3 border flex items-center justify-center ${
                draging ? "bg-blue-500" : "bg-transparent"
              }`}
            >
              {certificate ? (
                <img
                  src={certificate}
                  alt=""
                  className="max-h-full w-full object-cover"
                />
              ) : (
                <span className="text-black dark:text-white">
                  Drag and drop your certificate here or click to browse
                </span>
              )}
            </label>
            <br />
            <div className="w-full flex items-center justify-end">
              <button
                onClick={() => handleSubmit()}
                className={`${styles.button} !w-[250px]`}
              >
                Submit
              </button>
            </div>
          </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
