import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer class="bg-body-tertiary text-center text-md-start">
        <div class="container p-4">
          <div class="row">
            <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
              <h5 class="text-uppercase">Footer Content</h5>
              <p>
                A blog is not just a platform, it's a journey where you learn,
                grow, and evolve with every post
              </p>
            </div>

            <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 class="text-uppercase">Category</h5>

              <ul class="list-unstyled mb-0">
                <li>
                  <Link to="/user/dashboard" class="text-body">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/user/dashboard" class="text-body">
                    Feature
                  </Link>
                </li>
                <li>
                  <Link to="/user/dashboard" class="text-body">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/user/dashboard" class="text-body">
                    About
                  </Link>
                </li>
              </ul>
            </div>

            <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 class="text-uppercase mb-0">Blog</h5>

              <ul class="list-unstyled">
                <li>
                  <Link to="/user/dashboard" class="text-body">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/user/dashboard" class="text-body">
                    Feature
                  </Link>
                </li>
                <li>
                  <Link to="/user/dashboard" class="text-body">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/user/dashboard" class="text-body">
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          class="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2020 Copyright:
          <Link class="text-body" to="https://www.google.com/" target="_blank">
            Google.com
          </Link>
        </div>
      </footer>
    </>
  );
}
