function Navigation({home,about,menu}){

return(
    <nav>
        <ul className="nav-container">
            <li><a href="#home">{home}</a></li>
            <li><a href="#about">{about}</a></li>
            <li><a href="#contact">{menu}</a></li>
        </ul>
    </nav>
);

}

export default Navigation