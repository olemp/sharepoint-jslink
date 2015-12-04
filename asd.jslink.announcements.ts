/// <reference path="jslink.helpers.ts" />

class AnnouncementsRenderer extends BaseRenderer {
        constructor() {
                super(ListTemplateType.Announcements, 1);
        }

        itemHtml(ctx?: ContextInfo) {
                var item = ctx['CurrentItem'];
                return `<li>
                                        <h2>
                                                ${item.Title}
                                        </h2>
   
                                        <p>${item.Body}</p>
                                </li>`;
        }
        headerHtml(ctx?: ContextInfo) {
                return `<ul>`;
        }
        footerHtml(ctx?: ContextInfo) {
                return `</ul>`;
        }
}

(function() {
        new AnnouncementsRenderer().render();
})();