type SeoProps = {
  title: string;
  description?: string;
  canonicalPath?: string;
};

const SITE = 'https://www.hahn-tief-kabelbau.de';

export function Seo({ title, description, canonicalPath }: SeoProps) {
  const canonical =
    canonicalPath == null
      ? SITE
      : `${SITE}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;

  return (
    <>
      <title>{title}</title>

      {description && <meta name="description" content={description} />}

      <link rel="canonical" href={canonical} />
    </>
  );
}
