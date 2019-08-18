module.exports = {
  siteMetadata: {
    title: `Just Files`,
    description: `A file hosting application that is all about accessibility`,
    author: `David Crandall`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `David Crandall File Hosting`,
        short_name: `Just Files`,
        start_url: `/`,
        background_color: `#042291`,
        theme_color: `#042291`,
        display: `minimal-ui`,
        icon: `src/images/dc-logo-purple.png`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
