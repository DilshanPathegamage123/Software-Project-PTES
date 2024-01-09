import React , {useState} from 'react'
import {Link} from 'react-router-dom'
import "./NavBar1.css"
const NavBar1 = () => {

  const[menuOpen, setMenuOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
     <div className='Navigation'>
        <nav className='NavBar'>
        
            <ul className={menuOpen ? "open" : ""}>
                <li className='NavItem'>
                    <Link to={"/"}><img className='Logo' src="/logo.png" alt="Logo" /></Link>
                </li>
                <li className='NavItem'>
                   <Link to={"/"}><img className='BrandName' src="/Name.png" alt="BrandName" /></Link> 
                </li>

                <div className='Menu' onClick={( ) => {setMenuOpen(!menuOpen)}}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <li className='VehicleType'>
                <div className="dropdown">
  <a className="btn  dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    Vehicle Type
  </a>

  <ul className="dropdown-menu"> 
    <li><a className="dropdown-item" href="#">Train</a></li>
    <li><a className="dropdown-item" href="#">Bus</a></li>
  </ul>
</div>
                </li> 
            <li className='NavItem'><Link className='NavButton1' to={"/SignIn"}>Sign Up</Link></li>
                <li className='NavItem'> <Link className='NavButton2' to={"/SignUp"}>Sign In</Link></li>
            </ul>
        </nav>
      
    </div> 
  )
}

export default NavBar1
