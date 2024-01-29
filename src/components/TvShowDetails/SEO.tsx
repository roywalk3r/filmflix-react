import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  //   image: string;
  name: string; // Add 'name' to the interface
  type: string; // Add 'type' to the interface
}

export default function SEO({
  title,
  description,
  //   image,
  name,
  type,
}: SEOProps) {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* End standard metadata tags */}
      {/* Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {/* Add 'og:image' if needed */}
      {/* {image && <meta property="og:image" content={image} />} */}
      {/* End Facebook tags */}
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content={type} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {/* Add 'twitter:image' if needed */}
      {/* {image && <meta name="twitter:image" content={image} />} */}
      {/* End Twitter tags */}
    </Helmet>
  );
}
