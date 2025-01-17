import * as React from "react";
export interface GridLayout {
    id: string;
    row: number;
    col: number;
    h: number;
    w: number;
    filter: string[];
}
export interface IsoTopeGridProps {
    gridLayout: GridLayout[];
    unitWidth: number;
    unitHeight: number;
    noOfCols: number;
    filters: any[];
    children: React.ReactElement[];
}
declare const _default: (props: IsoTopeGridProps) => JSX.Element;
export default _default;
