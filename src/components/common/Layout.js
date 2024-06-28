import * as React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { Link, StaticQuery, graphql } from "gatsby";
import catalog from '../../images/common/catalog.png';
import { GatsbyImage } from "gatsby-plugin-image";
import { Navigation } from ".";
import config from "../../utils/siteConfig";
import home from '../../images/home/home.jpg'
// Styles
import "../../styles/app.css";
import "../../styles/catalog.css";

/**
 * Main layout component
 *
 * The Layout component wraps around each page and template.
 * It also provides the header, footer as well as the main
 * styles, and meta data for each page.
 *
 */
const DefaultLayout = ({ data, children, bodyClass, isHome }) => {
  const site = data.allGhostSettings.edges[0].node;
  const twitterUrl = site.twitter
    ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}`
    : null;
  const facebookUrl = site.facebook
    ? `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}`
    : null;

  const onHandleCatelog = () => {
    console.log('🚀')
  }

  return (
      <>
          <Helmet>
              <html lang={site.lang} />
              <style type="text/css">{`${site.codeinjection_styles}`}</style>
              <body className={bodyClass} />
          </Helmet>

          <div className="viewport">
              <div className="catalog">
    
              </div>
              <div className="viewport-top">
                  {/* The main header section on top of the screen */}
                  <header
                      className="site-head"
                      style={{
                          ...(site.cover_image && {
                              backgroundImage: `url(${home})`,
                          }),
                      }}
                  >
                      <div className="container">
                          <div className="site-mast">
                              <div
                                  className="site-mast-left"
                                  onClick={onHandleCatelog}
                              >
                                  <img
                                      className="site-logo"
                                      src={catalog}
                                      alt="目录"
                                  />
                              </div>
                          </div>
                          {isHome ? (
                              <div className="site-banner">
                                  <h3 className="site-banner-title">
                                      北甜 Studio
                                  </h3>
                                  <p className="site-banner-desc">
                                      专注影像十二年
                                  </p>
                                  <p className="site-banner-sub-desc">
                                      人像写真｜跟拍｜产品图拍摄
                                  </p>
                              </div>
                          ) : null}
                          {/* <nav className="site-nav">
              <div className="site-nav-left">
                <Navigation
                  data={site.navigation}
                  navClass="site-nav-item"
                />
              </div>
              <div className="site-nav-right">
                <Link
                  className="site-nav-button"
                  to="/about"
                >
                  About
                </Link>
              </div>
            </nav> */}
                      </div>
                  </header>

                  <main className="site-main">
                      {/* All the main content gets inserted here, index.js, post.js */}
                      {children}
                  </main>
              </div>

              <div className="viewport-bottom">
                  {/* The footer at the very bottom of the screen */}
                  <footer className="site-foot">
                      <div className="site-foot-nav container">
                          <div className="site-foot-nav-left">
                              © 2024 &mdash; Designed by Tammy
                          </div>
                          <div className="site-foot-nav-right">
                              联系我们
                              {/* <Navigation
                                data={site.navigation}
                                navClass="site-foot-nav-item"
                            /> */}
                          </div>
                      </div>
                  </footer>
              </div>
          </div>
      </>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
  bodyClass: PropTypes.string,
  isHome: PropTypes.bool,
  data: PropTypes.shape({
    file: PropTypes.object,
    allGhostSettings: PropTypes.object.isRequired,
  }).isRequired,
};

const DefaultLayoutSettingsQuery = (props) => (
  <StaticQuery
    query={graphql`
            query GhostSettings {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
                file(relativePath: { eq: "ghost-icon.png" }) {
                    childImageSharp {
                        gatsbyImageData(width: 30, height: 30, layout: FIXED)
                    }
                }
            }
        `}
    render={(data) => <DefaultLayout data={data} {...props} />}
  />
);

export default DefaultLayoutSettingsQuery;
