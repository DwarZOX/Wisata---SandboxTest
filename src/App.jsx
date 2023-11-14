import { SWRConfig } from "swr";
import Footer from "@app/components/Footer";
import Login from "@app/components/modals/Login";
import Navbar from "@app/components/Navbar";
import { useStateContext } from "@app/context/StateContext";
import Unauthenticated from "@app/routes/Unauthenticated";
import { BrowserRouter } from "react-router-dom";
import { request } from "@app/utils/request";
import { Toaster } from "react-hot-toast";

function App() {
  const { modalLogin } = useStateContext();
  return (
    <BrowserRouter>
      <div className="relative bg-[#FAFBFD]">
    <SWRConfig
            value={{
              fetcher: (resource, init) =>
                request(resource, init).then(res => res.data),
            }}
          >
        <Navbar />
        <Unauthenticated />
        <Footer />
        {modalLogin && (
          <div className="fixed z-50 flex justify-center items-center top-0 bg-[#000000]/70 w-full h-screen m-auto">
            <Login />
          </div>
        )}
      </SWRConfig></div>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
