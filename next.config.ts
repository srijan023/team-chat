import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    serverExternalPackages: ["pino", "pino-pretty"],
    devIndicators: false,
    webpack(config) {
        // Add the @svgr/webpack loader for SVGs
        config.module.rules.push({
            test: /\.svg$/,
            use: [{
                loader: "@svgr/webpack", options: {
                    icon: true,
                    svgProps: { width: "1em", height: "1em" }, // Makes SVG scalable
                }
            }],
        });

        return config; // Return the modified config
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                port: "",
                pathname: "/**"
            },
            {
                protocol: "http",
                hostname: "localhost",
                port: "8000",
                pathname: "/wp-content/uploads/**",
            }
        ]
    }


};

export default nextConfig;
