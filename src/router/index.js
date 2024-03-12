import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AdminLogin from "@/views/AdminLogin.vue";
import StudentLogin from "@/views/StudentLogin.vue";
import StudentRegistration from "@/views/StudentRegistration.vue";
import AdminDashboard from "@/components/Admin/AdminDashboard.vue";
import StudentDashboard from "@/components/Student/StudentDashboard.vue";
import StudentRequest from "@/components/Student/StudentRequest.vue";
import RequestArchive from "@/components/Admin/RequestArchive.vue";
import StudentProfile from "@/components/Student/StudentProfile.vue";
import Contact from "@/components/Student/Contact.vue";
import NewLRN from "@/components/Admin/NewLRN.vue";
import AdminProfile from "@/components/Admin/AdminProfile.vue";
import AccountManagement from "@/components/Admin/AccountManagement.vue";
import ViewUsers from "@/components/UserManagement/ViewUsers.vue";
import AdminSettings from "@/components/UserManagement/AdminSettings.vue";
import RegistrarLogin from "@/views/RegistrarLogin.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
    },
    {
      path: "/contact",
      name: "contact",
      component: Contact,
    },
    {
      path: "/admin_login",
      name: "adminlogin",
      component: AdminLogin,
    },
    {
      path: "/registrar-login",
      name: "registrarlogin",
      component: RegistrarLogin,
    },
    {
      path: "/account-management",
      redirect: "/account-management/view",
      name: "accountmanagement",
      component: AccountManagement,
      children: [
        {
          path: "view",
          name: "viewusers",
          component: ViewUsers,
        },
        {
          path: "settings",
          name: "adminsettings",
          component: AdminSettings,
        },
      ],
    },
    {
      path: "/student_login",
      name: "studentlogin",
      component: StudentLogin,
    },

    {
      path: "/student_registration",
      name: "studentregister",
      component: StudentRegistration,
    },
    {
      path: "/admin_dashboard",
      name: "admin-dashboard",
      component: AdminDashboard,
    },

    {
      path: "/student_dashboard",
      name: "student-dashboard",
      component: StudentDashboard,
    },
    {
      path: "/student_request",
      name: "student-request",
      component: StudentRequest,
    },
    {
      path: "/student_profile",
      name: "studentprofile",
      component: StudentProfile,
    },

    {
      path: "/archive",
      name: "archive",
      component: RequestArchive,
    },
    {
      path: "/lrn",
      name: "lrn",
      component: NewLRN,
    },
  ],
});

export default router;
