export interface IPrimaryModal {
    title: string;
    content: Array<string>;
    onAccept?: () => void | boolean;
    onCancel?: () => void | boolean;
}
