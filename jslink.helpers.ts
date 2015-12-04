/// <reference path="typings\tsd.d.ts" />

/* 	
	Reference 
 	https://msdn.microsoft.com/EN-US/library/office/microsoft.sharepoint.splisttemplatetype.aspxpzl	
*/
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
	PictureLibrary = 109,
	DataSources = 110,
	WebTemplateCatalog = 111,
	UserInformation = 112,
	WebPartCatalog = 113,
	ListTemplateCatalog = 114,
	XMLForm = 115,
	MasterPageCatalog = 116,
	NoCodeWorkflows = 117,
	WorkflowProcess = 118,
	WebPageLibrary = 119,
	CustomGrid = 120,
	SolutionCatalog = 121,
	NoCodePublic = 122,
	ThemeCatalog = 123,
	DesignCatalog = 124,
	AppDataCatalog = 125,
	DataConnectionLibrary = 130,
	WorkflowHistory = 140,
	GanttTasks = 150,
	HelpLibrary = 151,
	AccessRequest = 160,
	TasksWithTimelineAndHierarchy = 171,
	MaintenanceLogs = 175,
	Meetings = 200,
	Agenda = 201,
	MeetingUser = 202,
	Decision = 204,
	MeetingObjective = 207,
	TextBox = 210,
	ThingsToBring = 211,
	HomePageLibrarye = 212,
	Posts = 301,
	Comments = 302,
	Categories = 303,
	Facility = 402,
	Whereabouts = 403,
	CallTrack = 404,
	Circulation = 405,
	Timecard = 420,
	Holidays = 421,
	IMEDic = 499,
	ExternalList = 600,
	MySiteDocumentLibrary = 700,
	IssueTracking = 1100,
	AdminTasks = 1200,
	HealthRules = 1220,
	HealthReports = 1221,
	DeveloperSiteDraftApps = 1230
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