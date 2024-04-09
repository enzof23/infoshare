import { useRef, useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY;

type FormStatus = "default" | "error" | "success";

export default function () {
  const formRef = useRef<HTMLFormElement>(null);

  const [sending, setSending] = useState<boolean>(false);
  const [status, setStatus] = useState<FormStatus>("default");

  function sendEmail(e: FormEvent) {
    e.preventDefault();

    // setSending(true);
    const form = formRef.current;

    if (form) {
      emailjs
        .sendForm(SERVICE_ID, TEMPLATE_ID, form, { publicKey: PUBLIC_KEY })
        .then(
          (result) => {
            console.log(`Result: ${result.text}`);
            console.log(form);
          },
          (error) => {
            console.log(`Error: ${error.text}`);
          }
        );
    }
  }

  return (
    <FormWrapper>
      <form ref={formRef} onSubmit={sendEmail} className="flex flex-col gap-4">
        <InputWrapper name={"name"}>
          <input
            required
            type="name"
            name="name"
            className="bg-accent-dark/30 border-accent/80 border rounded-sm text-accent-light outline-none p-1 sm:p-2 focus:border-accent-light/80"
          />
        </InputWrapper>

        <InputWrapper name={"email"}>
          <input
            required
            type="email"
            name="email"
            className="bg-accent-dark/30 border-accent/80 border rounded-sm text-accent-light outline-none p-1 sm:p-2 focus:border-accent-light/80"
          />
        </InputWrapper>

        <button
          type="submit"
          className="bg-accent rounded-sm uppercase text-accent-light font-medium p-3 text-sm transition-all duration-150 hover:bg-accent/80 active:bg-accent-secondary active:outline-accent active:translate-y-[2px]"
        >
          {sending ? "sending" : "submit"}
        </button>
      </form>
    </FormWrapper>
  );
}

function FormWrapper({ children }: { children: JSX.Element }) {
  return (
    <div className="w-full max-w-lg  bg-accent-dark/30 border border-accent/30 shadow-purple rounded-lg px-4 py-8 sm:px-8 sm:py-10">
      {children}
    </div>
  );
}

const InputWrapper = ({
  name,
  children,
}: {
  name: string;
  children: JSX.Element;
}) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={name}
        className="text-accent-light/90 uppercase text-xs tracking-wider lg:text-sm lg:font-semibold"
      >
        {name}
        {name === "email" && <span className="text-red-600">*</span>}:
      </label>

      {children}
    </div>
  );
};
