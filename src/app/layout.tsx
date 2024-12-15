import "semantic-ui-css/semantic.min.css";

import { Container, Grid } from "semantic-ui-react";

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
            <body>
                <Container style={{ marginTop: "2em" }}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                {/* Header or Navbar Component (Optional) */}
                                <h1 style={{ textAlign: "center" }}>Madlibulator</h1>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={16}>
                                {/* Main Content */}
                                {children}
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={16}>
                                {/* Footer (Optional) */}
                                <footer style={{ textAlign: "center", marginTop: "2em" }}>© {new Date().getFullYear()} Madlibulator</footer>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </body>
        </html>
    );
}
