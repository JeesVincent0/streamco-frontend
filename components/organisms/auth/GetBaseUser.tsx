"use client";

import { useFetchBaseUserQuery } from "@/lib/service";
import { setCredentials } from "@/lib/slice/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const GetBaseUser = () => {
  const { data, isLoading } = useFetchBaseUserQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      console.log("Data: ", data);
      dispatch(setCredentials({ user: data.user, role: data.role }));
    }
  }, [data, isLoading, dispatch]);
  return null;
};

export default GetBaseUser;
