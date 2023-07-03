"use client";
import ContactUsPage from "components/contact-us-section";
import HeroSectionPage from "components/hero-section";
import InfoSectionPage from "components/info-section";
import PartnerTeamPage from "components/partners-team-section";
import SupportedPlatformPage from "components/supported-platforms";
import TransactionPage from "components/transaction-section";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import NavbarPage from "components/navigations/navbar";
import FooterPage from "components/navigations/footer";

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <NavbarPage />
      <HeroSectionPage />
      <InfoSectionPage />
      <SupportedPlatformPage />
      <PartnerTeamPage />
      <ContactUsPage />
      <FooterPage />
    </>
  );
}
