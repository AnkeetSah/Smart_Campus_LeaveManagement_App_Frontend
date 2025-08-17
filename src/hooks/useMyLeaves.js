// hooks/useMyLeaves.js

import { useQuery } from "@tanstack/react-query";
import { getMyLeaves,getAllStudentLeaves,getLeaveById } from "../services/leaveService"; // <- your service

export const useMyLeaves = (status = "") =>
  useQuery({
    queryKey: ["myLeaves", status], // makes it cache separately for each status
    queryFn: () => getMyLeaves(status), // fetches from backend
    staleTime: 10*60*1000,                      // always fetch fresh (you can tweak this)
    refetchOnWindowFocus: true,   // re-fetch if user switches tab
    keepPreviousData: true
  });


export const useAllStudentLeaves = () =>
  useQuery({
    queryKey: ["allStudentLeaves"],
    queryFn: getAllStudentLeaves,
    staleTime: 0,
    refetchOnWindowFocus: true,
    keepPreviousData: true,
  });

export const useLeaveById=(id)=>{
  return useQuery({
     queryKey:['leave',id],
     queryFn:()=>getLeaveById(id),
     enabled:!!id
  })
}