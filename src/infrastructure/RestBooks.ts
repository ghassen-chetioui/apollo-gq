import Books from "../domain/Books";
import Book from "../domain/Book";
import fetch from "node-fetch";

export default class RestBooks implements Books {

    private readonly API_BASE_URI = "http://localhost:3000";

    async all(): Promise<Array<Book>> {
        const response = await fetch(`${this.API_BASE_URI}/books`);
        return response.json();
    }

    async byId(id: string): Promise<Book | undefined> {
        const response = await fetch(`${this.API_BASE_URI}/books/${id}`)
        if (!response.ok) throw new Error(`${response.status}-${response.statusText}`);
        return response.json();
    };

    async add(book: Book): Promise<void> {
        const response = await fetch(
            `${this.API_BASE_URI}/books`,
            { method: "POST", body: JSON.stringify(book), headers: { 'Content-Type': 'application/json' } }
        );
        if (!response.ok) throw new Error(`${response.status}-${response.statusText}`);
    }

    async delete(id: string): Promise<void> {
        const response = await fetch(`${this.API_BASE_URI}/books/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error(`${response.status}-${response.statusText}`);
    }

}