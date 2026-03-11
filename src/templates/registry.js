import BaseTemplate from "./base/BaseTemplate";
import Auckland from "./Auckland";
import Oxford from "./Oxford";
import Cambridge from "./Cambridge";
import Stanford from "./Standford";
import Harvard from "./Harvard";
import Princeton from "./Princeton";
import Edinburgh from "./Edinburgh";

export const templates = [
  { key: "oxford", name: "Oxford", thumbnail: "/assets/img/cv1.png", component: Oxford},
  { key: "cambridge", name: "Cambridge", thumbnail: "/assets/img/cv2.png", component: Cambridge },
  { key: "stanford", name: "Stanford", thumbnail: "/assets/img/cv3.png", component: Stanford },
  { key: "harvard", name: "Harvard", thumbnail: "/assets/img/cv4.png", component: Harvard },
  { key: "princeton", name: "Princeton", thumbnail: "/assets/img/cv5.png", component: Princeton },
  { key: "edinburgh", name: "Edinburgh", thumbnail: "/assets/img/cv6.png", component: Edinburgh },
  { key: "auckland", name: "Auckland", thumbnail: "/assets/img/cv7.png", component: Auckland },
];

export function getTemplateByKey(key) {
  return templates.find((t) => t.key === key) || templates[0];
}