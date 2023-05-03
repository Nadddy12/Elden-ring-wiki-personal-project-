import { Home } from "../pages/home/Home.js";
import { Dashboard } from "../pages/dashboard/Dashboard.js";
import { Blog } from "../pages/blog/Blog.js";
import { OneBlog } from "../pages/blog/OneBlog.js";
import { Guide } from "../pages/guide/Guide.js";
import { Equipment } from "../pages/equipment/Equipment.js";
import { OneEquipment } from "../pages/equipment/OneEquipment.js";
import { Spell } from "../pages/spell/Spell.js";
import { OneSpell } from "../pages/spell/OneSpell.js";
import { Characters } from "../pages/character/Character.js";
import { Builder } from "../pages/builder/Builder.js";
import {ControlPanel} from "../pages/panel/controlPanel.js";

import { CreateBlog } from "../pages/admin/CreateBlog.js";
import { CreateGuide } from "../pages/admin/CreateGuide.js";
import { CreateEquipment } from "../pages/admin/CreateEquipment.js";
import { CreateSpell } from "../pages/admin/CreateSpell.js";
import { Users } from "../pages/admin/users.js";

import { Signup } from "../components/auth/Signup.js";
import { Login } from "../components/auth/Login.js";
import { Logout } from "../components/auth/Logout.js";


export const PublicRoutes = [
    { path:"/" , element: <Home/>},
    { path:"/signup" , element: <Signup/>},
    { path:"/login" , element: <Login/>},
    { path:"/logout" , element: <Logout/>},
    { path:"/blog" , element: <Blog />},
    { path:"/guide" , element: <Guide />},
    { path:"/equipment" , element: <Equipment/>},
    { path:"/equipment/:id" , element: <OneEquipment/>},
    { path:"/spell" , element: <Spell/>},
    { path:"/spell/:id" , element: <OneSpell/>},
    { path:"/article/:id" , element: <OneBlog/>},
    { path:"/builder" , element: <Builder/>},
    
];

export const UserRoutes = [
    { path:"/dashboard" , element: <Dashboard/> },
    { path:"/character" , element: <Characters/>},
    
];

export const ModRoutes = [
    { path:"/create-blog" , element: <CreateBlog/>},
    { path:"/control-panel" , element: <ControlPanel/> },
];

export const AdminRoutes = [
    { path:"/control-panel" , element: <ControlPanel/> },
    { path:"/create-Guide" , element: <CreateGuide/>},
    { path:"/create-Equipment" , element: <CreateEquipment/>},
    { path:"/create-Spell" , element: <CreateSpell/>},
    { path:"/users" , element: <Users/>}
];