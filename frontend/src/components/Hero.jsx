import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Hero = () => {
    return (
        <div className="jumbotron text-center" style={{ marginTop: "50px", marginBottom: "50px" }}>
            <h1 className="display-4">Welcome to the Library</h1>
            <p className="lead">Discover a world of knowledge and adventure.</p>
            <a className="btn btn-primary btn-lg" href="#" role="button" style={{ marginTop: "50px", marginBottom: "50px" }}>Explore Now</a>
        </div>
    )
}

export default Hero;