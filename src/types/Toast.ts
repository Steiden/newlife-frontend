export enum ToastStatusEnum {
	SUCCESS = "success",
	ERROR = "error",
	WARNING = "warning",
}

export type ToastDataType = {
	title: string;
	text: string;
	status: ToastStatusEnum;
};