import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Aurora Borealis",
    pageTitleSuffix: " | Aurora Borealis",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-US",
    baseUrl: "ruicaridade.github.io/dnd-aurora-borealis",
    ignorePatterns: ["private", "templates", ".obsidian", ".claude", "_Raw Notes"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#f5f0eb",
          lightgray: "#e0d6cc",
          gray: "#a89f95",
          darkgray: "#3d3529",
          dark: "#1a1510",
          secondary: "#7b3f00",
          tertiary: "#2d6a4f",
          highlight: "rgba(123, 63, 0, 0.12)",
          textHighlight: "#ffd70088",
        },
        darkMode: {
          light: "#0d1117",
          lightgray: "#1c2333",
          gray: "#4a5568",
          darkgray: "#d4cfc9",
          dark: "#f0e6d6",
          secondary: "#e09f3e",
          tertiary: "#52b788",
          highlight: "rgba(224, 159, 62, 0.12)",
          textHighlight: "#e09f3e44",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
