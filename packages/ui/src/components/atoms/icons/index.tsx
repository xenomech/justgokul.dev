type PropType = {
  className?: string;
};

export function GithubIcon({ className }: PropType) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z"
      />
    </svg>
  );
}

export function TwitterIcon({ className }: PropType) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function LinkedinIcon({ className }: PropType) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
    </svg>
  );
}

export function BarcodeIcon({ className, fill = '#000000' }: PropType & { fill?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 354 142"
      role="img"
      aria-label="Barcode preview"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0" y="0" width="354" height="142" fill={fill} />
      <g transform="translate(10, 10)" fill="#000000">
        <rect x="0" y="0" width="4" height="100" />
        <rect x="6" y="0" width="2" height="100" />
        <rect x="12" y="0" width="6" height="100" />
        <rect x="22" y="0" width="6" height="100" />
        <rect x="34" y="0" width="4" height="100" />
        <rect x="40" y="0" width="2" height="100" />
        <rect x="44" y="0" width="4" height="100" />
        <rect x="52" y="0" width="4" height="100" />
        <rect x="58" y="0" width="4" height="100" />
        <rect x="66" y="0" width="6" height="100" />
        <rect x="74" y="0" width="4" height="100" />
        <rect x="80" y="0" width="6" height="100" />
        <rect x="88" y="0" width="4" height="100" />
        <rect x="98" y="0" width="2" height="100" />
        <rect x="106" y="0" width="2" height="100" />
        <rect x="110" y="0" width="6" height="100" />
        <rect x="118" y="0" width="4" height="100" />
        <rect x="124" y="0" width="6" height="100" />
        <rect x="132" y="0" width="2" height="100" />
        <rect x="136" y="0" width="6" height="100" />
        <rect x="144" y="0" width="4" height="100" />
        <rect x="154" y="0" width="2" height="100" />
        <rect x="162" y="0" width="8" height="100" />
        <rect x="172" y="0" width="2" height="100" />
        <rect x="176" y="0" width="4" height="100" />
        <rect x="188" y="0" width="2" height="100" />
        <rect x="192" y="0" width="2" height="100" />
        <rect x="198" y="0" width="6" height="100" />
        <rect x="206" y="0" width="4" height="100" />
        <rect x="212" y="0" width="6" height="100" />
        <rect x="220" y="0" width="2" height="100" />
        <rect x="224" y="0" width="6" height="100" />
        <rect x="236" y="0" width="4" height="100" />
        <rect x="242" y="0" width="6" height="100" />
        <rect x="250" y="0" width="2" height="100" />
        <rect x="254" y="0" width="8" height="100" />
        <rect x="264" y="0" width="4" height="100" />
        <rect x="272" y="0" width="6" height="100" />
        <rect x="282" y="0" width="2" height="100" />
        <rect x="286" y="0" width="4" height="100" />
        <rect x="296" y="0" width="2" height="100" />
        <rect x="304" y="0" width="2" height="100" />
        <rect x="308" y="0" width="4" height="100" />
        <rect x="318" y="0" width="6" height="100" />
        <rect x="326" y="0" width="2" height="100" />
        <rect x="330" y="0" width="4" height="100" />
        <text
          fontFamily="Roboto, Arial, sans-serif"
          fontSize="20"
          textAnchor="middle"
          x="167"
          y="122"
          fill="#000"
        >
          590123412345797823462
        </text>
      </g>
    </svg>
  );
}
