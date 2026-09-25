import type { Metadata } from "next";

export const siteConfig = {
  name: "Madhav Sevak",
  description:
    "Portfolio of Madhav Sevak — Computer Science Engineering student at MIT-WPU exploring software development, computer graphics, 3D modelling, and creative technology.",
  url: "https://madhav-portfolio-puce.vercel.app",
  ogImage: "/profile.jpg",
  creator: "@madhav_sevak",
  authors: [
    {
      name: "Madhav Sevak",
      url: "https://madhav-portfolio-puce.vercel.app",
    },
  ],
  keywords: [
    "Madhav Sevak",
    "Portfolio",
    "Computer Science",
    "Developer",
    "3D Modelling",
    "Blender",
    "Next.js",
    "React",
    "TypeScript",
  ],
} as const;

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Computer Science Engineering Student & Developer`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [...siteConfig.authors],
  creator: siteConfig.creator,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} | Computer Science Engineering Student & Developer`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Computer Science Engineering Student & Developer`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.creator,
  },
  icons: {
    icon: "/profile.jpg",
    shortcut: "/profile.jpg",
    apple: "/profile.jpg",
  },
  manifest: "/site.webmanifest",
};

export function createMetadata({
  title,
  description,
  path = "/",
  image,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image ?? siteConfig.ogImage;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: title ?? siteConfig.name,
      description: description ?? siteConfig.description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title ?? siteConfig.name,
        },
      ],
    },
    twitter: {
      title: title ?? siteConfig.name,
      description: description ?? siteConfig.description,
      images: [ogImage],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
