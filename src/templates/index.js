import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import { Layout, PostCard, Pagination } from "../components/common";
import { MetaData } from "../components/common/meta";
import product from '../images/home/product.jpg'
import portrait from '../images/home/portrait.jpg'
import follow from '../images/home/follow.jpg'

/**
 * Main index page (home page)
 *
 * Loads all posts from Ghost and uses pagination to navigate through them.
 * The number of posts that should appear per page can be setup
 * in /utils/siteConfig.js under `postsPerPage`.
 *
 */
const Index = ({ data, location, pageContext }) => {
  // const posts = data.allGhostPost.edges;
  const posts = [
      {
        slug: "the-editor",
        feature_image: portrait,
        title: "Apps & integrations",
        title: "人像写真",
        excerpt: "在我这里 你就是主角",
      },
      {
        slug: "video",
        feature_image: follow,
        title: "Apps & integrations",
        title: "跟拍",
        excerpt: "领证跟拍｜婚礼跟拍｜毕业跟拍｜其他跟拍",
      },
      {
        slug: "scene",
        feature_image: product,
        title: "Creating a custom theme",
        title: "产品图",
        children: [
            { title: "白底图", path: "/scene", point: "whitBg" },
            { title: "暖色调", path: "/scene", point: "warmTone" },
        ],
        excerpt: "资深团队，服务多个知名品牌",
      },
  ];

  return (
    <>
      <MetaData location={location} />
      <Layout isHome={true}>
        <div className="container">
          <section className="post-feed">
            {posts.map((node) => (
              <PostCard key={node.id} post={node} />
            ))}
          </section>
          <Pagination pageContext={pageContext} />
        </div>
      </Layout>
    </>
  );
};

Index.propTypes = {
  data: PropTypes.shape({
    allGhostPost: PropTypes.object.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  pageContext: PropTypes.object,
};

export default Index;

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
export const pageQuery = graphql`
    query GhostPostQuery($limit: Int!, $skip: Int!) {
        allGhostPost(
            sort: { order: DESC, fields: [published_at] }
            limit: $limit
            skip: $skip
        ) {
            edges {
                node {
                    ...GhostPostFields
                }
            }
        }
    }
`;
