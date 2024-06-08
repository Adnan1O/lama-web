
import SideBar from "./SideBar";
import Topbar from "./Topbar/Topbar";
import "./layout.css"
const ProjectLayout = ({ children, params }) => {
  return (
    <div>
        <body className="layout">   
            <SideBar params={params}/>  
            <div className="content-area-container">
              <Topbar/>
                 {children}
              </div>  
     
        </body>         

    </div>
  );
};

export default ProjectLayout;
