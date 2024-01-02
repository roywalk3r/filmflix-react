import { useEffect } from "react";

interface DisqusCommentsProps {
  pageIdentifier?: any;
  pageTitle?: string;
}

declare global {
  interface Window {
    DISQUS: any;
  }
}

function DisqusComments({ pageIdentifier, pageTitle }: DisqusCommentsProps) {
  useEffect(() => {
    const shortname = "fan2one";

    // Load Disqus script
    const disqusScript = document.createElement("script");
    disqusScript.src = `https://${shortname}.disqus.com/embed.js`;
    disqusScript.setAttribute("data-timestamp", String(new Date().getTime()));
    (document.head || document.body).appendChild(disqusScript);

    return () => {
      // Remove Disqus script when component unmounts
      (document.head || document.body).removeChild(disqusScript);
    };
  }, []);

  useEffect(() => {
    // Set Disqus configuration
    const disqusConfig = function (this: {
      page: { identifier: string; title: string };
    }) {
      this.page = this.page || {};
      this.page.identifier = pageIdentifier || generateUniqueIdentifier();
      this.page.title = pageTitle || document.title || "Default";
    };

    disqusConfig.apply({
      page: {
        identifier: pageIdentifier || generateUniqueIdentifier(),
        title: pageTitle || document.title || "Default",
      },
    });

    // Reset Disqus thread when page changes
    resetDisqus(
      pageIdentifier,
      `https://${window.location.host}${window.location.pathname}`,
      pageTitle || document.title || "Default",
      "en"
    );
  }, [pageIdentifier, pageTitle]);

  const generateUniqueIdentifier = () => {
    return Math.floor(Math.random() * 1000000).toString();
  };

  const resetDisqus = (
    newIdentifier: string,
    newUrl: string,
    newTitle: string,
    newLanguage: string
  ) => {
    if (window.DISQUS) {
      window.DISQUS.reset({
        reload: true,
        config: function () {
          this.page.identifier = newIdentifier;
          this.page.url = newUrl;
          this.page.title = newTitle;
          this.language = newLanguage;
        },
      });
    }
  };

  return <div id="disqus_thread"></div>;
}

export default DisqusComments;
