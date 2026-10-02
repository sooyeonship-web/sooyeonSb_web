import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollAnimations from "@/components/layout/ScrollAnimations";
import "./globals.css";
import { COMPANY } from "@/constants/company";

export const metadata: Metadata = {
  title: {
    default: "인천 예인선·통선 임대 | 수연선박",
    template: "%s | 수연선박",
  },
  description: `인천 연안부두 수연선박. 예인선·통선 임대 및 판매, 해상공사 지원·해양조사 선박 운영. 주말·공휴일 전화 상담 ${COMPANY.phone}`,
  keywords: ["인천 예인선", "예인선 임대", "통선 임대", "해상공사 선박", "해양조사 선박", "연안부두 선박", "선박 판매"],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "수연선박",
  },
  verification: {
    other: {
      "naver-site-verification": "0a0bd253f18e7d198343b0d1c5a6674370aee50c",
    },
  },
};

// 검색엔진용 업체 정보 (constants/company.ts 기준)
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: COMPANY.name,
  alternateName: COMPANY.nameEn,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sooyeonship.kr",
  telephone: COMPANY.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY.address,
    addressLocality: "인천광역시 중구",
    addressCountry: "KR",
  },
  geo: { "@type": "GeoCoordinates", latitude: COMPANY.lat, longitude: COMPANY.lng },
  openingHours: "Mo-Su 09:00-18:00",
  description: "인천 연안부두 예인선·통선 임대 및 판매, 해상공사 지원·해양조사 선박 운영",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
        <Suspense>
          <ScrollAnimations />
        </Suspense>
        <Suspense>
          <Header />
        </Suspense>
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
