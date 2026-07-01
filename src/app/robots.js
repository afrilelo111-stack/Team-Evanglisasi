export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://pelsis-te.vercel.app/sitemap.xml",
  };
}