"use client";

import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
} from "./ui/modal";
import { Button } from "./ui/button";

interface DonationModalProps {
  delaySeconds?: number;
  donateUrl?: string;
}

export default function DonationModal({
  delaySeconds = 45,
  donateUrl = "#donate"
}: DonationModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Set timer to open modal after specified delay
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, delaySeconds * 1000);

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, [delaySeconds]);

  const handleDonateClick = () => {
    // Navigate to donate section or URL
    if (donateUrl.startsWith("#")) {
      const element = document.querySelector(donateUrl);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = donateUrl;
    }
    setIsOpen(false);
  };

  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <ModalContent className="sm:max-w-[425px]">
        {/* <ModalHeader>
          <ModalTitle className="text-2xl">Support Our Mission</ModalTitle>
          <ModalDescription className="text-base pt-4">
            Your donation helps us defend immigrant rights and support our community. Every contribution makes a difference.
          </ModalDescription>
        </ModalHeader> */}
        <ModalFooter className="pt-4">
          <Button
            variant="default"
            size="lg"
            onClick={handleDonateClick}
            className="w-full"
          >
            Donate Now
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
