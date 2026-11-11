import { Student } from "./models/student";

export interface Paginator {
    meta: {
        total_items: number;
        total_iages: number;
        current_page: number;
        per_page: number;
    };
    items: Student[];
}
