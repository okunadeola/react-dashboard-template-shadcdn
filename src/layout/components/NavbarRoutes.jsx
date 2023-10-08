import { Button } from "../../../components/ui/button";
import usePathname from "../../hooks/usePathname";
import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const NavbarRoutes = () => {
    const pathname = usePathname()

    const isTeacherPage = pathname?.startsWith("/teacher")
    const isStudentPage = pathname?.includes("/chapter")


    return ( 
        <div className="flex gap-x-2 ml-auto">
            {
                isTeacherPage || isStudentPage ? (
                    <Link  to="/">
                        <Button size="sm" variant="ghost">
                            <LogOut className="h-4 w-4 mr-2"/> Exit
                        </Button>
                    
                    </Link>
                ) :

                
                    <Link  to="/teacher/courses">
                        <Button size="sm" variant="ghost">
                         Teacher mode
                        </Button>
                    
                    </Link>
                
            }
        </div>
     );
}
 
export default NavbarRoutes;