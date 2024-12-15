import { Metadata } from "next";

export const metadata: Metadata = {
    title: "MadLibulator",
    description: "MadLibulator is a fun game for all ages."
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
