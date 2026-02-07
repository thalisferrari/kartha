import moment from "moment";
import "moment/locale/pt-br";

moment.locale("pt-br");

export function getBasePath(): string {
  return process.env.NODE_ENV === "production" ? "/kartha" : "";
}

export function assetPath(path: string): string {
  const base = getBasePath();
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(
  date: string,
  format: string = "DD [de] MMMM [de] YYYY",
): string {
  return moment(date).isValid() ? moment(date).format(format) : date;
}

export function formatDateShort(date: string): string {
  return moment(date).format("MMM YYYY");
}

export function getYearFromDate(date: string): string {
  return moment(date).format("YYYY");
}
