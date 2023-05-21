// @ts-ignore
import NavbarPage from "components/navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import WagmiProviders from "providers/WagmiProviders";
import FooterPage from "components/footer";
import ApolloProviders from "providers/ApolloProviders";

export const metadata = {
  title: "Quick Raven",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="viewport" content="width=device-width, user-scalable=no" />
      </head>
      <body>
        <WagmiProviders>
          <ApolloProviders>
            <NavbarPage />
            {children}
          </ApolloProviders>
        </WagmiProviders>
      </body>
    </html>
  );
}
