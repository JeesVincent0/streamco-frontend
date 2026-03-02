"use client";

import { useFetchBaseUserQuery } from "@/lib/service";
import { setCredentials } from "@/lib/slice/authSlice";
import { RootState } from "@/lib/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const GetBaseUser = () => {
  const { data, isLoading } = useFetchBaseUserQuery();
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      dispatch(setCredentials({ user: data.data.user, role: data.data.role }));
    }
  }, [data, isLoading, user, dispatch]);
  return null;
};

export default GetBaseUser;
