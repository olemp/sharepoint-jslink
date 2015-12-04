/// <reference path="typings\tsd.d.ts" />

enum ListTemplateType {
	GenericList = 100,
	DocumentLibrary = 101,
	Survey = 102,
	Links = 103,
	Announcements = 104,
	Contacts = 105,
	Events = 106,
	Tasks = 107,
	DiscussionBoard = 108,
	PictureLibrary = 109
}
interface IOverrideContext {
    Templates: {
        Header: Function,
        Item: Function,
        Footer: Function
    };
    BaseViewID: number;
    ListTemplateType: number;
}
interface IBaseRenderer {
    overrideCtx: IOverrideContext;
	itemHtml(ctx?: ContextInfo): string;
	headerHtml(ctx?: ContextInfo): string;
    footerHtml(ctx?: ContextInfo): string;
    render(): void;
}
class BaseRenderer implements IBaseRenderer {
	listTemplateType: ListTemplateType;
	baseViewID: number;
	overrideCtx: IOverrideContext;
	listClassNames: Array<string>;

	constructor(listTemplateType: ListTemplateType, baseViewId: number) {
		this.listTemplateType = listTemplateType;
		this.baseViewID = baseViewId;
	}

	itemHtml(ctx?: ContextInfo) { return ""; }
	headerHtml(ctx?: ContextInfo) { return ""; }
	footerHtml(ctx?: ContextInfo) { return ""; }
	render() {
		this.overrideCtx = {
			Templates: {
				Item: this.itemHtml,
				Header: this.headerHtml,
				Footer: this.footerHtml
			},
			BaseViewID: 1,
			ListTemplateType: this.listTemplateType
		};
		SPClientTemplates.TemplateManager.RegisterTemplateOverrides(this.overrideCtx);
	}
}