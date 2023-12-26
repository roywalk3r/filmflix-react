import { useEffect } from "react";

interface DisqusCommentsProps {
  pageUrl?: string;
  pageIdentifier?: string;
  pageTitle?: string;
}

function DisqusComments({
  pageUrl,
  pageIdentifier,
  pageTitle,
}: DisqusCommentsProps) {
  useEffect(() => {
    // Replace 'YOUR_SHORTNAME' with your Disqus shortname
    const shortname = "fan2one";

    const disqusConfig = function (this: {
      page: { url: string; identifier: string; title: string };
    }) {
      this.page = this.page || {};
      this.page.url = pageUrl || window.location.href;
      this.page.identifier = pageIdentifier || generateUniqueIdentifier();
      this.page.title = pageTitle || document.title || "Your Default Title";
    };

    // Load Disqus script
    const disqusScript = document.createElement("script");
    disqusScript.src = `https://${shortname}.disqus.com/embed.js`;
    disqusScript.setAttribute("data-timestamp", String(new Date().getTime()));
    (document.head || document.body).appendChild(disqusScript);

    // Set Disqus configuration
    disqusConfig.apply({
      page: {
        url: "",
        identifier: "",
        title: "",
      },
    });
  }, [pageUrl, pageIdentifier, pageTitle]);

  const generateUniqueIdentifier = () => {
    // Implement your logic to generate a unique identifier
    // For example, you can use a timestamp or any other method
    return Math.floor(Math.random() * 1000000).toString();
  };

  return <div id="disqus_thread"></div>;
}

export default DisqusComments;
