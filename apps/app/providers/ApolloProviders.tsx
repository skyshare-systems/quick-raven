"use client";
import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://flyby-router-demo.herokuapp.com/",
  cache: new InMemoryCache(),
});

interface ApolloProps {
  children: React.ReactNode;
}

const ApolloProviders = ({ children }: ApolloProps) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviders;
