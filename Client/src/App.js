import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/NavBar/Navbar";
import Home from "./Components/Home/Home";
import Footer from "./Components/Footer/Footer";
import Services from "./Components/Services/Services";
import Contact from "./Components/Contact/Contact";
import Pets from "./Components/Pets/Pets";
import AdoptForm from "./Components/AdoptForm/AdoptForm";
import Donate from "./Components/Donate/Donate";
import EventsCalendar from "./Components/EventsCalendar/EventsCalendar";
import AdminEvents from "./Components/AdminPanel/AdminEvents";
import AdminStories from "./Components/AdminPanel/AdminStories";
import Blog from './Components/Blog/Blog'; 
import AdminLogin from "./Components/AdminPanel/AdminLogin";
import Guideline from "./Components/Guideline/Guideline";
import "./App.css";
import Vet from "./Components/Vet/Vet";

const Layout = ({ children }) => (
  <>
    <Navbar title="CuPet" />
    <main>{children}</main>
    <Footer title="CuPet" />
  </>
);

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <Layout>
              <Home description="Ensure you are fully prepared to provide proper care and attention to your pet before welcoming them into your home." />
            </Layout>
          }
        />
        <Route
          path="/services"
          element={
            <Layout>
              <Services />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />
        <Route
          path="/pets"
          element={
            <Layout>
              <Pets />
            </Layout>
          }
        />
        <Route
          path="/adopt-form"
          element={
            <Layout>
              <AdoptForm />
            </Layout>
          }
        />
        <Route
          path="/donate"
          element={
            <Layout>
              <Donate />
            </Layout>
          }
        />
        <Route
          path="/events-calendar"
          element={
            <Layout>
              <EventsCalendar />
            </Layout>
          }
        />
        <Route
          path="/blog"
          element={
            <Layout>
              <Blog />
            </Layout>
          }
        />
        <Route
            path="/guideline"
            element={
                <Layout>
                    <Guideline />
                </Layout>
                }
        />
        <Route
            path="/vet"
            element={
                <Layout>
                    <Vet />
                </Layout>
                }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <Layout>
              <AdminLogin />
            </Layout>
          }
        />
        <Route
          path="/admin/events"
          element={
            <Layout>
              <AdminEvents />
            </Layout>
          }
        />
        <Route
          path="/admin/stories"
          element={
            <Layout>
              <AdminStories />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
