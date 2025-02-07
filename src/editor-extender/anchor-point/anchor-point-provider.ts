import { ClassProvider, Injectable } from "@angular/core";
import { ToolBarItem, EditorConfigProvider, EDITOR_CONFIG_TOKEN } from "@progress/sitefinity-adminapp-sdk/app/api/v1";

// This is webpack specific loader syntax for injecting css as <style> tag in header
require("!style-loader!css-loader!./editor-config-provider.css");

declare var jQuery: any;

/**
 * A custom toolbar provider implementation for counting the words in the html editor.
 * Kendo UI Editor custom tools documentation -> https://demos.telerik.com/kendo-ui/editor/custom-tools
 */
@Injectable()
class AnchorPointProvider implements EditorConfigProvider {
    /**
     * The method that gets invoked when the editor constructs the toolbar actions.
     * @param editorHost The instance of the editor.
     */

    getToolBarItems(editorHost: any): ToolBarItem[] {
        const anchorPoint = () => {
            const editor = editorHost.getKendoEditor();
            const editorValue = editor.value();
            let wrapper = `<div id="ANCHOR">VALUE</div>`;

            if (jQuery(editorValue).length > 0) {
                const anchorId = prompt(`Anchor Id`);

                if (anchorId) {
                    wrapper = wrapper.replace('ANCHOR', anchorId);

                    if (jQuery(editorValue).length === 1) {
                        wrapper = editorValue.replace(jQuery(editorValue)[0].id, anchorId);
                    } else {
                        wrapper = wrapper.replace('VALUE', editorValue);
                    }

                    editor.value(wrapper);
                    editor.trigger('change');
                }
            } else if (jQuery(editorValue)) {
                const anchorId = prompt(`Anchor Id`);
                if (anchorId) {
                    wrapper = wrapper.replace('ANCHOR', anchorId);
                    wrapper = wrapper.replace('VALUE', editorValue);

                    editor.value(wrapper);
                    editor.trigger('change');
                }
            } else {
                alert('Please enter some content.');
            }
        };

        /**
         * A custom toolbar item
         */
        const CUSTOM_TOOLBAR_ITEM: ToolBarItem = {
            name: "Anchor-Point",
            tooltip: "Anchor Point",
            ordinal: 13,
            exec: anchorPoint
        };

        return [CUSTOM_TOOLBAR_ITEM];
    }

    getToolBarItemsNamesToRemove(): string[] {
        /**
         * If you want to remove some toolbar items return their names as strings in the array. Order is insignificant.
         * Otherwise return an empty array.
         * Example: return [ "embed" ];
         * The above code will remove the embed toolbar item from the editor.
         * Documentation where you can find all tools' names: https://docs.telerik.com/kendo-ui/api/javascript/ui/editor/configuration/tools
         */
        return [];
    }

    /**
     * This gives access to the Kendo UI Editor configuration object
     * that is used to initialize the editor upon creation
     * Kendo UI Editor configuration overview documentation -> https://docs.telerik.com/kendo-ui/controls/editors/editor/overview#configuration
     */
    configureEditor(configuration: any) {
        configuration.pasteCleanup.span = false;
        return configuration;
    }
}

/**
 * Export a 'multi' class provider so that multiple instances of the same provider can coexist.
 * This allows for more than one provider to be registered within one or more bundles.
 */
export const ANCHOR_POINT_PROVIDER: ClassProvider = {
    multi: true,
    provide: EDITOR_CONFIG_TOKEN,
    useClass: AnchorPointProvider
};
