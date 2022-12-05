import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Command, ExecutionContext, ExecuteOnceInBulkCommand, BulkOperationResult } from "@progress/sitefinity-adminapp-sdk/app/api/v1";

/**
 * Serves as a command that gets invoked when the list items bulk action
 * in the actions menu is clicked.
 */
@Injectable()
export class PledgeListSelectedItemsCommand implements Command, ExecuteOnceInBulkCommand {

    /**
     * Indicates the command is executed once and not for every item selected.
     */
    executeOnceInBulk: boolean = true;

    /**
     * This method gets invoked when the list items action is clicked.
     * @param context The context that contains data for the executed bulk action.
     */
    execute(context: ExecutionContext): Observable<BulkOperationResult> {
        // get the selected items from the context.
        const selectedItems = context.data.selectedItems;
        
        let sum = 0;
        selectedItems.forEach((x) => {
            if (x.data.Counter) {
                sum += x.data.Counter
            }
        })
        alert(`Total Pledge Count: ${sum}`);
        console.log(`Total Pledge Count: ${sum}`);

        const result: BulkOperationResult = {
            success: true,
            failedItemsIds: [],
            succeededItemsIds: selectedItems.map(x => x.key)
        };

        return of(result);
    }
}
