import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';



export default function TopMenu() {
    return (
        <Nav className="justify-content-center">
            <Nav.Item>
                <Link className="nav-link" to="/termini">Termini</Link>
            </Nav.Item>
            <Nav.Item>
                 <Link className="nav-link" to="/rezervacije">Moje rezervacije</Link>
            </Nav.Item>
            <Nav.Item>
                 <Link className="nav-link" to="/nalog">Moj nalog</Link>
            </Nav.Item>
            <Nav.Item>
                <Link className="nav-link" to="/">Odjava</Link>
            </Nav.Item>
        </Nav>
    
    );
}

       