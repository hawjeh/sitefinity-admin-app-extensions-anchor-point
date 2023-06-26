import { ClassProvider, Injectable } from "@angular/core";
import { ToolBarItem, EditorConfigProvider, EDITOR_CONFIG_TOKEN } from "@progress/sitefinity-adminapp-sdk/app/api/v1";
// @ts-ignore  
import * as Grammarly from "@grammarly/editor-sdk";


@Injectable()
class GrammarlyProvider implements EditorConfigProvider {

    constructor() {
        new Promise(() => {
            this.loadScript();
        })
    }

    async loadScript() {
        setTimeout(async () => {
            const grammarly = await Grammarly.init("client_JPL8S7bVXHtbVPc9CjaQzG");
            grammarly.addPlugin(
                // @ts-ignore
                document.querySelectorAll('[contenteditable]')[1],
                { documentDialect: "british" },
            );
        }, 3000);
    }

    getToolBarItems(): ToolBarItem[] {
        return [];
    }

    getToolBarItemsNamesToRemove(): string[] {
        return [];
    }

    configureEditor(configuration: any) {
        return configuration;
    }
}

export const GRAMMARLY_PROVIDER: ClassProvider = {
    multi: true,
    provide: EDITOR_CONFIG_TOKEN,
    useClass: GrammarlyProvider
};
