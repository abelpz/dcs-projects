import Router from "next/router";
import { useEffect } from "react"
import { useSelector } from "react-redux"

export function useAuthSession() {
  const {user} = useSelector(state => state.auth)
  useEffect(() => {
    if (!user) Router.push("/login");
  }, [user]);
  return user;
}