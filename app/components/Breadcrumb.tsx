"use client";

import { pathNameProps } from "@/hooks/helper/interface";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Home from "./svg/Home";
import Slash from "./svg/Slash";

interface crumbPropsI {
  name: string;
  href: pathNameProps;
}

type crumbProps<T> = T; //crumbPropsI | React.ReactElement;

interface BreadcrumbProps<T> {
  crumbs?: T[];
  containerProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  >;
}

const Breadcrumb: React.FC<BreadcrumbProps<crumbPropsI>> = ({
  crumbs = [],
  containerProps,
}: BreadcrumbProps<crumbPropsI>) => {
  const [breadcrumbs, setBreadrumbs] = useState<
    crumbProps<React.ReactElement>[]
  >([]);

  function addingSlashOrHomeSVGToBreadcrumbs() {
    const newBreadcrumbs: crumbProps<React.ReactElement>[] = [];
    crumbs.forEach((crumb, index) => {
      if (index == 0) {
        newBreadcrumbs.push(
          <div className="flex flex-row gap-1">
            <Home key={index} /> {LinkCrumb(crumb, { className: "italic hover:underline cursor-pointer font-base  hover:font-light transition-all" })}
          </div>
        );
        return; // Skips to the next iteration
      } else if (index !== newBreadcrumbs.length - 1) {
        newBreadcrumbs.push(<Slash key={crumb.name+'__slash'} />);
        newBreadcrumbs.push(LinkCrumb(crumb,  { className: "hover:underline cursor-pointer hover:font-light italic transition-all" } ));
        return; // Skips to the next iteration
      }
      
      newBreadcrumbs.push(<Slash key={crumb.name+'__slash'} />);
      newBreadcrumbs.push(LinkCrumb(crumb, { className: "font-bold cursor-auto" }));
    });

    setBreadrumbs(newBreadcrumbs);
  }

  function LinkCrumb(
    crumb: crumbPropsI,
    linkProps?: React.DetailedHTMLProps<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >
  ): React.ReactElement {
    return (
      <Link
        {...linkProps}
        key={crumb.name}
        href={crumb.href as unknown as URL}
        style={{ ...linkProps?.style, color: "191A2C" }}
        // className={linkProps?.style} 
      >
        {crumb.name}
        <a></a>
      </Link>
    );
  }

  useEffect(() => {
    addingSlashOrHomeSVGToBreadcrumbs();
  }, []);

  return (
    <section
      {...containerProps}
      // style={{ display: "flex", flexDirection: "row", gap: "6px", ...containerProps?.style }}
      className="flex  justify-start items-start flex-wrap"
    >
      {breadcrumbs ? breadcrumbs.map((crumb) => crumb) : null}
    </section>
  );
};

export default Breadcrumb;
