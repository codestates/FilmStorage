/* TODO : 로그인 페이지 만들기. */
import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Loader from "../components/Loader";

axios.defaults.withCredentials = true;

export default function Oauth({ isAuthenticated }) {
  const history = useHistory();
  const url = new URL(window.location.href);
  const authorizationCode = url.searchParams.get("code");

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/users/oauth?code=${authorizationCode}`, {})
      .then((res) => {
        isAuthenticated();
        history.push("/");
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Loader />
    </>
  );
}
