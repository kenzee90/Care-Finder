import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";
import { CareFinderLogo } from "./carefinnder-logo";

export function FooterComponent() {
  return (
    <Footer container className="relative bottom-0">
      <div className="w-full border-t-2 text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <CareFinderLogo />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Care-Finder
          </span>
          <FooterLinkGroup>
            <FooterLink href="#">All Hospital List</FooterLink>
            <FooterLink href="signUp">Sign Up</FooterLink>
            <FooterLink href="#">Sign In</FooterLink>
          </FooterLinkGroup>
        </div>
        <FooterDivider />
        <FooterCopyright href="#" by="Kenneth Pam" year={2024} />
      </div>
    </Footer>
  );
}

export default FooterComponent;