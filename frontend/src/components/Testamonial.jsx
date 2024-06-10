import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Testamonial = () => {
    return (
        <div className="container my-5">
            <h2 className="text-center" style={{ marginTop: "100px", marginBottom: "50px" }}>Testimonials</h2>
            <div className="row">
                <div className="col-md-4">
                    <blockquote className="blockquote text-center">
                        <p className="mb-0">A wonderful library with a fantastic selection of books.</p>
                        <footer className="blockquote-footer" style={{ marginTop: "5px" }}>John Doe</footer>
                    </blockquote>
                </div>
                <div className="col-md-4">
                    <blockquote className="blockquote text-center">
                        <p className="mb-0">A great place to find rare and unique books.</p>
                        <footer className="blockquote-footer" style={{ marginTop: "5px" }}>Jane Smith</footer>
                    </blockquote>
                </div>
                <div className="col-md-4">
                    <blockquote className="blockquote text-center">
                        <p className="mb-0">A library that truly cares about its readers.</p>
                        <footer className="blockquote-footer" style={{ marginTop: "5px" }}>Emily Johnson</footer>
                    </blockquote>
                </div>
            </div>
        </div>
    )
}

export default Testamonial;