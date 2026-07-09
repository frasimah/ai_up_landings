"use client";

import { useEffect, useState } from "react";
import LeadModal from "./LeadModal";

// Mounted once on the page. Opens the form-only lead popup when any element
// carrying a `data-lead-form` attribute (or a descendant of it) is clicked —
// so page-wide CTAs open the form without each block wiring its own modal.
export default function LeadFormProvider() {
   const [open, setOpen] = useState(false);

   useEffect(() => {
      const onClick = (e: MouseEvent) => {
         const target = e.target as HTMLElement | null;
         if (target?.closest("[data-lead-form]")) {
            e.preventDefault();
            setOpen(true);
         }
      };
      document.addEventListener("click", onClick);
      return () => document.removeEventListener("click", onClick);
   }, []);

   return <LeadModal open={open} onClose={() => setOpen(false)} showPackages={false} />;
}
