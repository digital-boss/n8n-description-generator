import { StaticDataBase } from 'n8n-designpatterns/dist/StaticDataBase';

/**
 * Implementation of strongly typed WorkflowStaticData access
 */
export class StaticData extends StaticDataBase {
	get token(): string {
		return this.global.token as string;
	}

	set token(t: string) {
		this.global.token = t;
	}
}
