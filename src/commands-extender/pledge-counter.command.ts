import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";

import { Command, HTTP_PREFIX } from "@progress/sitefinity-adminapp-sdk/app/api/v1";

/**
 * Serves as a command that gets invoked when the pledge counter action
 * in the actions menu is clicked.
 */
@Injectable()
export class PledgeCounterCommand implements Command {

    http_local: HttpClient;

    /**
     * Initializes a new instance of the PledgeCounterCommand.
     * @param router The router that is used to navigate.
     */
    constructor(protected router: Router, private http: HttpClient) {
        this.http_local = http;
    }

    /**
     * This method gets invoked when the pledge counter action is clicked.
     * @param context The context that contains the data item and the custom properties from the CommandProvider.
     */
    execute(): Observable<any> {

        const url = `${HTTP_PREFIX}/sf/system/pledges?$select=Counter&$orderby=LastModified desc&$count=true&sf_provider=OpenAccessProvider&sf_culture=en`;
        this.http_local.get(url).subscribe(response => {
            let sum = 0;
            let values = response['value'];
            if (values) {
                values.forEach(x => {
                    if (x.Counter) {
                        sum += x.Counter;
                    }
                });
                alert(`Total Pledge Count: ${sum}`);
                console.log(`Total Pledge Count: ${sum}`);
            }
        });

        return of(true);
    }
}
