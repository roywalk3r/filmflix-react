import { Link } from "react-router-dom";
import "./landingpage.css";
function LandingPage() {
  return (
    <body>
      <div className="showcase">
        <div className="showcase-top">
          <Link to="/home" className="landing_logo">
            {" "}
            Film<span id="flix">Flix</span>{" "}
          </Link>
        </div>
        <div className="showcase-content">
          <h1>See what's next</h1>
          <p>Watch anywhere. FREE Anytime</p>
          <Link to="/home" className="btn btn-xl">
            WATCH NOW<i className="fas fa-chevron-right btn-icon"></i>
          </Link>
        </div>
      </div>
      <main>
        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <details open>
            <summary>What is movie streaming?</summary>
            <div className="faq-content">
              <p>
                Movie Streaming is a streaming service that offers a wide
                variety of award wining movies on thousands of internet
                connected devices.
              </p>
              <p>
                You can watch as much as you want, whenever you want, absolutly
                free. There's always something new to discover, and new movies
                are added every week!
              </p>
            </div>
          </details>
          <br />
          <br />
          <details>
            <summary>How much does movie streaming cost?</summary>
            <div className="faq-content">
              <p>
                Watch movies on your smartphone, tablet, smart TV, laptop, or
                streaming device, all for free
              </p>
            </div>
          </details>
        </div>
        <br />
        <br />
        <details>
          <summary>Where can I Watch?</summary>
          <div className="faq-content">
            <p>
              Watch any where any time, on an unlimited number of devices. Sign
              in with you account to watch instantly on the at
              https://rseann.helioho.st from you personal computer or any
              tablets, streaming devices including smart TV, smartphones, and
              game consoles. You can also download your favourite shows with the
              IOS, Android or Windows. Use downloads to watch while you are on
              the go and without internet connection. Take movie streaming with
              you anywhere.
            </p>
          </div>
        </details>
        <br />
        <br />
        <details>
          <summary>What can I watch on Movie Streaming?</summary>
          <div className="faq-content">
            <p>
              Movie Streaming has an extensive library of feature films,
              award-winning Movie Streaming originals, and more. Watch as much
              as you want, anytime you want.
            </p>
          </div>
        </details>
        <br />
        <br />
        <details>
          <summary>Is Movie Streaming good for kids?</summary>
          <div className="faq-content">
            <p>
              The Movie Streaming comes with content that kids can watch
              including family time movies that can be enjoyed together by the
              family.
            </p>
          </div>
        </details>
        <br />
      </main>
      <div className="copyright">&#169; Godak All rights Reserved</div>
    </body>
  );
}

export default LandingPage;
