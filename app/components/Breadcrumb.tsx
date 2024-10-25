"use client";

import { useEffect } from "react";

interface crumbProps {
  name?: string;
  href?: string;
}

interface BreadcrumbProps {
  crumbs?: crumbProps[];
  containerProps?:React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ crumbs = [], containerProps }) => {
  useEffect(() => {
    // re-render the component when crumbs changes
  }, [crumbs]);

  return (
    <section
    {...containerProps}
    style={{ display: "flex", flexDirection: "row", gap: "6px", ...containerProps?.style }} >
      <h3> Breadcrumbs :</h3>
      {crumbs.map((crumb: crumbProps, index) => {
        return (
          <a key={crumb.name} href={crumb.href}>

            {crumb.name} { crumbs.length == (index + 1) ? "" : ">>"}
          </a>
        );
      })}
    </section>
  );
};

export default Breadcrumb;
