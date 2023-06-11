"use client";
import ContactUsPage from "components/contact-us-section";
import HeroSectionPage from "components/hero-section";
import InfoSectionPage from "components/info-section";
import PartnerTeamPage from "components/partners-team-section";
import SupportedPlatformPage from "components/supported-platforms";
import TransactionPage from "components/transaction-section";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <HeroSectionPage />
      <TransactionPage />
      <SupportedPlatformPage />
      <InfoSectionPage />
      <PartnerTeamPage />
      <ContactUsPage />
    </>
  );
}
