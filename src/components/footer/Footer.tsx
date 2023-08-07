"use client";

import { useTranslation } from "next-i18next";
import Image from "next/image";
import logo from "public/recomm.svg";
import Link from "next/link";
import React from "react";
import { BsFacebook, BsLinkedin, BsTwitter, BsInstagram } from "react-icons/bs";
import { type IconType } from "react-icons/lib";

const socialMedias: Array<[IconType, string]> = [
  [BsInstagram, "https://instagram.com"],
  [BsTwitter, "https://twitter.com"],
  [BsFacebook, "https://facebook.com"],
  [BsLinkedin, "https://linkedin.com"],
];

export function Footer(): React.JSX.Element {
  const { t } = useTranslation("footer");

  const footerLinks = [
    {
      label: t("company"),
      links: [
        [t("about"), "/about"],
        [t("termOfUse"), "/term-of-use"],
        [t("privacyPolicy"), "/privacy-policy"],
        [t("howItWorks"), "/how-works"],
        [t("contactUs"), "/contact-us"],
      ],
    },
    {
      label: t("support"),
      links: [
        [t("supportCareer"), "/support"],
        [t("service"), "/24-service"],
        [t("quickChat"), "/quick-chat"],
      ],
    },
    {
      label: t("contact"),
      links: [
        [t("whatsapp"), "/whatsapp"],
        [t("support"), "/24-service"],
      ],
    },
  ];

  return (
    <footer className="w-full mb-16 bg-neutral-300 md:mb-0 hidden md:block">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col md:flex-1">
            <Link href="/">
              <Image
                priority
                src={logo}
                alt="logo"
                width={150}
                height={50}
                quality={100}
              />
            </Link>
            <p className="py-4 text-sm font-normal text-neutral-500">
              {t(
                "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque harum optio inventore soluta reiciendis ullam fuga."
              )}
            </p>
            <div className="my-5 flex justify-center md:justify-start">
              {socialMedias.map(([Icon, href]) => (
                <Link
                  key={href}
                  href={href}
                  target="_blank"
                  className="mr-2 rounded-lg bg-neutral-200 p-2 text-neutral-600 transition hover:bg-neutral-300 hover:text-neutral-700"
                >
                  <Icon />
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-5 flex justify-between md:mt-0 md:flex-[2] md:justify-around">
            {footerLinks.map(({ label, links }) => (
              <div key={label} className="flex flex-col">
                <strong className="mb-5 text-sm font-bold text-neutral-600 md:text-base">
                  {label}
                </strong>
                <ul className="flex flex-col gap-2 text-xs font-normal text-neutral-500 md:text-sm">
                  {links.map(([label, href]) => (
                    <Link
                      key={href}
                      href={href}
                      className="transition hover:text-neutral-700"
                    >
                      {label}
                    </Link>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
