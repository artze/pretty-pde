import * as vscode from "vscode";
import { handleLine } from "./lib/handleLine";

export function activate(context: vscode.ExtensionContext) {
  vscode.languages.registerDocumentFormattingEditProvider("pde", {
    provideDocumentFormattingEdits(
      document: vscode.TextDocument
    ): vscode.TextEdit[] {
      let edits: vscode.TextEdit[] = [];
      let indentLevel = 0;

      for (let i = 0; i < document.lineCount; i++) {
        const line = document.lineAt(i);

        const lineEdits = handleLine({
          line,
          indentLevel,
        });

        edits = edits.concat(lineEdits);

        if (/{$/.test(line.text) || /\($/.test(line.text)) {
          indentLevel++;
        }

        if (/^\s*}/.test(line.text) || /^\s*\)/.test(line.text)) {
          indentLevel--;
        }
      }

      return edits;
    },
  });
}
