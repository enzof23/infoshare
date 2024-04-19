import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.PUBLIC_EMAILJS_KEY;

type FormStatus = "default" | "error" | "success";

export default function () {
  const [sending, setSending] = useState<boolean>(false);
  const [formStatus, setFormStatus] = useState<FormStatus>("default");

  async function sendEmail(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);

    formStatus !== "default" && setFormStatus("default");

    const formData = new FormData(e.currentTarget);

    try {
      if (formData) {
        const { status, text } = await emailjs.sendForm(
          SERVICE_ID,
          TEMPLATE_ID,
          e.currentTarget,
          PUBLIC_KEY
        );

        if (status === 200) {
          setSending(false);
          setFormStatus("success");
        } else {
          throw new Error(`Error ${status}: ${text}`);
        }
      }
    } catch (error) {
      console.log(error);
      setSending(false);
      setFormStatus("error");
    }
  }

  if (formStatus === "success") {
    return (
      <FormWrapper>
        <div className="flex flex-col gap-3 text-accent-light/90">
          <p className="text-lg font-medium leading-10">
            Thank you for your interest !
          </p>
          <p>
            You should receive an email shortly with all my relevant links and
            information about myself.
          </p>

          <p className="text-sm text-accent-light/50">
            If you can't find the email, make sure to check your spam!
          </p>
        </div>
      </FormWrapper>
    );
  }

  return (
    <FormWrapper>
      <form onSubmit={sendEmail} className="flex flex-col gap-4">
        <InputWrapper name={"name"}>
          <input
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

        {formStatus === "error" && (
          <p className="text-sm text-red-700">
            An error has occured, please try again
          </p>
        )}

        <input
          type="submit"
          value={sending ? "sending..." : "submit"}
          className="cursor-pointer bg-accent rounded-sm uppercase text-accent-light font-medium p-3 text-sm transition-all duration-150 hover:bg-accent/80 active:bg-accent-secondary active:outline-accent active:translate-y-[2px]"
        />
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
  const span = name === "name" ? "optional" : "required";
  return (
    <div className="flex flex-col">
      <label
        htmlFor={name}
        className="text-accent-light/90 uppercase text-xs tracking-wider lg:text-sm lg:font-semibold"
      >
        {name}{" "}
        <span className="text-[9px] font-light text-accent-light/80">{`(${span})`}</span>
      </label>

      {children}
    </div>
  );
};
