import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import { Layout, PostCard, Pagination } from "../components/common";
import { MetaData } from "../components/common/meta";

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
          node: {
              slug: "welcome",
              feature_image:
                  "https://static.ghost.org/v3.0.0/images/creating-a-custom-theme.png",
              title: "Creating a custom theme",
              title: "场景图",
              excerpt: "包含当前市面上常见的饰品拍摄风格",
          },
      },
      {
          node: {
              slug: "the-editor",
              feature_image:
                  "https://static.ghost.org/v3.0.0/images/app-integrations.png",
              title: "Apps & integrations",
              title: "视频",
              excerpt: "可在线预览",
          },
      },
      {
          node: {
              slug: "publishing-options",
              feature_image:
                  "https://static.ghost.org/v3.0.0/images/organising-your-content.png",
              title: "详情图",
              excerpt: "图片设计",
          },
      },
      {
          node: {
              slug: "admin-settings",
              feature_image:
                  "https://static.ghost.org/v3.0.0/images/admin-settings.png",
              title: "完整案例",
              excerpt: "产品图片在电商平台的真实效果展示",
          },
      },
      {
          node: {
              slug: "the-editor",
              feature_image:
                  "https://static.ghost.org/v3.0.0/images/app-integrations.png",
              title: "Apps & integrations",
              title: "写真",
              excerpt: "展现你最真实的美",
          },
      },
      {
          node: {
              slug: "the-editor",
              feature_image:
                  "https://static.ghost.org/v3.0.0/images/app-integrations.png",
              title: "Apps & integrations",
              title: "婚礼",
              excerpt: "精通各种场景婚礼拍摄",
          },
      },
  ];

  return (
    <>
      <MetaData location={location} />
      <Layout isHome={true}>
        <div className="container">
          <section className="post-feed">
            {posts.map(({ node }) => (
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
