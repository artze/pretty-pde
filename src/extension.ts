import * as vscode from "vscode";
import { handleStatement } from "./lib/handleStatement";

export function activate(context: vscode.ExtensionContext) {
  vscode.languages.registerDocumentFormattingEditProvider("pde", {
    provideDocumentFormattingEdits(
      document: vscode.TextDocument
    ): vscode.TextEdit[] {
      let edits: vscode.TextEdit[] = [];

      const editsFromHandleStatement = handleStatement(document);
      edits = edits.concat(editsFromHandleStatement);

      return edits;
    },
  });
}
