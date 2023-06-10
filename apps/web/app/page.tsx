import ContactUsPage from "components/contact-us-section";
import HeroSectionPage from "components/hero-section";
import InfoSectionPage from "components/info-section";
import PartnerTeamPage from "components/partners-team-section";
import SupportedPlatformPage from "components/supported-platforms";
import TransactionPage from "components/transaction-section";
import Image from "next/image";

export default function Home() {
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
