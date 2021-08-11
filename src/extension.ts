import * as vscode from "vscode";
import { handleLine } from "./lib/handleLine";

export function activate(context: vscode.ExtensionContext) {
  vscode.languages.registerDocumentFormattingEditProvider("pde", {
    provideDocumentFormattingEdits(
      document: vscode.TextDocument
    ): vscode.TextEdit[] {
      let edits: vscode.TextEdit[] = [];
      let indentLevel = 0;
      let lParenCount = 0;
      let rParenCount = 0;

      for (let i = 0; i < document.lineCount; i++) {
        const line = document.lineAt(i);

        if (line.text.match(/\(/g)) {
          lParenCount += line.text.match(/\(/g)!.length;
        }

        if (line.text.match(/\)/g)) {
          rParenCount += line.text.match(/\)/g)!.length;
        }

        if (/^\s*\)/.test(line.text)) {
          indentLevel--;
        }

        const lineEdits = handleLine({
          line,
          indentLevel,
          lParenCount,
          rParenCount,
        });

        edits = edits.concat(lineEdits);

        if (/{$/.test(line.text) || /\($/.test(line.text)) {
          indentLevel++;
        }

        if (/^\s*}/.test(line.text)) {
          indentLevel--;
        }
      }

      return edits;
    },
  });
}
