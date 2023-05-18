import SwapPage from "components/swap";
import ModalTutorialPage from "components/tutorial/modal-tutorial";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <ModalTutorialPage />
      <SwapPage />
    </>
  );
}
