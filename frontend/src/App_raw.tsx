import { Link, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Page1 from "./Page/Page1/Page1.index";

import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import NotFound from "./Component/ReusableComponent/NotFound";
// update base template here
function App() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <div className='main-container'>
                <ToastContainer
                    position='top-right'
                    autoClose={3000}
                    limit={3}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <div className='main-container__header'>
                    <span>This is header template, change this item</span>
                    <Link to={"/"}> Home </Link>
                    <Link to={"/page1"}> Page 1 </Link>
                    <Link to={"/404"}> 404 </Link>
                </div>
                <div className='main-container__body'>
                    <Routes>
                        <Route path='/' element={<div>Home</div>} />
                        <Route path='/page1' element={<Page1 />} />
                        <Route path='/*' element={<NotFound />} />
                    </Routes>
                </div>
            </div>
        </QueryClientProvider>
    );
}

export default App;
