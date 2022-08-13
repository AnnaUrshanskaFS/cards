import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer";
import Home from "./components/home";
import DeleteCard from "./components/deleteCard";
import Navbar from "./components/navbar";
import About from "./components/about";
import SignUp from "./components/signUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./components/signIn";
import SignUpBiz from "./components/bizSignUp";
import Logout from "./components/logout";
import CreateCard from "./components/createCard";
import EditCard from "./components/editCard";
import MyCards from "./components/myCards";
import ProtectedRoute from "./components/common/protectedRoute";
function App() {
  return (
    <div className="app d-flex flex-column min-vh-100">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <header className="">
        <Navbar />
      </header>
      <main className="flex-fill container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route
            path="my-cards"
            element={
              <ProtectedRoute onlyBiz>
                <MyCards />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-cards/delete/:id"
            element={
              <ProtectedRoute onlyBiz>
                <DeleteCard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-cards/edit/:id"
            element={
              <ProtectedRoute onlyBiz>
                <EditCard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-cards"
            element={
              <ProtectedRoute onlyBiz>
                <MyCards />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-cards/create-card"
            element={
              <ProtectedRoute onlyBiz>
                <CreateCard />
              </ProtectedRoute>
            }
          />

          <Route
            path="signupBiz"
            element={<SignUpBiz redirect="my-cards/create-card" />}
          />
          <Route path="signup" element={<SignUp redirect="/signin" />} />
          <Route path="signin" element={<SignIn redirect="/" />} />
          <Route path="signout" element={<Logout redirect="/" />} />
        </Routes>
      </main>
      <footer className="">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
