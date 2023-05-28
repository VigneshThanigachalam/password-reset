import React from "react";
import {
  NavLink,
  Link,
  Navigate,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import { MdOutlineFavorite } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
export const Header = ({ log, setlogout, savedvalue }) => {
  const base_url = process.env.REACT_APP_BASE_URI;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [cookie, removeCookie] = useCookies(["authToken"]);
  function handleLogout() {
    if (log) {
      toast.loading("Please wait", {
        progressClassName: "success-progress-bar",
        toastId: 2,
      });
      const postURL = `${base_url}/auth-user/log-out`;
      fetch(postURL, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: cookie.authToken,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "successfully log-out") {
            removeCookie("authToken");
            setlogout();
            toast.update(2, {
              render: "successfully log-out",
              type: "success",
              hideProgressBar: false,
              autoClose: 1000,
              isLoading: false,
            });
            navigate("/log-in");
          }
        })
        .catch(() => {
          toast.update(2, {
            render: "something went wrong",
            type: "error",
            hideProgressBar: false,
            autoClose: 1000,
            isLoading: false,
          });
        });
    } else {
      navigate("/log-in");
    }
  }
  return (
    <>
      <header className="header-upper py-3">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-7 col-md-5">
              <h2>
                <Link to="/" className="text-white">
                  Auth App
                </Link>
              </h2>
            </div>
            <div className="col-5 col-md-5 col-lg-3">
              <div
                className="header-upper-links d-flex align-items-center justify-content-end">
                {pathname != "/log-in" && (
                  <div>
                    <div
                      onClick={handleLogout}
                      className="d-flex align-items-center gap-10 text-white btn">
                      {log && (
                        <>
                          <img src="/images/user.svg" alt="user"></img>
                          <p className="mb-0 d-none d-md-block">Log out</p>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
