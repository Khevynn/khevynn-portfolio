import SocialIcons from "../SocialIcons";

function Contact() {
  let email = "tgwinter@proton.me";
  let phone = "+351 935 784 446";

  function CopyToClipBoard(text) {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard: " + text);
    });
  }

  return (
    <div
      id="contact"
      className="flex flex-col items-center px-5 min-h-100 bg-gray-950 gap-7 max-md:pb-10 md:px-50"
    >
      <h1 className="mt-10 text-center text-4xl text-gray-200 font-semibold">
        What's Next?
      </h1>

      <p className="text-center text-lg text-gray-400 md:max-w-200">
        Whether you're looking for a developer, have a question, or just want to
        connect, feel free to reach out. I'm always open to new opportunities
        and conversations.
      </p>

      <div className="flex flex-col items-center gap-5 max-md:justify-center lg:flex-row">
        <a
          href={`mailto:${email}`}
          className="flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-gray-200 transition-all duration-300 hover:bg-emerald-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-envelope"
            viewBox="0 0 16 16"
          >
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
          </svg>
          <span>{email}</span>
        </a>

        <button
          onClick={() => CopyToClipBoard(phone)}
          className="flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-gray-200 transition-all duration-300 hover:bg-emerald-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-phone"
            viewBox="0 0 16 16"
          >
            <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
          </svg>
          <span>{phone}</span>
        </button>
      </div>

      <div className="flex flex-col mb-20 items-center gap-5 max-md:justify-center">
        <p className="text-center text-lg text-gray-400 max-w-200">
          You can also find me in those places:
        </p>

        <SocialIcons />
      </div>
    </div>
  );
}

export default Contact;
