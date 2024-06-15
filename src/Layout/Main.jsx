import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import { Flip, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const Main = () => {
  return (
    <>
      <div className="dark:bg-slate-800 font-poppins">
        <Navbar></Navbar>
        <div className="max-w-screen-2xl mx-auto">
          <Outlet></Outlet>
        </div>
        <Footer></Footer>

      </div>
      <ToastContainer
          transition={Flip}
          position="top-center"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        ></ToastContainer>
    </>
  );
};

export default Main;
