import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Container } from "../components/Container";
import { MetaData } from "../components/MetaData";
import { CgArrowRight } from "react-icons/cg";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";



export const Home = () => {
  const navigate = useNavigate();
  const base_url = process.env.REACT_APP_BASE_URI;
  const [cookie, setCookie] = useCookies(["authToken"]);
  const CategorySchema = Yup.object().shape({
    url: Yup.string().required("Please paste the url")
  });

  return (
    <>
      <MetaData title="Home" />
      <Container class1={"cart-wrapper home-wrapper-2"}>
        <div className="row my-5 flex-wrap-reverse justify-content-center">
          <div className="col-8 my-5 pt-4">
            <div className="auth-card mx-auto">
              <h3 className="text-center">Successfully Logged In</h3>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};
