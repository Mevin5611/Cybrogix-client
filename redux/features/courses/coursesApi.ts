import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "create-course",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllCoursea: builder.query({
      query: () => ({
        url: "get-all-course",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `delete-course/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    EditCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `edit-course/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllCoursesForUsers: builder.query({
      query: () => ({
        url: "getAll-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getCourseDetails: builder.query({
      query: (id) => ({
        url: `getsingle-course/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getCourseContnet: builder.query({
      query: (id) => ({
        url: `getcourseby-user/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    addNewQuestion: builder.mutation({
      query: ({question, courseId, contentId}) => ({
        url: "addquestion",
        method: "PUT",
        body:{question, courseId, contentId},
        credentials: "include" as const,
      }),
    }),
    addQuestionReplay: builder.mutation({
      query: ({answer, courseId, contentId, questionId}) => ({
        url: "addanswer",
        method: "PUT",
        body:{answer, courseId, contentId, questionId},
        credentials: "include" as const,
      }),
    }),
    addReview: builder.mutation({
      query: ({review, rating,id}) => ({
        url: `add-review/${id}`,
        method: "PUT",
        body:{review, rating},
        credentials: "include" as const,
      }),
    }),
    addReviewReplay: builder.mutation({
      query: ({comment, courseId, reviewId}) => ({
        url:"add-review-replay",
        method: "PUT",
        body:{comment, courseId, reviewId},
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCourseaQuery,
  useDeleteCourseMutation,
  useEditCourseMutation,
  useGetAllCoursesForUsersQuery,
  useGetCourseDetailsQuery,
  useGetCourseContnetQuery,
  useAddNewQuestionMutation,
  useAddQuestionReplayMutation,
  useAddReviewMutation,
  useAddReviewReplayMutation
} = courseApi;
