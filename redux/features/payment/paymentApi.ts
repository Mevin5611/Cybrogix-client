import { apiSlice } from "../api/apiSlice";

export const paymentApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        sendStripeKey:builder.query({
            query:()=>({
                url:"payment/stripepublishablekey",
                method:"GET",
                credentials:"include" as const
            })
        }),
        cretePayment:builder.query({
            query:(amount)=>({
                url:"payment",
                method:"POST",
                body:{
                    amount
                },
                credentials:"include" as const
            })
        })
    })
})


export const {useCretePaymentQuery,useSendStripeKeyQuery} = paymentApi