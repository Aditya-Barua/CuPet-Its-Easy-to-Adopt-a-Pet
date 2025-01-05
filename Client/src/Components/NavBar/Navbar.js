import React from "react";
import { Link } from "react-router-dom";
import logo from "./images/icon.jpg";

const Navbar = (props) => {
	return (
		<div className="navbar-container">
			<div>
				<Link className="logo-container" to="/">
					<img className="navbar-logo" src={logo} alt="CuPet Logo" />
					<p>{props.title}</p>
				</Link>
			</div>
			<div>
				<ul className="navbar-links">
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/services">Services</Link>
					</li>
					<li>
						<Link to="/pets">Pets</Link>
					</li>
					<li>
						<Link to="/contact">Contact Us</Link>
					</li>
					<li>
						<Link to="/donate">Donate</Link>
					</li>
					<li>
						<Link to="/blog">Blog</Link>
					</li>
					<li>
						<Link to="/guideline">Guideline</Link>
					</li>
					<li>
						<Link to="/vet">Vet</Link>
					</li>
				</ul>
			</div>
			<div>
				<Link to="/services">
					<button className="Navbar-button">Give a Pet</button>
				</Link>
			</div>
		</div>
	);
};

export default Navbar;
