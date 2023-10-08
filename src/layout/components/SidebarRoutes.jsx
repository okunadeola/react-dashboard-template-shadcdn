import { BarChart, Compass, ContainerIcon, Image, Layout, List } from "lucide-react";
import SidebarItem from "./SidebarItem";
import usePathname from "../../hooks/usePathname";

const guestRoutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/"
    },
    {
        icon: Compass,
        label: "Browse",
        href: "/search"
    },
    {
        icon: Image,
        label: "Cloud",
        href: "/cloud"
    },
    {
        icon: ContainerIcon,
        label: "Payment",
        href: "/payment"
    },
]


const teacherRoutes = [
    {
        icon: List,
        label: "Courses",
        href: "/teacher/courses"
    },
    {
        icon: BarChart,
        label: "Analytics",
        href: "/teacher/analytics"
    },
]





const SidebarRoutes = () => {
    const pathname = usePathname()

    const isTeacherPage = pathname?.includes("/teacher")
    const routes = isTeacherPage ? teacherRoutes : guestRoutes;
    
    return ( 
        <div className="flex flex-col w-full">
            {
                routes.map((route)=>(
                    <SidebarItem
                        key={route.href}
                        href={route.href}
                        icon={route.icon}
                        label={route.label}
                    />
                ))
            }
        </div>
     );
}
 
export default SidebarRoutes;