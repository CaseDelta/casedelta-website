import Script from "next/script";

/** RB2B website visitor identification. Its downstream hosts are allowlisted in next.config.ts CSP. */
export function Rb2bTag() {
  return (
    <Script id="rb2b" strategy="afterInteractive">
      {`!function(key) {if (window.reb2b) return;window.reb2b = {loaded: true};var s = document.createElement("script");s.async = true;s.src = "https://ddwl4m2hdecbv.cloudfront.net/b/" + key + "/" + key + ".js.gz";document.getElementsByTagName("script")[0].parentNode.insertBefore(s, document.getElementsByTagName("script")[0]);}("9NMMZHX3GRNW");`}
    </Script>
  );
}
