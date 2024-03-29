import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        updateAvatar:builder.mutation({
            query:(avatar)=>({
                url:"update-profile",
                method:"PUT",
                body:{avatar},
                credentials:"include" as const
            })
        }),
        updateInfo:builder.mutation({
            query:({name})=>({
                url:"update-info",
                method:"PUT",
                body:{name},
                credentials:"include" as const
            })
        }),
        updatePassword:builder.mutation({
            query:({oldPassword,newPassword})=>({
                url:"update-password",
                method:"PUT",
                body:{oldPassword,newPassword},
                credentials:"include" as const
            })
        }),
        getAllUsers:builder.query({
            query:()=>({
                url:"get-all-users",
                method:"GET",
                credentials:"include" as const
            })
        }),
        updateUserRole:builder.mutation({
            query:(data)=>({
                url:"update-user-role",
                method:"PUT",
                body:data,
                credentials:"include" as const
            })
        }),
        deleteUser:builder.mutation({
            query:(id)=>({
                url:`delete-user/${id}`,
                method:"DELETE",
                credentials:"include" as const
            })
        }),
        uploadCertificate:builder.mutation({
            query:({certificates,course,userId})=>({
                url:`upload-certificate/${userId}`,
                method:"POST",
                body:{certificates,course,userId},
                credentials:"include" as const
            })
        }),
    })
})

export const {useUpdateAvatarMutation,useUpdateInfoMutation,useUpdatePasswordMutation,useGetAllUsersQuery,useUpdateUserRoleMutation,useDeleteUserMutation,useUploadCertificateMutation}= userApi