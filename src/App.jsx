// src/App.jsx
import React, { Suspense, useEffect, useRef } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  useNavigationType,
} from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./admin-theme.css";
import "./styles.css";


import Hero from "./hero";
import Footer from "./Footer";
import TemplateDetail from "./TemplateDetail";
import DashboardLayout from "./DashboardLayout";
import Scroll from "./Scroll";


// lazy
const Messages = React.lazy(() => import("./components/Messages"));
const Message = React.lazy(() => import("./Message")); // Public Header
const FeaturedServices = React.lazy(() => import("./FeaturedServices"));
const AboutSection = React.lazy(() => import("./AboutSection"));
const ServicesSection = React.lazy(() => import("./ServicesSection"));
const Contact = React.lazy(() => import("./Contact"));
const Login = React.lazy(() => import("./login"));
const Register = React.lazy(() => import("./register"));
const CVForm = React.lazy(() => import("./CVForm"));
const Page2 = React.lazy(() => import("./Page2"));
const Page3 = React.lazy(() => import("./Page3"));
const CVTemplates = React.lazy(() => import("./CVTemplates"));
const ResetPassword = React.lazy(() => import("./ResetPassword"));


const Dashboard = React.lazy(() => import("./Dashboard"));
const ManageTemplates = React.lazy(() => import("./ManageTemplates"));
const ManageUsers = React.lazy(() => import("./ManageUsers"));
const ManageCv = React.lazy(() => import("./ManageCV"));
const AllTemplates = React.lazy(() => import("./AllTemplates"));
const CreateTemplate = React.lazy(() => import("./CreateTemplate"));

const TemplateDetailD = React.lazy(() => import("./templateDetailD"));
const VerifyToken = React.lazy(() => import("./VerifyToken"));
const PreviewTemplatePage = React.lazy(() =>
  import("./pages/PreviewTemplatePage")
);
const ProtectedAdminRoute = React.lazy(() =>
  import("./ProtectedAdminRoute")
);
const ProfilePage = React.lazy(() => import("./ProfilePage"));

function NotFound() {
  return <div style={{ padding: 24 }}>Page not found</div>;
}

/* ================= ADMIN BACK GUARD ================= */
function AdminBackGuard() {
  const location = useLocation();
  const navigate = useNavigate();
  const navType = useNavigationType();
  const lastAdminRef = useRef(
    sessionStorage.getItem("lastAdminPath") || "/Dashboard"
  );
  const didInit = useRef(false);

  const ADMIN_PATHS = [
    "/Dashboard",
    "/managetemplates",
    "/create-template",
    "/all-templates",
    "/manageusers",
    "/manageCv",
    "/dashboard/messages",
  ];

  const isAdminPath = (path) => ADMIN_PATHS.includes(path);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const role = localStorage.getItem("role");
    const isAdmin = isAuthenticated && role === "admin";
    const inAdmin = isAdminPath(location.pathname);

    if (isAdmin && inAdmin) {
      lastAdminRef.current = location.pathname;
      sessionStorage.setItem("lastAdminPath", location.pathname);
    }

    if (!didInit.current) {
      didInit.current = true;
      return;
    }

    if (isAdmin && navType === "POP" && !inAdmin) {
      navigate(lastAdminRef.current || "/Dashboard", { replace: true });
    }
  }, [location.pathname, navType, navigate]);

  return null;
}

/* ================= APP ================= */
export default function App() {
  const location = useLocation();

  const isAdminRoute =
    location.pathname.startsWith("/admin") || 
  location.pathname.startsWith("/Dashboard") ||
  location.pathname.startsWith("/dashboard") ||
  location.pathname.startsWith("/manage") ||
  location.pathname.startsWith("/create-template") ||
  location.pathname.startsWith("/all-templates");


  const isPreviewRoute = location.pathname.startsWith("/preview/");

  /* ================= HEADER OFFSET FIX ================= */
  useEffect(() => {
    const isPublic = !isAdminRoute && !isPreviewRoute;

    document.body.classList.toggle("is-public", isPublic);
    document.body.classList.toggle("is-admin", isAdminRoute);
    document.body.classList.toggle("is-preview", isPreviewRoute);

    
    const setOffset = () => {
      if (!isPublic) {
        document.documentElement.style.setProperty(
          "--header-offset",
          "0px"
        );
        return;
      }

      const header = document.getElementById("header");
      const height = header
        ? header.getBoundingClientRect().height
        : 0;

      document.documentElement.style.setProperty(
        "--header-offset",
        `${height}px`
      );
    };
     

    setOffset();
    window.addEventListener("resize", setOffset);

    return () => {
      window.removeEventListener("resize", setOffset);
      document.body.classList.remove(
        "is-public",
        "is-admin",
        "is-preview"
      );
    };
  }, [isAdminRoute, isPreviewRoute]);

  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Loading…</div>}>
      <AdminBackGuard />

      {/* Public Header */}
      {!isAdminRoute && !isPreviewRoute && <Message />}
      {!isAdminRoute && !isPreviewRoute && <Scroll/>}

      

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Suspense fallback={null}>
                <FeaturedServices />
                <AboutSection />
                <ServicesSection />
                <Contact />
              </Suspense>
              <Footer />
            </>
          }
        />

        {/* auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-token" element={<VerifyToken />} />

        {/* profile */}
        <Route path="/profile" element={<ProfilePage />} />

        {/* editor */}
        <Route path="/cvform/:cvId" element={<CVForm />} />
        <Route path="/CvForm" element={<CVForm />} />

        {/* wizard */}
        <Route path="/Page2/:cvId" element={<Page2 />} />
        <Route path="/Page3/:cvId" element={<Page3 />} />

        {/* templates */}
        <Route path="/cvtemplates" element={<CVTemplates />} />

        {/* template pages */}
        <Route path="/template/:id" element={<TemplateDetailD />} />
        <Route path="/admin/template/:id" element={<TemplateDetail />} />
        <Route path="/preview/:id" element={<PreviewTemplatePage />} />
        <Route path="/reset-password" element={<ResetPassword />} />


        {/* ADMIN */}
        <Route
          path="/Dashboard"
          element={
            <ProtectedAdminRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/managetemplates"
          element={
            <ProtectedAdminRoute>
              <DashboardLayout>
                <ManageTemplates />
              </DashboardLayout>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/create-template"
          element={
            <ProtectedAdminRoute>
              <DashboardLayout>
                <CreateTemplate />
              </DashboardLayout>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/all-templates"
          element={
            <ProtectedAdminRoute>
              <DashboardLayout>
                <AllTemplates />
              </DashboardLayout>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/manageusers"
          element={
            <ProtectedAdminRoute>
              <DashboardLayout>
                <ManageUsers />
              </DashboardLayout>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/manageCv"
          element={
            <ProtectedAdminRoute>
              <DashboardLayout>
                <ManageCv />
              </DashboardLayout>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/dashboard/messages"
          element={
            <ProtectedAdminRoute>
              <DashboardLayout>
                <Messages />
              </DashboardLayout>
            </ProtectedAdminRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
