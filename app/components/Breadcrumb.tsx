"use client";

import { useState, useEffect } from "react";

interface crumbProps {
  name?: string;
  href?: string;
}

interface BreadcrumbProps {
  crumbs?: crumbProps[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ crumbs = [] }) => {
  useEffect(() => {
    // re-render the component when crumbs changes
  }, [crumbs]);

  return (
    <section style={{ display: "flex", flexDirection: "row", gap: "6px" }}>
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
