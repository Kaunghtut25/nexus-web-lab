"use client";
import { useEffect } from "react";

export default function CourseLangSetter() {
  useEffect(() => {
    document.documentElement.lang = "my";
  }, []);
  return null;
}
