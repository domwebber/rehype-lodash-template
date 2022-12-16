import { TemplateOptions } from "lodash";
interface AttachProps {
    values: object;
    options: TemplateOptions;
}
export default function attach({ values, options }: AttachProps): (tree: any) => void;
export {};
