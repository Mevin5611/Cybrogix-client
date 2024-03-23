import { apiSlice } from "../api/apiSlice";


export const notificationApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getAllNotification:builder.query({
            query:()=>({
                url:"get-all-notifications",
                method:"GET",
                credential:"include" as const
            })
        }),
        updateNotificationStatus:builder.mutation({
            query:(id)=>({
                url:`update-notification/${id}`,
                method:"PUT",
                credential:"include" as const
            }),
        }),
    })
})


export const {useGetAllNotificationQuery,useUpdateNotificationStatusMutation} = notificationApi