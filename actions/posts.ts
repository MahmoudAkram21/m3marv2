"use server";

import { BASE_URL } from "lib/config";

export async function reserveMessage(prevState: any, formData: FormData) {
  let nameEl = formData.get("name") as string;
  let useremailEl = formData.get("email") as string;
  let messageEl = formData.get("message") as string;
  let phoneEl = formData.get("phone") as string;
  let typeEl = formData.get("type") as string;

  const name = nameEl.trim();
  const useremail = useremailEl.trim();
  const message = messageEl.trim();
  const phone = phoneEl.trim();
  const type = typeEl.trim();

  let errors = [];
  if (!type) {
    errors.push("pleaseEnterType");
  }

  if (!useremail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(useremail)) {
    errors.push("pleaseEnterValidEmail");
  }

  if (!message) {
    errors.push("pleaseEnterMessage");
  }

  if (!phone) {
    errors.push("pleaseEnterPhone");
  }

  if (!name) {
    errors.push("pleaseEnterName");
  }

  try {
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/send-message`,
      {
        method: "POST",
        body: formData,
        mode: "no-cors",
        headers: {
          "Accept-Encoding": "gzip, deflate, br",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      errors.push("error");
      return {
        errors,
        message: `${response.status} ${response.statusText}`,
      };
    }

    return {
      errors,
      message: errors.length > 0 ? "Error" : "Message reserved successfully",
    };
  } catch (error) {
    errors.push("error");
    return {
      errors,
      message: `${error}`,
    };
  }
}

export async function JobsForm(prevState: any, formData: FormData) {
  let nameEl = formData.get("name") as string;
  let useremailEl = formData.get("email") as string;
  let departmentEl = formData.get("department") as string;
  let cvEl = formData.get("cv") as File;

  // Clear previous messages

  const name = nameEl.trim();
  const useremail = useremailEl.trim();
  const department = departmentEl.trim();
  const cv = cvEl as File;

  let errors = [];
  // Validate fields
  if (!name) {
    errors.push("pleaseEnterName");
  }

  if (!department) {
    errors.push("pleaseEnterDepartment");
  }

  if (!useremail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(useremail)) {
    errors.push("pleaseEnterValidEmail");
  }

  if (!cv || cv.size === 0) {
    errors.push("pleaseEnterCV");
  }

  try {
    const res = await fetch(BASE_URL + "/api/send-cv", {
      method: "POST",
      body: formData,
      mode: "no-cors",
      headers: {
        "Accept-Encoding": "gzip, deflate, br",
        Accept: "application/json",
      },
    });
    const data = await res.text();

    if (!res.ok) {
      errors.push("error");
      return {
        errors,
        message: `${res.status} ${res.statusText}`,
      };
    }

    return {
      errors,
      message: "Jobs form reserved successfully",
    };
  } catch (error) {
    errors.push("error");
    return {
      errors,
      message: `${error}`,
    };
  }
}
