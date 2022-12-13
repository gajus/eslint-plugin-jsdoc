// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'eslint-plugin-jsdoc',
  tagline: 'ESLint rules for @jsdoc',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'gajus', // Usually your GitHub org/user name.
  projectName: 'eslint-plugin-jsdoc', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/gajus/eslint-plugin-jsdoc/tree/master/doc-site/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/gajus/eslint-plugin-jsdoc/tree/master/doc-site/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'eslint-plugin-jsdoc',
        logo: {
          alt: 'eslint-plugin-jsdoc Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'getting-started/Installation',
            position: 'left',
            label: 'Getting started',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/gajus/eslint-plugin-jsdoc',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting started',
                to: '/docs/getting-started/Installation',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Awesome JSDoc',
                href: 'https://github.com/brettz9/awesome-jsdoc',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/kFFy3nc',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/gajus/eslint-plugin-jsdoc',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} eslint-plugin-jsdoc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
