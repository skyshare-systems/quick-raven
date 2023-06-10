import ContactUsPage from "components/contact-us-section";
import HeroSectionPage from "components/hero-section";
import InfoSectionPage from "components/info-section";
import PartnerTeamPage from "components/partners-team-section";
import TransactionPage from "components/transaction-section";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <HeroSectionPage />
      <TransactionPage />
      <InfoSectionPage />
      <PartnerTeamPage />
      <ContactUsPage />
    </>
  );
}
