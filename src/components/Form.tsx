"use client";

import { useTranslations } from "next-intl";
import { useActionState } from "react";

function Form({
  serverAction,
  children,
  className,
}: {
  serverAction: any;
  children: React.ReactNode;
  className?: string;
}) {
  const t = useTranslations();

  const [state, formAction] = useActionState(serverAction, {
    message: "",
    errors: [],
  });

  return (
    <form
      action={formAction}
      className={`w-full flex flex-col justify-start  gap-2 ${className}`}
    >
      <div className="flex  justify-start items-start w-full gap-2">
        {state?.errors.length > 0 &&
          state?.errors.map((error: string) => (
            <p
              key={error}
              className="text-red-500 border-2 border-red-500 rounded-md p-2"
            >
              {t(`form.${error}`)}
            </p>
          ))}
      </div>
      {state?.message && state?.errors.length === 0 && (
        <p className="text-green-500">{state?.message}</p>
      )}
      {children}
    </form>
  );
}

export default Form;
