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
        header: "Cinzel",
        body: "Crimson Text",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#f0e8d8",
          lightgray: "#d6cab4",
          gray: "#8a7e6c",
          darkgray: "#2e2518",
          dark: "#1a120a",
          secondary: "#6b3a2a",
          tertiary: "#2a6e5a",
          highlight: "rgba(107, 58, 42, 0.10)",
          textHighlight: "#c9a84c55",
        },
        darkMode: {
          light: "#0a0e1a",
          lightgray: "#141b2e",
          gray: "#3a4462",
          darkgray: "#c4b89e",
          dark: "#e8dcc8",
          secondary: "#c9a84c",
          tertiary: "#00d4aa",
          highlight: "rgba(201, 168, 76, 0.08)",
          textHighlight: "#c9a84c33",
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
