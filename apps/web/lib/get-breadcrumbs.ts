export function getBreadcrumbs(path: string) {
  const segments = path.split("/").filter(Boolean);
  const breadcrumbs = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    return {
      label: segment.charAt(0).toUpperCase() + segment.slice(1),
      href,
      isCurrent: index === segments.length - 1,
    };
  });
  return breadcrumbs;
}
