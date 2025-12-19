import type { ToasterLevel } from "./ToasterLevel";

export type ToasterData = {
    id?: string;
    title?: string;
    content: string;
    lifeTime?: number;
    level: ToasterLevel;
    transparent?: boolean;
    showMoreInfoButton?: boolean;
};